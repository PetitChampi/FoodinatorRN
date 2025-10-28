import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { getMealById } from "@/models/mealData";
import { useModal } from "@/contexts/ModalContext";
import { MealDetailsModal } from "./MealDetailsModal";
import { MealCard } from "./MealCard";
import { QuantitySelector } from "./QuantitySelector";
import { colors, spacing, typography } from "@/styles/theme";

interface PlannedMealItemProps {
  mealId: string;
  quantity: number;
  onRemoveMeal: (mealId: string) => void;
  onUpdateQuantity: (mealId: string, quantity: number) => boolean;
  availableSlots: number;
}

export const PlannedMealItem: React.FC<PlannedMealItemProps> = ({
  mealId,
  quantity,
  onRemoveMeal,
  onUpdateQuantity,
  availableSlots,
}) => {
  const meal = getMealById(mealId);
  const { openModal } = useModal();

  if (!meal) return null;

  const handleCardClick = () => {
    openModal(<MealDetailsModal mealId={meal.id} />, "sm", true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => onRemoveMeal(meal.id)}
        accessibilityLabel={`Remove ${meal.name} from plan`}
        testID={`remove-meal-${meal.name}`}
      >
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
      
      <MealCard imageUrl={meal.imageUrl} title={meal.name} onClick={handleCardClick}>
        <View style={styles.controls}>
          <QuantitySelector
            quantity={quantity}
            onIncrease={() => onUpdateQuantity(meal.id, quantity + 1)}
            onDecrease={() => onUpdateQuantity(meal.id, quantity - 1)}
            increaseDisabled={quantity >= availableSlots}
            decreaseDisabled={quantity <= 1}
            ariaLabelPrefix={meal.name}
          />
        </View>
      </MealCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: 28,
    height: 28,
    backgroundColor: colors.danger,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  closeText: {
    color: colors.textWhite,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    lineHeight: 20,
  },
  controls: {
    marginTop: spacing.sm,
  },
});
