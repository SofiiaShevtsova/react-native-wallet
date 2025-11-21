import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Picker } from "@react-native-picker/picker"; 

import BarChart from '../components/BarChart';
import { useFinance } from '../context/FinanceContext';
import { MONTH_NAMES_UA, TransactionType } from '../constants/constants';
import { formatAmount } from '../utils/formatAmount';

const getCurrentYear = () => new Date().getFullYear();
const YEARS = [getCurrentYear(), getCurrentYear() - 1, getCurrentYear() - 2];

const Statistics = () => {
  const { transactions, loading } = useFinance();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());

  const { totalBalance, monthlyIncome, monthlyExpense, categoryExpenses, maxCategoryAmount } = useMemo(() => {
    let income = 0;
    let expense = 0;
    const expenseMap: Record<string, number> = {};
    let total = 0; 

    transactions.forEach(t => {
      if (t.type === TransactionType.Income) {
        total += t.amount;
      } else {
        total -= t.amount;
      }
    });

    transactions.forEach(t => {
      const transactionDate = new Date(t.date);

      if (
        transactionDate.getMonth() === selectedMonth &&
        transactionDate.getFullYear() === selectedYear
      ) {
        if (t.type === TransactionType.Income) {
          income += t.amount;
        } else {
          expense += t.amount;
          expenseMap[t.category] = (expenseMap[t.category] || 0) + t.amount;
        }
      }
    });

    const categoryExpensesArray = Object.entries(expenseMap)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);

    const maxAmount = categoryExpensesArray.length > 0 ? categoryExpensesArray[0].amount : 0;

    return {
      totalBalance: total,
      monthlyIncome: income,
      monthlyExpense: expense,
      categoryExpenses: categoryExpensesArray,
      maxCategoryAmount: maxAmount,
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
      <Text style={styles.header}>Фінансовий Звіт</Text>

      <View style={styles.selectorContainer}>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={styles.picker}
          >
            {MONTH_NAMES_UA.map((month, index) => (
              <Picker.Item key={index} label={month} value={index} />
            ))}
          </Picker>
        </View>

        <View style={styles.pickerWrapper}>
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
          <Text style={styles.cardTitle}>Загальний Баланс</Text>
          <Text style={[styles.cardValue, totalBalance >= 0 ? styles.incomeText : styles.expenseText]}>
            {formatAmount(totalBalance)}
          </Text>
        </View>
      </View>

      <View style={styles.monthlyStatsContainer}>
        <View style={styles.monthlyCardIncome}>
          <Text style={styles.monthlyTitle}>Дохід ({MONTH_NAMES_UA[selectedMonth]})</Text>
          <Text style={styles.incomeValue}>{formatAmount(monthlyIncome)}</Text>
        </View>
        <View style={styles.monthlyCardExpense}>
          <Text style={styles.monthlyTitle}>Витрати ({MONTH_NAMES_UA[selectedMonth]})</Text>
          <Text style={styles.expenseValue}>{formatAmount(monthlyExpense)}</Text>
        </View>
      </View>
      
      <View style={styles.chartSection}>
        <Text style={styles.chartHeader}>Витрати за Категоріями</Text>
        <BarChart data={categoryExpenses} maxAmount={maxCategoryAmount} />
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    color: '#333',
    padding: 20,
    paddingBottom: 10,
    textAlign: 'center',
  },
  cardsContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    color: '#777',
    fontWeight: '600',
    marginBottom: 5,
  },
  cardValue: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  incomeText: {
    color: '#4CAF50',
  },
  expenseText: {
    color: '#E64A19',
  },
  monthlyStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  monthlyCardIncome: {
    flex: 1,
    backgroundColor: '#E8F5E9', 
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
  },
  monthlyCardExpense: {
    flex: 1,
    backgroundColor: '#FFEBEE', 
    padding: 15,
    marginLeft: 10,
  },
  monthlyTitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 5,
  },
  incomeValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
  },
  expenseValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  pickerWrapper: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    overflow: 'hidden',
    height: 50,
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  picker: {
    color: '#333',
  },
  chartSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  chartHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
});

export default Statistics;
