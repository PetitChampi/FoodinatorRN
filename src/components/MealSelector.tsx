import React, { useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { getIngredientById, ingredients } from "../models/ingredients";
import { meals } from "../models/mealData";
import { SelectableMealItem } from "./SelectableMealItem";
import { TagFilter } from "./TagFilter";
import { SearchInput } from "./SearchInput";
import { useFoodinatorStore, useRemainingSlots } from "../store/useFoodinatorStore";
import { Ingredient, Meal, MealTagId } from "../models/types";
import { ConvenienceTag, getTagById } from "../models/tagDefinitions";
import { colors, spacing, typography, borderRadius } from "../styles/theme";

export const MealSelector: React.FC = () => {
  const {
    searchState,
    addMeal,
    setSearchTerm,
    addIngredient,
    removeIngredient,
    clearIngredients,
  } = useFoodinatorStore();

  const remainingSlots = useRemainingSlots();

  const { filteredIngredients, matchingMeals } = useMemo(() => {
    const { searchTerm, selectedIngredients, selectedTags = [] } = searchState;
    const lowercasedSearchTerm = searchTerm.toLowerCase().trim();

    const filteredIngredients = lowercasedSearchTerm
      ? ingredients.filter(i =>
        i.name.toLowerCase().includes(lowercasedSearchTerm) &&
          !selectedIngredients.includes(i.id),
      )
      : [];

    let filteredMeals = meals;

    if (lowercasedSearchTerm) {
      filteredMeals = filteredMeals.filter((meal: Meal) =>
        meal.name.toLowerCase().includes(lowercasedSearchTerm),
      );
    }

    if (selectedIngredients.length > 0) {
      filteredMeals = filteredMeals.filter((meal: Meal) =>
        selectedIngredients.every((ingId: string) => meal.ingredients.includes(ingId)),
      );
    }

    if (selectedTags.length > 0) {
      filteredMeals = filteredMeals.filter((meal: Meal) => {
        if (!meal.tags) return false;

        return selectedTags.every((tagId: MealTagId) => {
          const tag = getTagById(tagId);
          if (!tag) return false;

          switch (tag.category) {
          case "cookingMethod":
            return meal.tags?.cookingMethod === tagId;
          case "base":
            return meal.tags?.base === tagId;
          case "proteinSource":
            return meal.tags?.proteinSource === tagId;
          case "convenience":
            return meal.tags?.convenience?.includes(tagId as ConvenienceTag) || false;
          default:
            return false;
          }
        });
      });
    }

    return { filteredIngredients, matchingMeals: filteredMeals };
  }, [searchState]);

  const showNoResultsMessage = (searchState.searchTerm.trim() !== "" || searchState.selectedIngredients.length > 0 || (searchState.selectedTags || []).length > 0) && matchingMeals.length === 0;

  return (
    <ScrollView style={styles.container} testID="meal-selector-container">
      <View style={styles.header}>
        <Text style={styles.title}>All meals</Text>
      </View>

      <View style={styles.searchControls}>
        <View style={styles.searchInput}>
          <SearchInput
            value={searchState.searchTerm}
            onChange={setSearchTerm}
            placeholder="Search meals"
            testID="meal-selector-search-input"
          />
        </View>
        <TagFilter />
      </View>

      {searchState.searchTerm.trim() !== "" && filteredIngredients.length > 0 && (
        <View style={styles.suggestions} testID="meal-selector-suggestions-list">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filteredIngredients.map((ingredient: Ingredient) => (
              <TouchableOpacity
                key={ingredient.id}
                style={styles.tag}
                onPress={() => addIngredient(ingredient.id)}
                testID={`suggestion-item-${ingredient.id}`}
              >
                <Text style={styles.tagText}>{ingredient.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      {searchState.selectedIngredients.length > 0 && (
        <View style={styles.selectedContainer} testID="meal-selector-selected-tags-container">
          <View style={styles.selectedHeader}>
            <Text style={styles.selectedTitle}>Selected ingredients</Text>
            <TouchableOpacity
              style={styles.clearButton}
              onPress={clearIngredients}
              testID="clear-filters"
            >
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.selectedTags}>
            {searchState.selectedIngredients.map((ingredientId: string) => {
              const ingredient = getIngredientById(ingredientId);
              if (!ingredient) return null;
              return (
                <View key={ingredientId} style={styles.selectedTag} testID={`selected-tag-${ingredientId}`}>
                  <Text style={styles.selectedTagText}>{ingredient.name}</Text>
                  <TouchableOpacity
                    onPress={() => removeIngredient(ingredientId)}
                    testID={`tag-remove-button-${ingredientId}`}
                  >
                    <Text style={styles.closeText}>×</Text>
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      )}

      {remainingSlots === 0 ? (
        <View style={[styles.alert, styles.alertSuccess]}>
          <Text style={styles.alertText}>
            <Text style={styles.alertBold}>All slots filled!</Text> Your weekly plan is complete.
          </Text>
        </View>
      ) : (
        <View style={styles.alert}>
          <Text style={styles.alertText}>
            <Text style={styles.alertBold}>{remainingSlots} slots</Text> remaining to fill.
          </Text>
        </View>
      )}

      {showNoResultsMessage ? (
        <View style={styles.emptyState} testID="no-results">
          <Text style={styles.emptyText}>No meals found matching your search and filter criteria.</Text>
        </View>
      ) : (
        <View style={styles.mealGrid}>
          {matchingMeals.map((meal: Meal) => (
            <View key={meal.id} style={styles.mealItem}>
              <SelectableMealItem
                meal={meal}
                onAddMeal={addMeal}
                remainingSlots={remainingSlots}
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
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
  },
  searchControls: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
  },
  suggestions: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  tag: {
    backgroundColor: colors.gray6,
    borderRadius: borderRadius.max,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
  },
  selectedContainer: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  selectedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  selectedTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  clearButton: {
    backgroundColor: colors.danger,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  clearButtonText: {
    fontSize: typography.fontSize.xs,
    color: colors.textWhite,
    fontWeight: typography.fontWeight.semibold,
  },
  selectedTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  selectedTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryLight,
    borderRadius: borderRadius.max,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    gap: spacing.xs,
  },
  selectedTagText: {
    fontSize: typography.fontSize.sm,
    color: colors.primary,
    fontWeight: typography.fontWeight.medium,
  },
  closeText: {
    fontSize: typography.fontSize.lg,
    color: colors.primary,
    fontWeight: typography.fontWeight.bold,
  },
  alert: {
    backgroundColor: colors.info,
    padding: spacing.md,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    borderRadius: borderRadius.sm,
  },
  alertSuccess: {
    backgroundColor: colors.success,
  },
  alertText: {
    fontSize: typography.fontSize.sm,
    color: colors.textWhite,
  },
  alertBold: {
    fontWeight: typography.fontWeight.bold,
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
  mealGrid: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  mealItem: {
    marginBottom: spacing.lg,
  },
});
