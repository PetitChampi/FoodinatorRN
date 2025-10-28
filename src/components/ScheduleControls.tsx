import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, spacing, typography, borderRadius } from "@/styles/theme";

interface ScheduleControlsProps {
  startDate: string;
  onUpdateStartDate: (date: string) => void;
}

export const ScheduleControls: React.FC<ScheduleControlsProps> = ({
  startDate,
  onUpdateStartDate,
}) => {
  const currentDate = startDate || new Date().toISOString().split("T")[0];
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { 
      weekday: "short", 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };

  const adjustDate = (days: number) => {
    const date = new Date(currentDate);
    date.setDate(date.getDate() + days);
    onUpdateStartDate(date.toISOString().split("T")[0]);
  };

  return (
    <View style={styles.container} testID="schedule-controls">
      <View style={styles.dateGroup} testID="schedule-date-group">
        <Text style={styles.label} testID="schedule-date-label">
          Start date:
        </Text>
        <View style={styles.dateControls}>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => adjustDate(-7)}
          >
            <Text style={styles.buttonText}>◀ Week</Text>
          </TouchableOpacity>
          
          <View style={styles.dateDisplay} testID="schedule-date-input">
            <Text style={styles.dateText}>{formatDate(currentDate)}</Text>
          </View>
          
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => adjustDate(7)}
          >
            <Text style={styles.buttonText}>Week ▶</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  dateGroup: {
    gap: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  dateControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  dateButton: {
    backgroundColor: colors.secondary,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  buttonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  dateDisplay: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: "center",
  },
  dateText: {
    fontSize: typography.fontSize.sm,
    color: colors.textPrimary,
  },
});
