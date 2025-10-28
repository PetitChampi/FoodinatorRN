import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Meal } from "@/models/types";
import { useModal } from "@/contexts/ModalContext";
import { MealDetailsModal } from "./MealDetailsModal";
import { MealCard } from "./MealCard";
import { colors, spacing, typography, borderRadius } from "@/styles/theme";

interface SelectableMealItemProps {
  meal: Meal;
  onAddMeal: (mealId: string, quantity: number) => boolean;
  remainingSlots: number;
}

export const SelectableMealItem: React.FC<SelectableMealItemProps> = ({
  meal,
  onAddMeal,
  remainingSlots,
}) => {
  const { openModal } = useModal();
  const [quantity] = useState(1);
  const [error, setError] = useState("");

  const handleCardClick = () => {
    openModal(<MealDetailsModal mealId={meal.id} />, "sm", true);
  };

  const handleAddMeal = () => {
    if (quantity > remainingSlots) {
      setError(`Only ${remainingSlots} slots remaining`);
      return;
    }

    const success = onAddMeal(meal.id, quantity);
    if (success) {
      setError("");
    } else {
      setError("Could not add meal.");
    }
  };

  return (
    <View>
      <MealCard imageUrl={meal.imageUrl} title={meal.name} onClick={handleCardClick}>
        <TouchableOpacity
          style={[
            styles.addButton,
            (remainingSlots === 0 || quantity > remainingSlots) && styles.addButtonDisabled
          ]}
          onPress={handleAddMeal}
          disabled={remainingSlots === 0 || quantity > remainingSlots}
          testID={`add-meal-${meal.id}`}
        >
          <Text style={styles.addButtonText}>+ Add to plan</Text>
        </TouchableOpacity>
      </MealCard>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  addButtonDisabled: {
    backgroundColor: colors.gray5,
    opacity: 0.5,
  },
  addButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  errorText: {
    color: colors.danger,
    fontSize: typography.fontSize.sm,
    marginTop: spacing.sm,
    textAlign: "center",
  },
});
