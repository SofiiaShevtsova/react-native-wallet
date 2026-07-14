import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import { useFinance } from "../context/FinanceContext";
import { TransactionType } from "../constants/constants";
import { formatAmount } from "../utils/formatAmount";
import { useLng } from "../context/LocaleContext";
import { statisticsLocales } from "../locale/statisticsLocales";

const getCurrentYear = () => new Date().getFullYear();
const YEARS = [getCurrentYear(), getCurrentYear() - 1, getCurrentYear() - 2];

const Statistics = () => {
  const { lng, currency } = useLng();
  const t = statisticsLocales[lng];

  const { transactions, loading } = useFinance();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());

  const {
    totalBalance,
    monthlyIncome,
    monthlyExpense,
    categoryExpenses,
    maxCategoryAmount,
    yearlyMonthlyIncome,
    yearlyMonthlyExpense,
    maxYearlyAmount,
  } = useMemo(() => {
    let income = 0;
    let expense = 0;
    const expenseMap: Record<string, number> = {};
    let total = 0;

    const yearlyIncome: number[] = Array(12).fill(0);
    const yearlyExpense: number[] = Array(12).fill(0);

    transactions.forEach((t) => {
      if (t.type === TransactionType.Income) {
        total += Number(t.amount);
      } else {
        total -= Number(t.amount);
      }
    });

    transactions.forEach((t) => {
      const transactionDate = new Date(t.date);
      const transactionMonth = transactionDate.getMonth();
      const transactionYear = transactionDate.getFullYear();

      if (
        transactionMonth === selectedMonth &&
        transactionYear === selectedYear
      ) {
        if (t.type === TransactionType.Income) {
          income += Number(t.amount);
        } else {
          expense += Number(t.amount);
          expenseMap[t.category] =
            (expenseMap[t.category] || 0) + Number(t.amount);
        }
      }

      if (transactionYear === selectedYear) {
        if (t.type === TransactionType.Income) {
          yearlyIncome[transactionMonth] += Number(t.amount);
        } else {
          yearlyExpense[transactionMonth] += Number(t.amount);
        }
      }
    });

    const categoryExpensesArray = Object.entries(expenseMap)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);

    const maxAmount =
      categoryExpensesArray.length > 0 ? categoryExpensesArray[0].amount : 0;

    const maxYearlyAmount = Math.max(...yearlyIncome, ...yearlyExpense);

    return {
      totalBalance: total,
      monthlyIncome: income,
      monthlyExpense: expense,
      categoryExpenses: categoryExpensesArray,
      maxCategoryAmount: maxAmount,
      yearlyMonthlyIncome: yearlyIncome,
      yearlyMonthlyExpense: yearlyExpense,
      maxYearlyAmount: maxYearlyAmount,
    };
  }, [transactions, selectedMonth, selectedYear]);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#76BB4D" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{t.header}</Text>
      <View style={styles.selectorContainer}>
        <View style={[styles.pickerWrapper, { marginRight: 5 }]}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={styles.picker}
          >
            {t.months.map((month, index) => (
              <Picker.Item key={index} label={month} value={index} />
            ))}
          </Picker>
        </View>
        <View style={[styles.pickerWrapper, { marginLeft: 5 }]}>
          <Picker
            selectedValue={selectedYear}
            onValueChange={(itemValue) => setSelectedYear(itemValue)}
            style={styles.picker}
          >
            {YEARS.map((year) => (
              <Picker.Item key={year} label={String(year)} value={year} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t.balance}</Text>
          <Text
            style={[
              styles.cardValue,
              totalBalance >= 0 ? styles.incomeText : styles.expenseText,
            ]}
          >
            {formatAmount(totalBalance, lng, currency )}
          </Text>
        </View>
      </View>

      <View style={styles.monthlyStatsContainer}>
        <View style={styles.monthlyCardIncome}>
          <Text style={styles.monthlyTitle}>
            {t.income} ({t.months[selectedMonth]})
          </Text>
          <Text style={styles.incomeValue}>{formatAmount(monthlyIncome, lng, currency)}</Text>
        </View>
        <View style={styles.monthlyCardExpense}>
          <Text style={styles.monthlyTitle}>
            {t.expenses} ({t.months[selectedMonth]})
          </Text>
          <Text style={styles.expenseValue}>
            {formatAmount(monthlyExpense, lng, currency)}
          </Text>
        </View>
      </View>

      <View style={styles.chartSection}>
        <Text style={styles.chartHeader}>
          {`${t.dynamics} ${selectedYear} ${t.year}`}
        </Text>
        <LineChart
          incomeData={yearlyMonthlyIncome}
          expenseData={yearlyMonthlyExpense}
          maxAmount={maxYearlyAmount}
        />
        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#388E3C" }]}
            />
            <Text style={styles.legendText}>{t.legendIncome}</Text>
          </View>
          <View style={styles.legendItem}>
            <View
              style={[styles.legendColor, { backgroundColor: "#D32F2F" }]}
            />
            <Text style={styles.legendText}>{t.legendExpense}</Text>
          </View>
        </View>
      </View>

      <View style={[styles.chartSection, { marginTop: 15 }]}>
        <Text style={styles.chartHeader}>
          {`${t.categoriesExpenses} (${t.months[selectedMonth]})`}
        </Text>
        <BarChart data={categoryExpenses} maxAmount={maxCategoryAmount} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 25,
    marginTop: 30,
    textAlign: "center",
    color: "#333333",
  },
  cardsContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    color: "#777",
    fontWeight: "600",
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: "bold",
  },
  incomeText: {
    color: "#4CAF50",
  },
  expenseText: {
    color: "#E64A19",
  },
  monthlyStatsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  monthlyCardIncome: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
  },
  monthlyCardExpense: {
    flex: 1,
    backgroundColor: "#FFEBEE",
    padding: 15,
    marginLeft: 10,
  },
  monthlyTitle: {
    fontSize: 12,
    color: "#555",
    marginBottom: 5,
  },
  incomeValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#388E3C",
  },
  expenseValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D32F2F",
  },
  selectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    overflow: "hidden",
    height: 50,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  picker: {
    color: "#333",
  },
  chartSection: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  chartHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 34,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendColor: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#555",
  },
});

export default Statistics;
