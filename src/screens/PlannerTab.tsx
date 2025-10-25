import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { WeeklyPlanDisplay } from "../components/WeeklyPlanDisplay";
import { MealSelector } from "../components/MealSelector";
import { colors } from "../styles/theme";

export const PlannerTab: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <WeeklyPlanDisplay />
      <MealSelector />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
