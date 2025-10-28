import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, spacing, typography, borderRadius } from "@/styles/theme";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  increaseDisabled?: boolean;
  decreaseDisabled?: boolean;
  ariaLabelPrefix: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  increaseDisabled = false,
  decreaseDisabled = false,
  ariaLabelPrefix,
}) => {
  return (
    <View style={styles.container} testID={`quantity-selector-${ariaLabelPrefix}`}>
      <TouchableOpacity
        style={[styles.button, decreaseDisabled && styles.buttonDisabled]}
        onPress={onDecrease}
        disabled={decreaseDisabled}
        accessibilityLabel={`Decrease quantity of ${ariaLabelPrefix}`}
        testID={`decrease-button-${ariaLabelPrefix}`}
      >
        <Text style={[styles.buttonText, decreaseDisabled && styles.buttonTextDisabled]}>-</Text>
      </TouchableOpacity>
      
      <Text style={styles.quantity} testID={`quantity-display-${ariaLabelPrefix}`}>
        {quantity}
      </Text>
      
      <TouchableOpacity
        style={[styles.button, increaseDisabled && styles.buttonDisabled]}
        onPress={onIncrease}
        disabled={increaseDisabled}
        accessibilityLabel={`Increase quantity of ${ariaLabelPrefix}`}
        testID={`increase-button-${ariaLabelPrefix}`}
      >
        <Text style={[styles.buttonText, increaseDisabled && styles.buttonTextDisabled]}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  button: {
    width: 32,
    height: 32,
    backgroundColor: colors.gray5,
    borderRadius: borderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonDisabled: {
    backgroundColor: colors.gray6,
    opacity: 0.5,
  },
  buttonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  buttonTextDisabled: {
    color: colors.gray4,
  },
  quantity: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
    minWidth: 24,
    textAlign: "center",
  },
});
