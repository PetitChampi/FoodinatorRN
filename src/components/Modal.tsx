import React from "react";
import { View, Text, TouchableOpacity, Modal as RNModal, StyleSheet } from "react-native";
import { useModal } from "@/contexts/ModalContext";
import { colors, spacing, borderRadius, shadows } from "@/styles/theme";

export function Modal() {
  const { isOpen, content, size, closeModal } = useModal();

  if (!isOpen) {
    return null;
  }

  // Map size to width
  const getModalStyle = () => {
    switch (size) {
      case "sm":
        return { width: "80%" as const };
      case "md":
        return { width: "90%" as const };
      case "lg":
        return { width: "95%" as const };
      default:
        return { width: "80%" as const };
    }
  };

  return (
    <RNModal
      visible={isOpen}
      transparent
      animationType="fade"
      onRequestClose={closeModal}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={closeModal}
      >
        <View
          style={[styles.modalBody, getModalStyle()]}
          onStartShouldSetResponder={() => true}
        >
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeModal}
            accessibilityLabel="Close modal"
            testID="modal-close-button"
          >
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          
          <View style={styles.content} testID="modal-content">
            {content}
          </View>
        </View>
      </TouchableOpacity>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
  },
  modalBody: {
    backgroundColor: colors.cardBackground,
    borderRadius: borderRadius.lg,
    maxHeight: "90%",
    ...shadows.xl,
  },
  closeButton: {
    position: "absolute",
    top: spacing.sm,
    right: spacing.sm,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 24,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  content: {
    padding: spacing.lg,
  },
});
