import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { getMealById } from "../models/mealData";
import { getIngredientById } from "../models/ingredients";
import { getTagById } from "../models/tagDefinitions";
import { Icon } from "./Icon";
import { colors, spacing, typography, borderRadius } from "../styles/theme";

interface MealDetailsModalProps {
  mealId: string;
}

export function MealDetailsModal({ mealId }: MealDetailsModalProps) {
  const meal = getMealById(mealId);

  if (!meal) {
    return (
      <View testID="meal-modal-not-found">
        <Text style={styles.title} testID="meal-modal-title">Meal not found</Text>
        <Text style={styles.text}>Sorry, we couldn't find the details for this meal.</Text>
      </View>
    );
  }

  const ingredientNames = meal.ingredients
    .map((ingredientId: string) => getIngredientById(ingredientId))
    .filter((ingredient: any) => ingredient !== null)
    .map((ingredient: any) => ingredient!.name);

  // Get image source
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

  const imageSource = getImageSource(meal.imageUrl);

  return (
    <ScrollView style={styles.container} testID={`meal-modal-${mealId}`}>
      {imageSource && (
        <View style={styles.imageContainer} testID="meal-modal-image">
          <Image source={imageSource} style={styles.image} testID="meal-modal-img" resizeMode="cover" />
        </View>
      )}
      
      <View style={styles.content} testID="meal-modal-details">
        <Text style={styles.title} testID="meal-modal-title">{meal.name}</Text>

        {meal.tags?.convenience && meal.tags.convenience.length > 0 && (
          <View style={styles.tags}>
            {meal.tags.convenience.map((tagId: string) => {
              const tag = getTagById(tagId);
              return tag ? (
                <View key={tagId} style={styles.tag}>
                  <Text style={styles.tagText}>{tag.name}</Text>
                </View>
              ) : null;
            })}
          </View>
        )}

        <View style={styles.splitSection}>
          <View style={styles.section} testID="meal-modal-ingredients">
            <View style={styles.sectionHeader}>
              <Icon name="carrot" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Ingredients</Text>
            </View>
            <View testID="meal-modal-ingredients-list">
              {ingredientNames.map((ingredientName: string, index: number) => (
                <Text key={index} style={styles.listItem} testID={`meal-modal-ingredient-${index}`}>
                  • {ingredientName}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="tools-kitchen" size={20} color={colors.primary} />
              <Text style={styles.sectionTitle}>Tools</Text>
            </View>
            <View>
              {meal.tools && meal.tools.length > 0 ? (
                meal.tools.map((tool: string, index: number) => (
                  <Text key={index} style={styles.listItem} testID={`meal-modal-tool-${index}`}>
                    • {tool}
                  </Text>
                ))
              ) : (
                <Text style={styles.listItem}>• No tools specified</Text>
              )}
            </View>
          </View>
        </View>

        {meal.seasoning && meal.seasoning.length > 0 && (
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>Seasoning:</Text>
            <Text style={styles.text}>
              {meal.seasoning
                .map((seasoningId: string) => getIngredientById(seasoningId))
                .filter((seasoning: any) => seasoning !== null)
                .map((seasoning: any) => seasoning!.name)
                .join(", ")}
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Icon name="list-numbers" size={20} color={colors.primary} />
            <Text style={styles.sectionTitle}>Steps</Text>
          </View>
          {meal.steps ? (
            <>
              {meal.steps.prep && meal.steps.prep.length > 0 && (
                <View style={styles.stepsSection}>
                  <Text style={styles.subsectionTitle}>Prep</Text>
                  {meal.steps.prep.map((step: string, index: number) => (
                    <Text key={`prep-${index}`} style={styles.stepItem} testID={`meal-modal-prep-step-${index}`}>
                      {index + 1}. {step}
                    </Text>
                  ))}
                </View>
              )}
              {meal.steps.cook && meal.steps.cook.length > 0 && (
                <View style={styles.stepsSection}>
                  <Text style={styles.subsectionTitle}>Cooking</Text>
                  {meal.steps.cook.map((step: string, index: number) => (
                    <Text 
                      key={`cook-${index}`} 
                      style={styles.stepItem} 
                      testID={`meal-modal-cook-step-${index}`}
                    >
                      {(meal.steps.prep ? meal.steps.prep.length + 1 : 1) + index}. {step}
                    </Text>
                  ))}
                </View>
              )}
            </>
          ) : (
            <Text style={styles.text}>No steps specified</Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: colors.gray6,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  tag: {
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.max,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  tagText: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  splitSection: {
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  listItem: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    lineHeight: typography.lineHeight.base,
  },
  notesSection: {
    backgroundColor: colors.gray6,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.lg,
  },
  notesTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  text: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    lineHeight: typography.lineHeight.base,
  },
  stepsSection: {
    marginBottom: spacing.md,
  },
  subsectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  stepItem: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    lineHeight: typography.lineHeight.base,
  },
});
