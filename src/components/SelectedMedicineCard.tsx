import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import type { Medicine } from "../types/pharmacy";
import { colors, radii, spacing, typography } from "../styles/theme";

type SelectedMedicineCardProps = {
  medicine: Medicine;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onOpenDetails: () => void;
};

export function SelectedMedicineCard({
  medicine,
  isFavorite,
  onToggleFavorite,
  onOpenDetails,
}: SelectedMedicineCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.leadingArea}>
          <View style={styles.iconBadge}>
            <MaterialCommunityIcons name="pill" size={22} color={colors.accent} />
          </View>

          <View style={styles.textContent}>
            <Text style={styles.title}>{medicine.name}</Text>
            <Text style={styles.subtitle}>
              {medicine.category} | {medicine.dosage}
            </Text>
          </View>
        </View>

        <Pressable style={styles.favoriteChip} onPress={onToggleFavorite}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={16}
            color={colors.accent}
          />
          <Text style={styles.favoriteAction}>
            {isFavorite ? "Salvo" : "Salvar"}
          </Text>
        </Pressable>
      </View>

      <Text style={styles.description}>{medicine.description}</Text>

      <Pressable style={styles.detailsButton} onPress={onOpenDetails}>
        <Ionicons name="information-circle-outline" size={18} color={colors.surfaceTint} />
        <Text style={styles.detailsButtonText}>Ver detalhes do remedio</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.sm,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  leadingArea: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    flex: 1,
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  textContent: {
    flex: 1,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.bodyLg,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: 4,
  },
  description: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  favoriteChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radii.pill,
  },
  favoriteAction: {
    color: colors.accent,
    fontWeight: "700",
  },
  detailsButton: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    backgroundColor: colors.banner,
    borderRadius: radii.pill,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  detailsButtonText: {
    color: colors.surfaceTint,
    fontWeight: "700",
  },
});
