import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { getMealById } from "../models/mealData";
import { colors, spacing, typography, borderRadius } from "../styles/theme";

interface MealSlotProps {
  mealId: string | null;
  index: number;
  isCooked: boolean;
  dateLabel: string;
  onToggleCooked: (index: number) => void;
  onPress?: () => void;
}

export const MealSlot: React.FC<MealSlotProps> = ({
  mealId,
  index,
  isCooked,
  dateLabel,
  onToggleCooked,
  onPress,
}) => {
  const meal = mealId ? getMealById(mealId) : null;

  const getImageSource = (url?: string) => {
    if (!url) return null;
    const filename = url.split("/").pop()?.replace(".jpg", "");
    const imageMap: { [key: string]: any } = {
      "avocado-toasts": require("../assets/images/img-meals/avocado-toasts.jpg"),
      "boeuf-bourguignon": require("../assets/images/img-meals/boeuf-bourguignon.jpg"),
      "burgers": require("../assets/images/img-meals/burgers.jpg"),
      "chic-broc": require("../assets/images/img-meals/chic-broc.jpg"),
      "chicken-skewers": require("../assets/images/img-meals/chicken-skewers.jpg"),
      "chickpea-chard-pork": require("../assets/images/img-meals/chickpea-chard-pork.jpg"),
      "epic-beans-steak": require("../assets/images/img-meals/epic-beans-steak.jpg"),
      "fishy-pasta": require("../assets/images/img-meals/fishy-pasta.jpg"),
      "fisn-n-mash": require("../assets/images/img-meals/fisn-n-mash.jpg"),
      "lamb-potatoes": require("../assets/images/img-meals/lamb-potatoes.jpg"),
      "luxury-jambon-beurre": require("../assets/images/img-meals/luxury-jambon-beurre.jpg"),
      "mex-bean-casserole": require("../assets/images/img-meals/mex-bean-casserole.jpg"),
      "mushroom-risotto": require("../assets/images/img-meals/mushroom-risotto.jpg"),
      "pasta-bolognese": require("../assets/images/img-meals/pasta-bolognese.jpg"),
      "pasta-carbonara": require("../assets/images/img-meals/pasta-carbonara.jpg"),
      "pesto-chicken-gnocchi": require("../assets/images/img-meals/pesto-chicken-gnocchi.jpg"),
      "pistachio-pesto-gnocchi": require("../assets/images/img-meals/pistachio-pesto-gnocchi.jpg"),
      "poule-au-pot": require("../assets/images/img-meals/poule-au-pot.jpg"),
      "prawn-burritos": require("../assets/images/img-meals/prawn-burritos.jpg"),
      "prosciutto-mozza-focaccia": require("../assets/images/img-meals/prosciutto-mozza-focaccia.jpg"),
      "salmon-bagels": require("../assets/images/img-meals/salmon-bagels.jpg"),
      "salmon-poke-plate": require("../assets/images/img-meals/salmon-poke-plate.jpg"),
      "seafood-risotto": require("../assets/images/img-meals/seafood-risotto.jpg"),
      "tom-mozza-bruschetta": require("../assets/images/img-meals/tom-mozza-bruschetta.jpg"),
      "tuna-gnocchi": require("../assets/images/img-meals/tuna-gnocchi.jpg"),
      "tuna-pita": require("../assets/images/img-meals/tuna-pita.jpg"),
    };
    return filename ? imageMap[filename] : null;
  };

  const imageSource = meal ? getImageSource(meal.imageUrl) : null;

  return (
    <TouchableOpacity
      style={[
        styles.slot,
        !meal && styles.slotEmpty,
        meal && isCooked && styles.slotCooked,
      ]}
      onPress={onPress}
      testID={`meal-slot-${index}`}
      disabled={!meal}
    >
      <Text style={styles.dateLabel}>{dateLabel}</Text>

      {meal ? (
        <>
          {imageSource && (
            <Image source={imageSource} style={styles.image} resizeMode="cover" />
          )}
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2}>
              {meal.name}
            </Text>
            <TouchableOpacity
              style={[styles.cookedToggle, isCooked && styles.cookedToggleActive]}
              onPress={(e) => {
                e.stopPropagation();
                onToggleCooked(index);
              }}
            >
              {isCooked && <Text style={styles.cookedCheck}>✓</Text>}
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContent}>
          <Text style={styles.emptyText}>Empty slot</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  slot: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    minHeight: 120,
  },
  slotEmpty: {
    backgroundColor: colors.gray6,
    borderStyle: "dashed",
  },
  slotCooked: {
    opacity: 0.6,
  },
  dateLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textTertiary,
    padding: spacing.xs,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.gray6,
  },
  image: {
    width: "100%",
    height: 80,
    backgroundColor: colors.gray6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: spacing.sm,
    gap: spacing.xs,
  },
  title: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  cookedToggle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  cookedToggleActive: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  cookedCheck: {
    color: colors.textWhite,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  emptyContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.lg,
  },
  emptyText: {
    fontSize: typography.fontSize.sm,
    color: colors.textTertiary,
  },
});
