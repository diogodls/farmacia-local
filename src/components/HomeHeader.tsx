import React from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import type { Medicine } from "../types/pharmacy";
import { colors, radii, spacing, typography } from "../styles/theme";

type HomeHeaderProps = {
  query: string;
  autocompleteOptions: Medicine[];
  favorites: string[];
  onChangeQuery: (value: string) => void;
  onSelectMedicine: (medicine: Medicine) => void;
  onOpenMenu: () => void;
};

export function HomeHeader({
  query,
  autocompleteOptions,
  favorites,
  onChangeQuery,
  onSelectMedicine,
  onOpenMenu,
}: HomeHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <View style={styles.heroTopRow}>
          <Pressable style={styles.menuButton} onPress={onOpenMenu}>
            <Ionicons name="menu" size={20} color={colors.surfaceTint} />
          </Pressable>
          <View style={styles.heroBadge}>
            <Ionicons name="medkit" size={16} color={colors.surfaceTint} />
            <Text style={styles.heroBadgeText}>Santa Maria - RS</Text>
          </View>
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.title}>Farmacia Popular</Text>
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={26}
            color={colors.warning}
          />
        </View>
        <Text style={styles.subtitle}>
          Pesquise pelo remedio e veja no mapa as farmacias populares da cidade.
        </Text>
      </View>

      <View style={styles.searchWrapper}>
        <Ionicons name="search" size={20} color={colors.accent} />
        <TextInput
          style={styles.searchInput}
          placeholder="Digite o nome do remedio"
          placeholderTextColor={colors.textMuted}
          value={query}
          onChangeText={onChangeQuery}
        />
      </View>

      {autocompleteOptions.length > 0 ? (
        <View style={styles.autocompleteContainer}>
          <View style={styles.autocompleteHeader}>
            <Ionicons name="sparkles-outline" size={16} color={colors.accent} />
            <Text style={styles.autocompleteHeaderText}>Sugestoes encontradas</Text>
          </View>
          {autocompleteOptions.map((medicine) => (
            <Pressable
              key={medicine.id}
              style={styles.autocompleteItem}
              onPress={() => onSelectMedicine(medicine)}
            >
              <View style={styles.autocompleteMain}>
                <View style={styles.autocompleteIcon}>
                  <MaterialCommunityIcons
                    name="pill"
                    size={18}
                    color={colors.accent}
                  />
                </View>
                <View>
                  <Text style={styles.autocompleteTitle}>{medicine.name}</Text>
                  <Text style={styles.autocompleteSubtitle}>{medicine.category}</Text>
                </View>
              </View>
              <Text style={styles.autocompleteTag}>
                {favorites.includes(medicine.id) ? "Favorito" : "Selecionar"}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  heroCard: {
    backgroundColor: colors.hero,
    borderRadius: radii.xl,
    padding: spacing.md,
    gap: 10,
  },
  heroTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  menuButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  heroBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  heroBadgeText: {
    color: colors.surfaceTint,
    fontWeight: "700",
    fontSize: typography.caption,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  title: {
    fontSize: typography.title,
    fontWeight: "700",
    color: colors.surfaceTint,
  },
  subtitle: {
    color: "#dfece6",
    fontSize: typography.bodySm,
    lineHeight: 21,
  },
  searchWrapper: {
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  autocompleteContainer: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    paddingVertical: spacing.xs,
    shadowColor: colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  autocompleteHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.xs,
  },
  autocompleteHeaderText: {
    color: colors.textSecondary,
    fontWeight: "700",
    fontSize: typography.caption,
  },
  autocompleteItem: {
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  autocompleteMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
    marginRight: spacing.sm,
  },
  autocompleteIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  autocompleteTitle: {
    fontSize: typography.body,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  autocompleteSubtitle: {
    fontSize: typography.bodySm,
    color: colors.textMuted,
    marginTop: 2,
  },
  autocompleteTag: {
    fontSize: typography.caption,
    fontWeight: "700",
    color: colors.accent,
  },
});
