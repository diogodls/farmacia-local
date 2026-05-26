import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import type { Medicine, Pharmacy } from "../types/pharmacy";
import { colors, radii, spacing, typography } from "../styles/theme";
import { formatAddress } from "../utils/formatters";
import { InfoCard } from "./InfoCard";
import { ListRow } from "./ListRow";

type MedicineDetailsScreenProps = {
  medicine: Medicine;
  pharmacies: Pharmacy[];
  favorites: string[];
  onBack: () => void;
  onOpenPharmacy: (pharmacy: Pharmacy) => void;
  onToggleFavorite: (medicineId: string) => void;
};

export function MedicineDetailsScreen({
  medicine,
  pharmacies,
  favorites,
  onBack,
  onOpenPharmacy,
  onToggleFavorite,
}: MedicineDetailsScreenProps) {
  const isFavorite = favorites.includes(medicine.id);
  const relatedPharmacies =
    medicine.pharmacies && medicine.pharmacies.length > 0
      ? medicine.pharmacies
          .map((pharmacy) => {
            const hydratedPharmacy = pharmacies.find((item) => item.id === pharmacy.id);
            return hydratedPharmacy ?? null;
          })
          .filter((pharmacy): pharmacy is Pharmacy => pharmacy !== null)
      : pharmacies.filter((pharmacy) => pharmacy.medicineIds.includes(medicine.id));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.backRow} onPress={onBack}>
        <Ionicons name="arrow-back" size={18} color={colors.accent} />
        <Text style={styles.backButton}>Voltar</Text>
      </Pressable>

      <View style={styles.header}>
        <View style={styles.heroIcon}>
          <MaterialCommunityIcons name="pill-multiple" size={28} color={colors.accent} />
        </View>

        <View style={styles.headerText}>
          <Text style={styles.title}>{medicine.name}</Text>
          <Text style={styles.subtitle}>{medicine.category}</Text>
        </View>

        <Pressable
          style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
          onPress={() => onToggleFavorite(medicine.id)}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={16}
            color={isFavorite ? colors.surfaceTint : colors.accent}
          />
          <Text
            style={[
              styles.favoriteButtonText,
              isFavorite && styles.favoriteButtonTextActive,
            ]}
          >
            {isFavorite ? "Favoritado" : "Favoritar"}
          </Text>
        </Pressable>
      </View>

      <InfoCard label="Descricao">
        <Text style={styles.infoValue}>{medicine.description}</Text>
      </InfoCard>

      <InfoCard label="Dosagem">
        <Text style={styles.infoValue}>{medicine.dosage}</Text>
      </InfoCard>

      <InfoCard label="Farmacias com este remedio">
        {relatedPharmacies.map((pharmacy) => (
          <ListRow
            key={pharmacy.id}
            title={pharmacy.name}
            subtitle={formatAddress(pharmacy)}
            actionLabel="Abrir"
            onPress={() => onOpenPharmacy(pharmacy)}
          />
        ))}
      </InfoCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backButton: {
    color: colors.accent,
    fontWeight: "700",
    fontSize: typography.body,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.accentSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: typography.hero,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  subtitle: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  favoriteButton: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  favoriteButtonActive: {
    backgroundColor: colors.accent,
  },
  favoriteButtonText: {
    color: colors.accent,
    fontWeight: "700",
  },
  favoriteButtonTextActive: {
    color: colors.surfaceTint,
  },
  infoValue: {
    color: colors.textPrimary,
    fontSize: typography.body,
    lineHeight: 23,
  },
});
