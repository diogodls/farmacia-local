import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import type { Medicine, Pharmacy } from "../types/pharmacy";
import { colors, radii, spacing, typography } from "../styles/theme";
import { formatAddress } from "../utils/formatters";
import { InfoCard } from "./InfoCard";
import { ListRow } from "./ListRow";

type PharmacyDetailsScreenProps = {
  pharmacy: Pharmacy;
  medicines: Medicine[];
  onBack: () => void;
  onOpenMedicine: (medicine: Medicine) => void;
};

const PAGE_SIZE = 12;

export function PharmacyDetailsScreen({
  pharmacy,
  medicines,
  onBack,
  onOpenMedicine,
}: PharmacyDetailsScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const availableMedicines =
    pharmacy.medicines && pharmacy.medicines.length > 0
      ? pharmacy.medicines.map((medicine) => {
          const hydratedMedicine = medicines.find((item) => item.id === medicine.id);
          return hydratedMedicine ?? medicine;
        })
      : medicines.filter((medicine) => pharmacy.medicineIds.includes(medicine.id));

  const filteredMedicines = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return availableMedicines;
    }

    return availableMedicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(normalizedQuery)
    );
  }, [availableMedicines, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredMedicines.length / PAGE_SIZE));

  const paginatedMedicines = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredMedicines.slice(start, start + PAGE_SIZE);
  }, [currentPage, filteredMedicines]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pharmacy.id, searchQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

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
        <View style={styles.searchWrapper}>
          <Ionicons name="search" size={18} color={colors.accent} />
          <TextInput
            style={styles.searchInput}
            placeholder="Filtrar por nome do remedio"
            placeholderTextColor={colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        <View style={styles.resultsHeader}>
          <Text style={styles.resultsText}>
            {filteredMedicines.length} remedio(s) encontrado(s)
          </Text>
          <Text style={styles.resultsText}>
            Pagina {currentPage} de {totalPages}
          </Text>
        </View>

        {paginatedMedicines.length > 0 ? (
          paginatedMedicines.map((medicine) => (
            <ListRow
              key={medicine.id}
              title={medicine.name}
              subtitle={medicine.category}
              actionLabel="Ver"
              onPress={() => onOpenMedicine(medicine)}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>
            Nenhum remedio encontrado para esse filtro.
          </Text>
        )}

        {filteredMedicines.length > PAGE_SIZE ? (
          <View style={styles.paginationRow}>
            <Pressable
              style={[
                styles.paginationButton,
                currentPage === 1 && styles.paginationButtonDisabled,
              ]}
              onPress={() => setCurrentPage((page) => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              <Ionicons name="chevron-back" size={16} color={colors.accent} />
              <Text style={styles.paginationButtonText}>Anterior</Text>
            </Pressable>

            <Pressable
              style={[
                styles.paginationButton,
                currentPage === totalPages && styles.paginationButtonDisabled,
              ]}
              onPress={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
            >
              <Text style={styles.paginationButtonText}>Proxima</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.accent} />
            </Pressable>
          </View>
        ) : null}
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
  searchWrapper: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    minHeight: 48,
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
    paddingVertical: 12,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.sm,
  },
  resultsText: {
    color: colors.textSecondary,
    fontSize: typography.bodySm,
    fontWeight: "600",
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: typography.body,
    lineHeight: 22,
  },
  paginationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  paginationButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  paginationButtonDisabled: {
    opacity: 0.45,
  },
  paginationButtonText: {
    color: colors.accent,
    fontWeight: "700",
    fontSize: typography.bodySm,
  },
});
