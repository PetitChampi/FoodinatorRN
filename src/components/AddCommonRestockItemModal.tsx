import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing, typography } from "@/styles/theme";

export const AddCommonRestockItemModal: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Common Restock Item</Text>
      <Text style={styles.text}>
        Common restock item functionality will be implemented here.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  text: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
  },
});
