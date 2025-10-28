import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useOffline } from "@/hooks/useOffline";
import { colors, spacing, typography } from "@/styles/theme";

export const OfflineStatus: React.FC = () => {
  const { isOnline, isOfflineReady } = useOffline();

  if (isOnline) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.offlineIndicator}>
        <Text style={styles.icon}>📱</Text>
        <Text style={styles.text}>
          {isOfflineReady ? "Offline - Using cached data" : "Offline - Limited functionality"}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.warning,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  offlineIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    fontSize: typography.fontSize.lg,
    marginRight: spacing.sm,
  },
  text: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
    fontWeight: typography.fontWeight.medium,
  },
});

export default OfflineStatus;
