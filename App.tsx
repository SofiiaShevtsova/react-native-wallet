import { useState, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";

import Onboarding from "./src/screens/Onboarding";
import BottomTabs from "./src/components/BottomMenu";
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { FinanceProvider } from "./src/context/FinanceContext";

const Root = () => {
  const { userId, loading } = useAuth();
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboarding = async () => {
      const value = await AsyncStorage.getItem("onboarded");
      setIsOnboarded(value === "true");
    };

    checkOnboarding();
  }, []);

  if (loading || !userId || isOnboarded === null) {
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

  if (!isOnboarded) {
    return (
      <Onboarding
        onStart={async () => {
          await AsyncStorage.setItem("onboarded", "true");
          setIsOnboarded(true);
        }}
      />
    );
  }

  return (
    <FinanceProvider userId={userId}>
      <BottomTabs />
    </FinanceProvider>
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
