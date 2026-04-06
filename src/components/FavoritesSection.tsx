import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import type { Medicine } from "../types/pharmacy";
import { colors, radii, spacing, typography } from "../styles/theme";

type FavoritesSectionProps = {
  medicines: Medicine[];
  onOpenMedicine: (medicine: Medicine) => void;
};

export function FavoritesSection({
  medicines,
  onOpenMedicine,
}: FavoritesSectionProps) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {medicines.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="heart-outline" size={38} color={colors.textMuted} />
          <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
          <Text style={styles.emptySubtitle}>
            Abra um remedio e toque em favoritar para salvar aqui.
          </Text>
        </View>
      ) : (
        medicines.map((medicine) => (
          <Pressable
            key={medicine.id}
            style={styles.card}
            onPress={() => onOpenMedicine(medicine)}
          >
            <View style={styles.leftContent}>
              <View style={styles.iconBadge}>
                <MaterialCommunityIcons name="pill" size={20} color={colors.accent} />
              </View>
              <View>
                <Text style={styles.title}>{medicine.name}</Text>
                <Text style={styles.subtitle}>{medicine.category}</Text>
              </View>
            </View>
            <View style={styles.actionArea}>
              <Ionicons name="chevron-forward" size={18} color={colors.accent} />
              <Text style={styles.action}>Abrir</Text>
            </View>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  emptyState: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  emptyTitle: {
    color: colors.textPrimary,
    fontSize: typography.titleSm,
    fontWeight: "700",
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
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
  actionArea: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
