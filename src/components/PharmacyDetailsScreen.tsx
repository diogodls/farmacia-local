import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import type { Medicine, Pharmacy } from "../types/pharmacy";
import { colors, spacing, typography } from "../styles/theme";
import { formatAddress } from "../utils/formatters";
import { InfoCard } from "./InfoCard";
import { ListRow } from "./ListRow";

type PharmacyDetailsScreenProps = {
  pharmacy: Pharmacy;
  medicines: Medicine[];
  onBack: () => void;
  onOpenMedicine: (medicine: Medicine) => void;
};

export function PharmacyDetailsScreen({
  pharmacy,
  medicines,
  onBack,
  onOpenMedicine,
}: PharmacyDetailsScreenProps) {
  const availableMedicines =
    pharmacy.medicines && pharmacy.medicines.length > 0
      ? pharmacy.medicines.map((medicine) => {
          const hydratedMedicine = medicines.find((item) => item.id === medicine.id);
          return hydratedMedicine ?? medicine;
        })
      : medicines.filter((medicine) => pharmacy.medicineIds.includes(medicine.id));

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable style={styles.backRow} onPress={onBack}>
        <Ionicons name="arrow-back" size={18} color={colors.accent} />
        <Text style={styles.backButton}>Voltar</Text>
      </Pressable>

      <View style={styles.header}>
        <View style={styles.heroIcon}>
          <MaterialCommunityIcons
            name="map-marker-radius"
            size={28}
            color={colors.mapPin}
          />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{pharmacy.name}</Text>
          <Text style={styles.subtitle}>{formatAddress(pharmacy)}</Text>
        </View>
      </View>

      <InfoCard label="Horario">
        <Text style={styles.infoValue}>{pharmacy.openingHours}</Text>
      </InfoCard>

      <InfoCard label="Telefone">
        <Text style={styles.infoValue}>{pharmacy.phone}</Text>
      </InfoCard>

      <InfoCard label="Medicamentos disponiveis">
        {availableMedicines.map((medicine) => (
          <ListRow
            key={medicine.id}
            title={medicine.name}
            subtitle={medicine.category}
            actionLabel="Ver"
            onPress={() => onOpenMedicine(medicine)}
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
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    minHeight: 44,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  backButton: {
    color: colors.accent,
    fontWeight: "700",
    fontSize: typography.body,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
  },
  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#fde7df",
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
  infoValue: {
    color: colors.textPrimary,
    fontSize: typography.body,
    lineHeight: 23,
  },
});
