import React, { useMemo, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { MealSlot } from "./MealSlot";
import { ScheduleControls } from "./ScheduleControls";
import { useFoodinatorStore } from "@/store/useFoodinatorStore";
import { colors, spacing, typography } from "@/styles/theme";

export const MealSchedule: React.FC = () => {
  const {
    mealSlots,
    cookedMeals,
    startDate,
    toggleMealCooked,
    updateStartDate,
  } = useFoodinatorStore();

  const cookedStatus = useMemo(() =>
    mealSlots.map(slot => slot.instanceId ? !!cookedMeals[slot.instanceId] : false),
  [mealSlots, cookedMeals],
  );

  const getSlotDate = useCallback((slotIndex: number) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + slotIndex);
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  }, [startDate]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal schedule</Text>
      </View>

      <ScheduleControls
        startDate={startDate}
        onUpdateStartDate={updateStartDate}
      />

      <View style={styles.slotsContainer}>
        {mealSlots.map((slot, index) => (
          <View key={slot.instanceId || `empty-${index}`} style={styles.slotWrapper}>
            <MealSlot
              mealId={slot.mealId}
              index={index}
              isCooked={cookedStatus[index]}
              dateLabel={getSlotDate(index)}
              onToggleCooked={toggleMealCooked}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  slotsContainer: {
    padding: spacing.lg,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  slotWrapper: {
    width: "48%",
  },
});
