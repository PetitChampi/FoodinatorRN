import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useModal, ModalSize } from "../contexts/ModalContext";
import { colors, spacing, typography, borderRadius } from "../styles/theme";

interface ConfirmationModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirmButtonClass?: string;
  size?: ModalSize;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function ConfirmationModal({
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  const { closeModal } = useModal();

  const handleCancel = () => {
    if (onCancel) onCancel();
    closeModal();
  };

  const handleConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} testID="confirmation-modal-title">{title}</Text>
      <Text style={styles.message} testID="confirmation-modal-message">{message}</Text>
      <View style={styles.actions}>
        <TouchableOpacity
          onPress={handleCancel}
          style={[styles.button, styles.cancelButton]}
          testID="confirmation-modal-cancel"
        >
          <Text style={styles.cancelButtonText}>{cancelText}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleConfirm}
          style={[styles.button, styles.confirmButton]}
          testID="confirmation-modal-confirm"
        >
          <Text style={styles.confirmButtonText}>{confirmText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function useConfirmationModal() {
  const { openModal } = useModal();

  const openConfirmation = (props: ConfirmationModalProps) => {
    const { size = "sm", ...modalProps } = props;
    openModal(<ConfirmationModal {...modalProps} />, size);
  };

  return { openConfirmation };
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
    lineHeight: typography.lineHeight.base,
  },
  actions: {
    flexDirection: "row",
    gap: spacing.md,
    justifyContent: "flex-end",
  },
  button: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.sm,
    minWidth: 80,
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: colors.gray5,
  },
  confirmButton: {
    backgroundColor: colors.danger,
  },
  cancelButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textPrimary,
  },
  confirmButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textWhite,
  },
});
