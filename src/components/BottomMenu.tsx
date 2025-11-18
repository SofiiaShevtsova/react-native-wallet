import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Foundation } from "@expo/vector-icons";

import Table from "../screens/Table";
import Add from "../screens/Add";
import Statistics from "../screens/Statistics";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 60,
          paddingHorizontal: 10,
          paddingTop: 8,
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 5,
        },
        tabBarActiveTintColor: "#76BB4D",
        tabBarInactiveTintColor: "#9E9E9E",
        tabBarItemStyle: {
          height: 40,
        },
      }}
    >
      <Tab.Screen
        name="Table"
        component={Table}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="list" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="add" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name="Statistics"
        component={Statistics}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Foundation name="graph-trend" color={color} size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
