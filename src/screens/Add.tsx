import { useMemo, useState } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  Alert,
  Keyboard,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RequestTransaction } from "../types";
import { useFinance } from "../context/FinanceContext";
import { TransactionType } from "../constants/constants";
import { useLng } from "../context/LocaleContext";
import { addLocales } from "../locale/addLocales";

const initialTransactionState: RequestTransaction = {
  amount: "",
  category: "",
  description: "",
  type: "expense",
};

const Add = () => {
  const { lng } = useLng();
  const t = addLocales[lng];

  const [transaction, setTransaction] = useState<RequestTransaction>(
    initialTransactionState,
  );

  const { addTransaction } = useFinance();

  const onChange = (field: keyof RequestTransaction, value: string) => {
    if (field === "amount") {
      const cleanedValue = value.replace(/,/g, ".");

      if (cleanedValue === "" || cleanedValue === ".") {
        setTransaction((prev) => ({
          ...prev,
          [field]: "",
        }));
        return;
      }

      if (isNaN(Number(cleanedValue))) {
        return;
      }

      setTransaction((prev) => ({
        ...prev,
        [field]:
          cleanedValue.startsWith("0") &&
          !Number(cleanedValue).toString().startsWith("0")
            ? cleanedValue.slice(1)
            : cleanedValue,
      }));
    } else {
      setTransaction((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const activeIncome = useMemo(() => {
    return transaction.type === TransactionType.Income;
  }, [transaction.type]);

  const availableCategories = useMemo(() => {
    const categoryArray = activeIncome ? t.category.income : t.category.expense;
    onChange("category", categoryArray[0]);
    return categoryArray;
  }, [activeIncome, lng]);

  const onSubmit = async () => {
    if (!transaction.amount || Number(transaction.amount) <= 0) {
      return;
    }

    try {
      const newTransition = await addTransaction(transaction);

      if (newTransition) {
        Alert.alert(t.successTitle, t.successMessage);
        setTransaction(initialTransactionState);
        Keyboard.dismiss();
      } else {
        Alert.alert(t.errorTitle, t.addError);
      }
    } catch (error) {
      Alert.alert(t.errorTitle, t.unknownError);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t.header}</Text>

      <View
        style={{
          ...styles.typeToggle,
          borderColor: activeIncome ? "#76BB4D" : "#F06292",
        }}
      >
        <Pressable
          onPress={() => onChange("type", "income")}
          style={[
            styles.typeButton,
            activeIncome && styles.typeButtonActiveIncome,
          ]}
        >
          <Text
            style={[styles.typeText, activeIncome && styles.typeTextActive]}
          >
            {t.income}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => onChange("type", "expense")}
          style={[
            styles.typeButton,
            !activeIncome && styles.typeButtonActiveExpense,
          ]}
        >
          <Text
            style={[styles.typeText, !activeIncome && styles.typeTextActive]}
          >
            {t.expense}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.label}>{t.amountLabel}</Text>
      <TextInput
        style={styles.input}
        placeholder={t.amountPlaceholder}
        keyboardType="numeric"
        value={transaction.amount}
        onChangeText={(value) => onChange("amount", value)}
      />
      <Text style={styles.label}>{t.categoryLabel}</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={transaction.category}
          onValueChange={(itemValue: string) => onChange("category", itemValue)}
          style={styles.picker}
          itemStyle={{ fontSize: 12 }}
        >
          {availableCategories.map((cat) => (
            <Picker.Item key={cat} label={cat} value={cat} />
          ))}
        </Picker>
      </View>
      <Text style={styles.label}>{t.descriptionLabel}</Text>
      <TextInput
        nativeID="description"
        placeholder={t.descriptionPlaceholder}
        style={styles.input}
        value={transaction.description?.toString() || ""}
        onChangeText={(value) => {
          onChange("description", value);
        }}
      />
      <Pressable
        onPress={onSubmit}
        disabled={!transaction.amount}
        style={{
          ...styles.submitButton,
          backgroundColor: activeIncome ? "#76BB4D" : "#F06292",
          opacity: !transaction.amount ? 0.5 : 1,
        }}
      >
        <Text style={styles.submitButtonText}>
          {t.addButton}{" "}
          {transaction.type === TransactionType.Income ? t.income : t.expense}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: 30,
    textAlign: "center",
    color: "#333333",
  },
  input: {
    height: 50,
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333333",
  },
  typeToggle: {
    flexDirection: "row",
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
  },
  typeButtonActiveIncome: {
    backgroundColor: "#76BB4D",
  },
  typeButtonActiveExpense: {
    backgroundColor: "#F06292",
  },
  typeText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "600",
  },
  typeTextActive: {
    color: "#fff",
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333333",
  },
  pickerContainer: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E0E0E0",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
    justifyContent: "center",
    height: 50,
  },
  picker: {
    paddingVertical: 8,
    width: "100%",
    color: "#333333",
  },
  submitButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
export default Add;
