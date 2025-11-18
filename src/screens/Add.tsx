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
import { RequestTransaction } from "../types";
import { useFinance } from "../context/FinanceContext";

const initialTransactionState: RequestTransaction = {
  amount: 0,
  category: "",
  description: "",
  type: "expense",
};

const Add = () => {
  const [transaction, setTransaction] = useState<RequestTransaction>(
    initialTransactionState
  );

  const { addTransaction } = useFinance();

  const activeIncome = useMemo(() => {
    return transaction.type === "income";
  }, [transaction.type]);

  const onChange = (field: keyof RequestTransaction, value: string) => {
    setTransaction((prev) => ({
      ...prev,
      [field]: field === "amount" ? Number(value) : value,
    }));
  };

  const onSubmit = async () => {
    if (transaction.amount <= 0) {
      return;
    }

    try {
      const newTransition = await addTransaction(transaction);

      if (newTransition) {
        Alert.alert("success", "Transaction added successfully");
        setTransaction(initialTransactionState);
        Keyboard.dismiss();
      } else {
        Alert.alert("error", "Can't add transaction");
      }
    } catch (error) {
      Alert.alert("error", "Something went wrong");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Створити нову транзакцію</Text>

      <View style={styles.typeToggle}>
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
            Income
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
            Expense
          </Text>
        </Pressable>
      </View>

      <TextInput
        style={styles.input}
        placeholder="amoung"
        keyboardType="numeric"
        value={transaction.amount === 0 ? "" : transaction.amount.toString()}
        onChangeText={(value) => onChange("amount", value)}
      />
      {["category", "description"].map((field) => (
        <TextInput
          key={field}
          nativeID={field}
          placeholder={field}
          style={styles.input}
          value={
            transaction[field as keyof RequestTransaction]?.toString() || ""
          }
          onChangeText={(value) => {
            onChange(field as keyof RequestTransaction, value);
          }}
        />
      ))}
      <Pressable onPress={onSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>ADD {transaction.type}</Text>
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
    borderColor: "#76BB4D",
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
  submitButton: {
    backgroundColor: "#388E3C",
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
