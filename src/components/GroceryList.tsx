import React, { useState, useEffect, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { GroceryItem } from "@/models/types";
import { getIngredientById } from "@/models/ingredients";
import { getMealById } from "@/models/mealData";
import { useFoodinatorStore } from "@/store/useFoodinatorStore";
import { useDebounce } from "@/hooks/useDebounce";
import { Icon } from "./Icon";
import { RestockManager } from "./RestockManager";
import { colors, spacing, typography, borderRadius } from "@/styles/theme";

type GroceryTabType = "list" | "restock";

export const GroceryList: React.FC = () => {
  const mealSlots = useFoodinatorStore(state => state.mealSlots);
  const checkedItems = useFoodinatorStore(state => state.checkedItems);
  const notes = useFoodinatorStore(state => state.notes);
  const toggleItemChecked = useFoodinatorStore(state => state.toggleItemChecked);
  const updateNotes = useFoodinatorStore(state => state.updateNotes);

  const [activeTab, setActiveTab] = useState<GroceryTabType>("list");

  const { items, isEmpty, groupedByMeal, seasoningStaples } = useMemo(() => {
    const mealIdsInOrder = mealSlots.map(slot => slot.mealId);

    const ingredientPortions = new Map<string, number>();
    const seasoningStaplesSet = new Set<string>();

    mealIdsInOrder.forEach(mealId => {
      if (!mealId) return;
      const meal = getMealById(mealId);
      if (!meal) return;

      meal.ingredients.forEach((ingredientId: string) => {
        const currentPortions = ingredientPortions.get(ingredientId) || 0;
        ingredientPortions.set(ingredientId, currentPortions + 1);
      });

      if (meal.seasoning) {
        meal.seasoning.forEach((seasoningId: string) => {
          seasoningStaplesSet.add(seasoningId);
        });
      }
    });

    if (ingredientPortions.size === 0) {
      return { items: [], isEmpty: true, groupedByMeal: new Map(), seasoningStaples: [] };
    }

    const allItems: GroceryItem[] = Array.from(ingredientPortions.entries()).map(([id, portions]) => ({
      ingredientId: id,
      portions,
      checked: checkedItems[id] || false,
    }));

    const mealGroups = new Map<string, GroceryItem[]>();
    const assignedIngredients = new Set<string>();

    const uniqueMealsInOrder = [...new Set(mealIdsInOrder.filter(id => id !== null) as string[])];

    uniqueMealsInOrder.forEach(mealId => {
      const meal = getMealById(mealId);
      if (!meal) return;

      const mealGroupItems: GroceryItem[] = [];
      meal.ingredients.forEach((ingredientId: string) => {
        if (ingredientPortions.has(ingredientId) && !assignedIngredients.has(ingredientId)) {
          mealGroupItems.push({
            ingredientId: ingredientId,
            portions: ingredientPortions.get(ingredientId)!,
            checked: checkedItems[ingredientId] || false,
          });
          assignedIngredients.add(ingredientId);
        }
      });

      if (mealGroupItems.length > 0) {
        mealGroups.set(mealId, mealGroupItems);
      }
    });

    const seasoningStaplesItems = Array.from(seasoningStaplesSet).map(seasoningId => ({
      ingredientId: seasoningId,
      portions: 1,
      checked: checkedItems[seasoningId] || false,
    }));

    return {
      items: allItems,
      isEmpty: allItems.length === 0,
      groupedByMeal: mealGroups,
      seasoningStaples: seasoningStaplesItems,
    };
  }, [mealSlots, checkedItems]);

  const [sortBy, setSortBy] = useState<"name" | "portions" | "meal">("meal");
  const [showChecked, setShowChecked] = useState(true);
  const [seasoningCollapsed, setSeasoningCollapsed] = useState(true);

  const [localNotes, setLocalNotes] = useState(notes);
  const debouncedNotes = useDebounce(localNotes, 500);

  useEffect(() => {
    updateNotes(debouncedNotes);
  }, [debouncedNotes, updateNotes]);

  useEffect(() => {
    if (notes !== localNotes) {
      setLocalNotes(notes);
    }
  }, [notes, localNotes]);

  const filteredItems = showChecked ? items : items.filter(item => !item.checked);

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "name") {
      const nameA = getIngredientById(a.ingredientId)?.name || "";
      const nameB = getIngredientById(b.ingredientId)?.name || "";
      return nameA.localeCompare(nameB);
    } else if (sortBy === "portions") {
      return b.portions - a.portions;
    }
    return 0;
  });

  const renderGroceryItem = (item: GroceryItem) => {
    const ingredient = getIngredientById(item.ingredientId);
    if (!ingredient) return null;
    return (
      <TouchableOpacity
        key={item.ingredientId}
        style={styles.itemContainer}
        onPress={() => toggleItemChecked(item.ingredientId)}
        testID={`grocery-item-${item.ingredientId}`}
      >
        <View style={[styles.checkbox, item.checked && styles.checkboxChecked]}>
          {item.checked && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text
          style={[styles.itemLabel, item.checked && styles.itemLabelChecked]}
          testID={`grocery-item-label-${item.ingredientId}`}
        >
          {ingredient.name}
        </Text>
        {item.portions > 1 && (
          <View style={styles.badge} testID={`grocery-item-badge-${item.ingredientId}`}>
            <Text style={styles.badgeText}>{item.portions}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={styles.container} testID="grocery-list-container">
      <View style={styles.header}>
        <Text style={styles.title}>Groceries</Text>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === "list" && styles.tabActive]}
          onPress={() => setActiveTab("list")}
          testID="grocery-tab-list"
        >
          <Text style={[styles.tabText, activeTab === "list" && styles.tabTextActive]}>
            Grocery list
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === "restock" && styles.tabActive]}
          onPress={() => setActiveTab("restock")}
          testID="grocery-tab-restock"
        >
          <Text style={[styles.tabText, activeTab === "restock" && styles.tabTextActive]}>
            Restock manager
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === "list" && (
        <>
          {!isEmpty && (
            <View style={styles.controls}>
              <View style={styles.sortContainer}>
                <TouchableOpacity
                  style={styles.sortButton}
                  onPress={() => {
                    const options: ("name" | "portions" | "meal")[] = ["meal", "name", "portions"];
                    const currentIndex = options.indexOf(sortBy);
                    setSortBy(options[(currentIndex + 1) % options.length]);
                  }}
                  testID="grocery-sort-dropdown"
                >
                  <Text style={styles.sortButtonText}>
                    {sortBy === "meal" ? "Group by Meal" : sortBy === "name" ? "Sort by Name" : "Sort by Quantity"}
                  </Text>
                  <Icon name="chevron-down" size={16} color={colors.textPrimary} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.toggleButton}
                onPress={() => setShowChecked(!showChecked)}
                testID="grocery-toggle-checked-button"
              >
                <Text style={styles.toggleButtonText}>
                  {showChecked ? "Hide checked" : "Show All"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {isEmpty ? (
            <View style={styles.emptyState} testID="grocery-empty-state">
              <Text style={styles.emptyText}>
                Your grocery list will appear here once you select meals.
              </Text>
            </View>
          ) : (
            <>
              {seasoningStaples.length > 0 && (
                <View style={styles.section} testID="grocery-section-seasoning-staples">
                  <TouchableOpacity
                    style={styles.sectionHeader}
                    onPress={() => setSeasoningCollapsed(!seasoningCollapsed)}
                    testID="grocery-section-title-seasoning-staples"
                  >
                    <Text style={styles.sectionTitle}>Seasoning staples</Text>
                    <Icon
                      name="chevron-down"
                      size={20}
                      color={colors.textPrimary}
                      style={[styles.collapseIcon, !seasoningCollapsed && styles.collapseIconExpanded]}
                    />
                  </TouchableOpacity>
                  {!seasoningCollapsed && (
                    <View testID="grocery-section-list-seasoning-staples">
                      {seasoningStaples
                        .filter(item => showChecked || !item.checked)
                        .map(renderGroceryItem)}
                    </View>
                  )}
                </View>
              )}

              {sortBy === "meal" && groupedByMeal ? (
                <>
                  {Array.from(groupedByMeal.entries()).map(([mealId, mealItems]) => {
                    const filteredMealItems = showChecked ? mealItems : mealItems.filter((item: GroceryItem) => !item.checked);
                    if (filteredMealItems.length === 0) return null;
                    const meal = getMealById(mealId);
                    if (!meal) return null;
                    return (
                      <View
                        key={mealId}
                        style={styles.section}
                        testID={`grocery-section-${mealId}`}
                      >
                        <Text style={styles.sectionTitle} testID={`grocery-section-title-${mealId}`}>
                          {meal.name}
                        </Text>
                        <View testID={`grocery-section-list-${mealId}`}>
                          {filteredMealItems.map(renderGroceryItem)}
                        </View>
                      </View>
                    );
                  })}
                </>
              ) : (
                <View style={styles.section} testID="grocery-section">
                  <View testID="grocery-section-list">
                    {sortedItems.map(renderGroceryItem)}
                  </View>
                </View>
              )}
            </>
          )}
          <View style={styles.notesContainer} testID="grocery-notes-container">
            <Text style={styles.notesTitle}>Notes</Text>
            <TextInput
              style={styles.notesInput}
              value={localNotes}
              onChangeText={setLocalNotes}
              placeholder="Add notes for your grocery list here..."
              placeholderTextColor={colors.gray4}
              multiline
              numberOfLines={4}
              maxLength={1000}
              testID="grocery-notes-textarea"
            />
            <Text style={styles.notesCounter} testID="grocery-notes-counter">
              {localNotes.length}/1000
            </Text>
          </View>
        </>
      )}

      {activeTab === "restock" && (
        <RestockManager />
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
  tabs: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    marginBottom: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabActive: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: typography.fontSize.base,
    color: colors.textTertiary,
  },
  tabTextActive: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  controls: {
    flexDirection: "row",
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  sortContainer: {
    flex: 1,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  sortButtonText: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
  },
  toggleButton: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    justifyContent: "center",
  },
  toggleButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
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
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  collapseIcon: {
    transform: [{ rotate: "0deg" }],
  },
  collapseIconExpanded: {
    transform: [{ rotate: "180deg" }],
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  checkmark: {
    color: colors.textWhite,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  itemLabel: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
  },
  itemLabelChecked: {
    color: colors.textTertiary,
    textDecorationLine: "line-through",
  },
  badge: {
    backgroundColor: colors.gray5,
    borderRadius: borderRadius.max,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    minWidth: 24,
    alignItems: "center",
  },
  badgeText: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  notesContainer: {
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  notesTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  notesInput: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    padding: spacing.md,
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
    minHeight: 100,
    textAlignVertical: "top",
  },
  notesCounter: {
    fontSize: typography.fontSize.xs,
    color: colors.textTertiary,
    textAlign: "right",
    marginTop: spacing.xs,
  },
});
