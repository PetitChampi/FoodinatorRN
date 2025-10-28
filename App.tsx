import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import { ModalProvider } from "@/contexts/ModalProvider";
import { PlannerTab } from "@/screens/PlannerTab";
import { ScheduleTab } from "@/screens/ScheduleTab";
import { GroceryTab } from "@/screens/GroceryTab";
import { OfflineStatus } from "@/components/OfflineStatus";
import { colors } from "@/styles/theme";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <ModalProvider>
        <NavigationContainer>
          <OfflineStatus />
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: colors.primary,
              tabBarInactiveTintColor: colors.textTertiary,
              tabBarStyle: {
                backgroundColor: colors.cardBackground,
                borderTopColor: colors.border,
              },
              headerStyle: {
                backgroundColor: colors.primary,
              },
              headerTintColor: colors.textWhite,
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          >
            <Tab.Screen
              name="Planner"
              component={PlannerTab}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="list-outline" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Schedule"
              component={ScheduleTab}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="calendar-outline" size={size} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="Groceries"
              component={GroceryTab}
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon name="cart-outline" size={size} color={color} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </ModalProvider>
    </SafeAreaProvider>
  );
}
