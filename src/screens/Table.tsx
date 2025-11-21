import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useFinance } from "../context/FinanceContext";
import TransactionItem from "../components/TransationItem";

const Table = () => {
  const { transactions, loading } = useFinance();

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#76BB4D" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Всі транзакції</Text>
      {transactions.length > 0 ? (
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          contentContainerStyle={styles.listContent}
        />
      ) : null}
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
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 100,
  },
});
export default Table;
