import { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Transaction } from "../types";


const TransactionItem: React.FC<{ transaction: Transaction }> = ({ transaction }) => {

    const isExpense = transaction.type === 'expense';
  const amountSign = isExpense ? '-' : '+';
  const amountStyle = isExpense ? styles.expenseText : styles.incomeText;

  const formattedDate = useMemo(() => {
    return new Date(transaction.date).toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, [transaction.date]);

  const formattedAmount = new Intl.NumberFormat('uk-UA', {
    style: 'currency',
    currency: 'UAH',
    minimumFractionDigits: 2,
  }).format(Number(transaction.amount));

  return (
    <View style={styles.itemContainer}>
      <View style={[styles.iconContainer, isExpense ? styles.expenseBackground : styles.incomeBackground]}>
        <Ionicons 
          name={isExpense ? "arrow-down-circle" : "arrow-up-circle"} 
          size={24} 
          color="white" 
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.categoryText}>{transaction.category}</Text>
        <Text style={styles.descriptionText} numberOfLines={1}>
          {transaction.description || "Без опису"}
        </Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={[styles.amountBaseText, amountStyle]}>
          {amountSign} {formattedAmount}
        </Text>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  incomeBackground: {
    backgroundColor: '#76BB4D', 
  },
  expenseBackground: {
    backgroundColor: '#D9534F', 
  },
  detailsContainer: {
    flex: 1,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  descriptionText: {
    fontSize: 13,
    color: '#999',
    marginTop: 2,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amountBaseText: {
    fontSize: 16,
    fontWeight: '700',
  },
  incomeText: {
    color: '#4CAF50', 
  },
  expenseText: {
    color: '#E64A19', 
  },
  dateText: {
    fontSize: 12,
    color: '#A0A0A0',
    marginTop: 2,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    marginTop: 5,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    backgroundColor: '#E0F7FA',
    borderRadius: 8,
  },
  refreshText: {
    marginLeft: 5,
    color: '#007BFF',
    fontWeight: '600',
  }
});

export default TransactionItem;