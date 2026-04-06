import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { FavoritesSection } from "./src/components/FavoritesSection";
import { AboutSection } from "./src/components/AboutSection";
import { HomeHeader } from "./src/components/HomeHeader";
import { MedicineDetailsScreen } from "./src/components/MedicineDetailsScreen";
import { PharmacyDetailsScreen } from "./src/components/PharmacyDetailsScreen";
import { PharmacyMapSection } from "./src/components/PharmacyMapSection";
import { SelectedMedicineCard } from "./src/components/SelectedMedicineCard";
import { MenuSection, SideMenu } from "./src/components/SideMenu";
import { mockMedicines, mockPharmacies } from "./src/data/mockData";
import { useFavorites } from "./src/hooks/useFavorites";
import type { Medicine, Pharmacy } from "./src/types/pharmacy";
import { colors } from "./src/styles/theme";

type ScreenKey = "home" | "pharmacy-details" | "medicine-details";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [screen, setScreen] = useState<ScreenKey>("home");
  const [selectedPharmacy, setSelectedPharmacy] = useState<Pharmacy | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuSection, setMenuSection] = useState<MenuSection>("favorites");
  const [isMapInteracting, setIsMapInteracting] = useState(false);

  const { favorites, toggleFavorite } = useFavorites();

  const autocompleteOptions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (normalizedQuery.length < 2) {
      return [];
    }

    if (selectedMedicine && normalizedQuery === selectedMedicine.name.toLowerCase()) {
      return [];
    }

    return mockMedicines.filter((medicine) =>
      medicine.name.toLowerCase().includes(normalizedQuery)
    );
  }, [query, selectedMedicine]);

  const visiblePharmacies = useMemo(() => {
    if (!selectedMedicine) {
      return mockPharmacies;
    }

    return mockPharmacies.filter((pharmacy) =>
      pharmacy.medicineIds.includes(selectedMedicine.id)
    );
  }, [selectedMedicine]);

  const favoriteMedicines = useMemo(
    () => mockMedicines.filter((medicine) => favorites.includes(medicine.id)),
    [favorites]
  );

  const mapRegion = useMemo(() => {
    const total = visiblePharmacies.length;
    const baseLatitude =
      visiblePharmacies.reduce((sum, pharmacy) => sum + pharmacy.latitude, 0) / total;
    const baseLongitude =
      visiblePharmacies.reduce((sum, pharmacy) => sum + pharmacy.longitude, 0) / total;

    return {
      latitude: Number.isFinite(baseLatitude) ? baseLatitude : -29.6842,
      longitude: Number.isFinite(baseLongitude) ? baseLongitude : -53.8069,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08,
    };
  }, [visiblePharmacies]);

  function selectMedicineForMap(medicine: Medicine) {
    setSelectedMedicine(medicine);
    setQuery("");
    setScreen("home");
  }

  function clearMedicineFilter() {
    setSelectedMedicine(null);
    setQuery("");
  }

  function openMedicineDetails(medicine: Medicine) {
    selectMedicineForMap(medicine);
    setScreen("medicine-details");
  }

  function openPharmacyDetails(pharmacy: Pharmacy) {
    setSelectedPharmacy(pharmacy);
    setScreen("pharmacy-details");
  }

  if (screen === "pharmacy-details" && selectedPharmacy) {
    return (
      <SafeAreaView style={styles.screen}>
        <PharmacyDetailsScreen
          pharmacy={selectedPharmacy}
          medicines={mockMedicines}
          onBack={() => setScreen("home")}
          onOpenMedicine={openMedicineDetails}
        />
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }

  if (screen === "medicine-details" && selectedMedicine) {
    return (
      <SafeAreaView style={styles.screen}>
        <MedicineDetailsScreen
          medicine={selectedMedicine}
          pharmacies={mockPharmacies}
          favorites={favorites}
          onBack={() => setScreen("home")}
          onOpenPharmacy={openPharmacyDetails}
          onToggleFavorite={toggleFavorite}
        />
        <StatusBar style="dark" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView
        style={styles.homeScroll}
        contentContainerStyle={styles.homeContent}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isMapInteracting}
        nestedScrollEnabled
      >
        <HomeHeader
          query={query}
          autocompleteOptions={autocompleteOptions}
          favorites={favorites}
          onChangeQuery={setQuery}
          onSelectMedicine={selectMedicineForMap}
          onOpenMenu={() => {
            setMenuSection("favorites");
            setIsMenuOpen(true);
          }}
        />

        {selectedMedicine ? (
          <SelectedMedicineCard
            medicine={selectedMedicine}
            isFavorite={favorites.includes(selectedMedicine.id)}
            onToggleFavorite={() => toggleFavorite(selectedMedicine.id)}
            onOpenDetails={() => openMedicineDetails(selectedMedicine)}
          />
        ) : null}

        <View style={styles.helpStrip}>
          <Ionicons name="navigate-circle-outline" size={18} color={colors.accent} />
          <Text style={styles.helpStripText}>
            Toque em um marcador para abrir o pop-up da farmacia.
          </Text>
        </View>

        {selectedMedicine ? (
          <View style={styles.filterNotice}>
            <Text style={styles.filterNoticeText}>
              Exibindo farmacias com {selectedMedicine.name}
            </Text>
            <Ionicons name="close-circle" size={18} color={colors.success} />
            <Text style={styles.filterNoticeAction} onPress={clearMedicineFilter}>
              Limpar filtro
            </Text>
          </View>
        ) : null}

        <View style={styles.mapSection}>
          <PharmacyMapSection
            pharmacies={visiblePharmacies}
            selectedMedicine={selectedMedicine}
            region={mapRegion}
            onOpenPharmacy={openPharmacyDetails}
            onMapInteractionChange={setIsMapInteracting}
          />
        </View>
      </ScrollView>

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeSection={menuSection}
        onSelectHome={() => {
          setIsMenuOpen(false);
          setScreen("home");
        }}
        onSelectSection={setMenuSection}
        favoritesContent={
          <FavoritesSection
            medicines={favoriteMedicines}
            onOpenMedicine={(medicine) => {
              setIsMenuOpen(false);
              openMedicineDetails(medicine);
            }}
          />
        }
        aboutContent={<AboutSection />}
      />

      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  homeScroll: {
    flex: 1,
  },
  homeContent: {
    paddingBottom: 24,
  },
  mapSection: {
    height: 460,
    paddingHorizontal: 2,
  },
  helpStrip: {
    marginHorizontal: 20,
    marginBottom: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  helpStripText: {
    flex: 1,
    color: colors.textSecondary,
    fontWeight: "600",
    fontSize: 13,
  },
  filterNotice: {
    marginHorizontal: 20,
    marginBottom: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: colors.banner,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  filterNoticeText: {
    flex: 1,
    color: colors.surfaceTint,
    fontWeight: "600",
  },
  filterNoticeAction: {
    color: colors.success,
    fontWeight: "700",
  },
});
