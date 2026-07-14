import React, { FC, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Ionicons, Foundation } from "@expo/vector-icons";

import { onboardingLocales } from "../locale/onboardingLocales";
import { Languages } from "../constants/constants";

const languages: { code: Languages; title: string }[] = [
  { code: "uk", title: "🇺🇦 Українська" },
  { code: "pl", title: "🇵🇱 Polski" },
  { code: "en", title: "🇬🇧 English" },
];

const currencies = [
  { code: "UAH", title: "₴ UAH" },
  { code: "USD", title: "$ USD" },
  { code: "PLN", title: "zł PLN" },
  { code: "EUR", title: "€ EUR" },
];

type OnboardingProps = {
  onFinish: (language: Languages, currency: string) => void;
};

const Onboarding: FC<OnboardingProps> = ({ onFinish }) => {
  const [language, setLanguage] = useState<Languages>("uk");
  const [currency, setCurrency] = useState("UAH");

  const t = onboardingLocales[language];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="rocket-outline" size={64} color="#388E3C" />
        <Text style={styles.title}>{t.welcome}</Text>
        <Text style={styles.subtitle}>{t.subtitle}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.sectionTitle}>{t.aboutTitle}</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>{t.appName}</Text>
          {t.aboutPart1}
        </Text>
        <Text style={styles.sectionTitle}>{t.languageTitle}</Text>
        <View style={styles.blockWithBtn}>
          {languages.map((item) => (
            <Pressable
              key={item.code}
              onPress={() => setLanguage(item.code)}
              style={
                language === item.code
                  ? styles.chosenButton
                  : styles.buttonForChose
              }
            >
              <Text style={styles.buttonChoseText}>{item.title}</Text>
            </Pressable>
          ))}
        </View>
        <Text style={styles.sectionTitle}>{t.currencyTitle}</Text>
        <View style={styles.blockWithBtn}>
          {currencies.map((item) => (
            <Pressable
              key={item.code}
              onPress={() => setCurrency(item.code)}
              style={
                currency === item.code
                  ? styles.chosenButton
                  : styles.buttonForChose
              }
            >
              <Text style={styles.buttonChoseText}>{item.title}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
          {t.howToTitle}
        </Text>
        <View style={styles.card}>
          <Ionicons
            name="add-circle-outline"
            size={26}
            color="#76BB4D"
            style={styles.icon}
          />

          <View style={styles.cardText}>
            <Text style={styles.cardTitle}>{t.step1Title}</Text>
            <Text style={styles.cardDescription}>
              {t.step1Part1} <Text style={styles.bold}>{t.addTab}</Text>
              {t.step1Part2}
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
            <Text style={styles.cardTitle}>{t.step2Title}</Text>
            <Text style={styles.cardDescription}>
              {t.step2Part1}{" "}
              <Text style={styles.bold}>{t.transactionsTab}</Text>{" "}
              {t.step2Part2}
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
            <Text style={styles.cardTitle}>{t.step3Title}</Text>
            <Text style={styles.cardDescription}>
              {t.step3Part1} <Text style={styles.bold}>{t.reportTab}</Text>{" "}
              {t.step3Part2}
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={() => onFinish(language, currency)}
        style={styles.button}
      >
        <Ionicons name="checkmark-circle" size={22} color="#fff" />
        <Text style={styles.buttonText}>{t.startButton}</Text>
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
  blockWithBtn: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBlockEnd: 12,
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
  buttonForChose: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#76BB4D",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 8,
  },
  chosenButton: {
    backgroundColor: "#cff5b9",
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#76BB4D",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 8,
  },
  buttonChoseText: {
    color: "#76BB4D",
    fontWeight: "700",
    fontSize: 16,
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
