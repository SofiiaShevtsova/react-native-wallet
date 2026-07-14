import { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

import Onboarding from "./src/screens/Onboarding";
import BottomTabs from "./src/components/BottomMenu";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { FinanceProvider } from "./src/context/FinanceContext";
import { Languages } from "./src/constants/constants";
import { LocaleProvider } from "./src/context/LocaleContext";

const Root = () => {
  const { userId, loading } = useAuth();
  const [settings, setSettings] = useState<{
    onboarded: boolean;
    language: Languages | null;
    currency: string | null;
  } | null>(null);

  useEffect(() => {
    const loadSettings = async () => {
      const onboarded = await AsyncStorage.getItem("onboarded");
      const language = (await AsyncStorage.getItem("language")) as Languages;
      const currency = await AsyncStorage.getItem("currency");

      setSettings({
        onboarded: onboarded === "true",
        language,
        currency,
      });
    };

    loadSettings();
  }, []);

  if (loading || !userId || settings === null) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F9F9F9",
        }}
      >
        <ActivityIndicator size="large" color="#76BB4D" />
      </View>
    );
  }

  if (!settings.onboarded || !settings.language || !settings.currency) {
    return (
      <Onboarding
        onFinish={async (language, currency) => {
          await AsyncStorage.multiSet([
            ["onboarded", "true"],
            ["language", language],
            ["currency", currency],
          ]);

          setSettings({
            onboarded: true,
            language,
            currency,
          });
        }}
      />
    );
  }

  return (
    <LocaleProvider lng={settings.language} currency={settings.currency}>
      <FinanceProvider userId={userId}>
        <BottomTabs lng={settings.language} />
      </FinanceProvider>
    </LocaleProvider>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </NavigationContainer>
  );
}
