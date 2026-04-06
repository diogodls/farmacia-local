import React, { ReactNode } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, typography } from "../styles/theme";

type ListRowProps = {
  title: string;
  subtitle: string;
  actionLabel: string;
  onPress: () => void;
  rightSlot?: ReactNode;
};

export function ListRow({
  title,
  subtitle,
  actionLabel,
  onPress,
  rightSlot,
}: ListRowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.leftContent}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>

      {rightSlot ?? (
        <View style={styles.actionWrap}>
          <Text style={styles.action}>{actionLabel}</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.accent} />
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
  },
  leftContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.bodyLg,
    fontWeight: "600",
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: typography.bodySm,
    marginTop: 4,
  },
  action: {
    color: colors.accent,
    fontWeight: "700",
  },
  actionWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
