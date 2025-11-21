import React, { FC } from "react";
import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { Ionicons, Foundation } from "@expo/vector-icons";

interface OnboardingProps {
  onStart: () => void;
}

const Onboarding: FC<OnboardingProps> = ({ onStart }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="rocket-outline" size={64} color="#388E3C" />
        <Text style={styles.title}>Ласкаво просимо!</Text>
        <Text style={styles.subtitle}>
          Ваш персональний помічник з фінансів.
        </Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.sectionTitle}>Що це за додаток?</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Мій Фінансовий Трекер</Text> — це інструмент
          для простого й ефективного відстеження ваших доходів та витрат. Він
          допомагає контролювати баланс та аналізувати, куди йдуть ваші кошти.
        </Text>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          Як користуватися?
        </Text>

        <View style={styles.card}>
          <Ionicons
            name="add-circle-outline"
            size={26}
            color="#76BB4D"
            style={styles.icon}
          />

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>1. Додайте транзакцію</Text>
            <Text style={styles.cardDescription}>
              Перейдіть на вкладку <Text style={styles.bold}>“Додати”</Text>.
              Вкажіть суму, оберіть тип транзакції (дохід чи витрата) та
              категорію.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Foundation
            name="list"
            size={28}
            color="#76BB4D"
            style={styles.icon}
          />

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>2. Перегляньте транзакції</Text>
            <Text style={styles.cardDescription}>
              На вкладці <Text style={styles.bold}>Транзакції</Text> ви бачите
              всі записи. Вони незмінні: якщо потрібно виправити — додайте нову
              корекційну транзакцію.
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <Foundation
            name="graph-trend"
            size={26}
            color="#76BB4D"
            style={styles.icon}
          />

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>3. Аналізуйте звіт</Text>
            <Text style={styles.cardDescription}>
              Вкладка <Text style={styles.bold}>“Звіт”</Text> показує баланс та
              статистику за обраний місяць.
            </Text>
          </View>
        </View>
      </View>

      <Pressable onPress={onStart} style={styles.button}>
        <Ionicons name="checkmark-circle" size={22} color="#fff" />
        <Text style={styles.buttonText}>Почати користування</Text>
      </Pressable>
    </ScrollView>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#111827",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    marginTop: 4,
  },
  block: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 6,
    marginBottom: 10,
  },
  text: {
    color: "#374151",
    fontSize: 16,
    lineHeight: 22,
  },
  bold: {
    fontWeight: "700",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#76BB4D",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    marginTop: 12,
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    color: "#111827",
    fontWeight: "600",
    marginBottom: 2,
  },
  cardDescription: {
    fontSize: 14,
    color: "#374151",
  },
  button: {
    backgroundColor: "#76BB4D",
    paddingVertical: 14,
    borderRadius: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    marginLeft: 8,
  },
});
