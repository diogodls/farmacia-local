import React, { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radii, spacing, typography } from "../styles/theme";

type InfoCardProps = {
  label: string;
  children: ReactNode;
};

export function InfoCard({ label, children }: InfoCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="information-circle-outline" size={16} color={colors.accent} />
        <Text style={styles.label}>{label}</Text>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.md,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
});
