import React, { useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useConfirmationModal } from "./ConfirmationModal";
import { getMealById } from "../models/mealData";
import { PlannedMealItem } from "./PlannedMealItem";
import { useFoodinatorStore } from "../store/useFoodinatorStore";
import { SelectedMeal } from "../models/types";
import { colors, spacing, typography, borderRadius } from "../styles/theme";

export const WeeklyPlanDisplay: React.FC = () => {
  const { openConfirmation } = useConfirmationModal();

  const mealSlots = useFoodinatorStore(state => state.mealSlots);
  const totalSlots = useFoodinatorStore(state => state.weeklyPlan.totalSlots);
  const removeMeal = useFoodinatorStore(state => state.removeMeal);
  const updateMealQuantity = useFoodinatorStore(state => state.updateMealQuantity);
  const resetPlan = useFoodinatorStore(state => state.resetPlan);

  const { selectedMeals, usedSlots } = useMemo(() => {
    const mealCounts = new Map<string, number>();
    let slotsUsed = 0;

    mealSlots.forEach(slot => {
      if (slot.mealId) {
        slotsUsed++;
        mealCounts.set(slot.mealId, (mealCounts.get(slot.mealId) || 0) + 1);
      }
    });

    const meals: SelectedMeal[] = Array.from(mealCounts.entries()).map(([mealId, quantity]) => ({
      mealId,
      quantity,
    }));

    return { selectedMeals: meals, usedSlots: slotsUsed };
  }, [mealSlots]);

  const handleResetPlanConfirmation = () => {
    openConfirmation({
      title: "Reset dinner plan",
      message: "Are you sure you want to reset your entire dinner plan?",
      confirmText: "Reset plan",
      onConfirm: resetPlan,
    });
  };

  const handleRemoveMealConfirmation = (mealId: string) => {
    const meal = getMealById(mealId);
    openConfirmation({
      title: `Remove ${meal?.name || "this meal"}`,
      message: `Are you sure you want to remove all instances of ${meal?.name || "this meal"} from your plan?`,
      confirmText: "Remove meal",
      onConfirm: () => removeMeal(mealId),
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleWithBadge}>
            <Text style={styles.title}>Dinner plan</Text>
            <View style={styles.badge} testID="planner-meal-count">
              <Text style={styles.badgeText}>{usedSlots}/{totalSlots}</Text>
            </View>
          </View>
          {selectedMeals.length > 0 && (
            <TouchableOpacity
              style={styles.resetButton}
              onPress={handleResetPlanConfirmation}
            >
              <Text style={styles.resetButtonText}>Reset</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      
      {selectedMeals.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>
            No meals selected yet. Start by adding meals from the list below.
          </Text>
        </View>
      ) : (
        <View style={styles.mealList}>
          {selectedMeals.map(({ mealId, quantity }) => (
            <View key={mealId} style={styles.mealItem}>
              <PlannedMealItem
                mealId={mealId}
                quantity={quantity}
                onRemoveMeal={handleRemoveMealConfirmation}
                onUpdateQuantity={updateMealQuantity}
                availableSlots={totalSlots - (usedSlots - quantity)}
              />
            </View>
          ))}
        </View>
      )}
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
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleWithBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.max,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    minWidth: 40,
    alignItems: "center",
  },
  badgeText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    color: colors.textWhite,
  },
  resetButton: {
    backgroundColor: colors.danger,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  resetButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textWhite,
  },
  emptyState: {
    padding: spacing.xxxl,
    alignItems: "center",
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.textTertiary,
    textAlign: "center",
  },
  mealList: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  mealItem: {
    marginBottom: spacing.md,
  },
});
