/**
 * Theme system for Foodinator React Native
 * Converted from SCSS variables
 */

// Colors
export const colors = {
  // Accent colors
  primary: "#DE6052",
  primaryLight: "#FAE7E5",
  secondary: "#FFDDAB",
  
  // Neutral colors
  gray1: "#3F3B3B",
  gray2: "#554E4F",
  gray3: "#938A8B",
  gray4: "#BAB5B5",
  gray5: "#E2DFDF",
  gray6: "#F5F4F4",
  
  // Background colors
  background: "#F5F4F4",
  cardBackground: "#ffffff",
  
  // Border colors
  border: "#e0e0e0",
  borderLight: "#f0f0f0",
  
  // Status colors
  success: "#69990F",
  danger: "#E50060",
  warning: "#BF9F00",
  info: "#1592A6",
  
  // Hover states (darker versions for press states)
  primaryHover: "#c5544a",
  secondaryHover: "#e6c699",
  dangerHover: "#cc0056",
  
  // Text colors
  textPrimary: "#3F3B3B",
  textSecondary: "#554E4F",
  textTertiary: "#938A8B",
  textLight: "#BAB5B5",
  textWhite: "#ffffff",
};

// Typography
export const typography = {
  fontFamily: "System", // React Native uses system fonts by default
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    md: 18,
    lg: 20,
    xl: 24,
    xxl: 32,
  },
  fontWeight: {
    normal: "400" as const,
    medium: "500" as const,
    semibold: "600" as const,
    bold: "700" as const,
  },
  lineHeight: {
    sm: 20,
    base: 24,
    lg: 28,
  },
};

// Spacing
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 30,
};

// Border radius
export const borderRadius = {
  sm: 5,
  md: 10,
  lg: 15,
  xl: 20,
  max: 1000,
};

// Shadows (React Native shadow properties)
export const shadows = {
  sm: {
    shadowColor: colors.gray1,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2, // Android
  },
  md: {
    shadowColor: colors.gray1,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4, // Android
  },
  lg: {
    shadowColor: colors.gray1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8, // Android
  },
  xl: {
    shadowColor: colors.gray1,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 12, // Android
  },
};

// Z-index (for Android elevation and iOS zIndex)
export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// Grid/Layout
export const layout = {
  containerMaxWidth: 1200,
  gridGap: 20,
  gridGapSm: 15,
  gridGapLg: 30,
};

// Common styles
export const commonStyles = {
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  input: {
    backgroundColor: colors.cardBackground,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.base,
    color: colors.textPrimary,
  },
  button: {
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  buttonTextPrimary: {
    color: colors.textWhite,
  },
  buttonTextSecondary: {
    color: colors.textPrimary,
  },
};

// Export default theme object
export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  zIndex,
  layout,
  commonStyles,
};

export default theme;
