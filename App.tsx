import { ActivityIndicator, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { FinanceProvider } from "./src/context/FinanceContext";
import BottomTabs from "./src/components/BottomMenu";

const Root = () => {
  const { userId, loading } = useAuth();

  if (loading || !userId) {
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
