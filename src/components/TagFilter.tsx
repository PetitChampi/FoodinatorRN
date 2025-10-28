import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Modal, StyleSheet } from "react-native";
import { TAG_CATEGORIES, getTagsByCategory, TagCategory, getTagById } from "@/models/tagDefinitions";
import { useFoodinatorStore } from "@/store/useFoodinatorStore";
import { Icon } from "./Icon";
import { MealTagId } from "@/models/types";
import { colors, spacing, typography, borderRadius, shadows } from "@/styles/theme";

export const TagFilter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { searchState, addTag, removeTag, clearTags } = useFoodinatorStore();

  const toggleDropdown = () => setIsOpen(!isOpen);

  const singleSelectCategories: TagCategory[] = ["cookingMethod", "base", "proteinSource"];

  const handleTagClick = (tagId: string) => {
    const selectedTags = searchState.selectedTags || [];
    const tag = getTagById(tagId);

    if (!tag) return;

    const typedTagId = tagId as MealTagId;

    if (selectedTags.includes(typedTagId)) {
      removeTag(typedTagId);
    } else {
      if (singleSelectCategories.includes(tag.category)) {
        const categoryTags = getTagsByCategory(tag.category);
        const existingTagInCategory = selectedTags.find(selectedTagId =>
          categoryTags.some(categoryTag => categoryTag.id === selectedTagId),
        );

        if (existingTagInCategory) {
          removeTag(existingTagInCategory);
        }
      }

      addTag(typedTagId);
    }
  };

  const getCategorySelectedTag = (category: TagCategory): string | null => {
    const selectedTags = searchState.selectedTags || [];
    const categoryTags = getTagsByCategory(category);
    return selectedTags.find(selectedTagId =>
      categoryTags.some(categoryTag => categoryTag.id === selectedTagId),
    ) || null;
  };

  const selectedTagsCount = (searchState.selectedTags || []).length;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isOpen && styles.buttonActive]}
        onPress={toggleDropdown}
      >
        <Icon name="filter" size={20} color={colors.textPrimary} />
        {selectedTagsCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{selectedTagsCount}</Text>
          </View>
        )}
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter by Tags</Text>
              <TouchableOpacity onPress={() => setIsOpen(false)}>
                <Icon name="chevron-down" size={24} color={colors.textPrimary} />
              </TouchableOpacity>
            </View>

            {searchState.selectedTags.length > 0 && (
              <View style={styles.clearFiltersContainer}>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => {
                    clearTags();
                    setIsOpen(false);
                  }}
                >
                  <Text style={styles.clearButtonText}>Clear filters</Text>
                </TouchableOpacity>
              </View>
            )}

            <ScrollView style={styles.scrollView}>
              {Object.entries(TAG_CATEGORIES).map(([categoryKey, categoryName]) => {
                const category = categoryKey as TagCategory;
                const categoryTags = getTagsByCategory(category);
                const selectedTagInCategory = getCategorySelectedTag(category);
                const isSingleSelectCategory = singleSelectCategories.includes(category);

                return (
                  <View key={category} style={styles.category}>
                    <Text style={styles.categoryTitle}>{categoryName}</Text>
                    <View style={styles.tagContainer}>
                      {categoryTags.map((tag) => {
                        const isSelected = (searchState.selectedTags || []).includes(tag.id as MealTagId);
                        const isInactive = isSingleSelectCategory && selectedTagInCategory && !isSelected;

                        return (
                          <TouchableOpacity
                            key={tag.id}
                            style={[
                              styles.tag,
                              isSelected && styles.tagSelected,
                              isInactive && styles.tagInactive,
                            ]}
                            onPress={() => handleTagClick(tag.id)}
                          >
                            <Text
                              style={[
                                styles.tagText,
                                isSelected && styles.tagTextSelected,
                                isInactive && styles.tagTextInactive,
                              ]}
                            >
                              {tag.name}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: colors.gray5,
    borderRadius: borderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  buttonActive: {
    backgroundColor: colors.primary,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: colors.danger,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.textWhite,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    width: "90%",
    maxHeight: "80%",
    ...shadows.lg,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  clearFiltersContainer: {
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  clearButton: {
    backgroundColor: colors.danger,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: "center",
  },
  clearButtonText: {
    color: colors.textWhite,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  scrollView: {
    padding: spacing.lg,
  },
  category: {
    marginBottom: spacing.xl,
  },
  categoryTitle: {
    fontSize: typography.fontSize.md,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  tag: {
    backgroundColor: colors.gray6,
    borderRadius: borderRadius.max,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  tagInactive: {
    opacity: 0.4,
  },
  tagText: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
  },
  tagTextSelected: {
    color: colors.textWhite,
    fontWeight: typography.fontWeight.semibold,
  },
  tagTextInactive: {
    color: colors.textTertiary,
  },
});
