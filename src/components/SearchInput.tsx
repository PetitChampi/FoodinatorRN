import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Icon } from "./Icon";
import { colors, spacing, typography, borderRadius } from "@/styles/theme";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  testID?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  testID,
}) => {
  return (
    <View style={styles.container}>
      <Icon name="search" size={20} color={colors.gray3} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.gray4}
        value={value}
        onChangeText={onChange}
        testID={testID}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
    padding: 0,
  },
});
