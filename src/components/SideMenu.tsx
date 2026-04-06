import React, { ReactNode, useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, radii, spacing, typography } from "../styles/theme";

export type MenuSection = "favorites" | "about";

type SideMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  activeSection: MenuSection;
  onSelectHome: () => void;
  onSelectSection: (section: MenuSection) => void;
  favoritesContent: ReactNode;
  aboutContent: ReactNode;
};

export function SideMenu({
  isOpen,
  onClose,
  activeSection,
  onSelectHome,
  onSelectSection,
  favoritesContent,
  aboutContent,
}: SideMenuProps) {
  const translateX = useRef(new Animated.Value(-360)).current;
  const title = activeSection === "favorites" ? "Favoritos" : "Sobre";
  const subtitle =
    activeSection === "favorites"
      ? "Acesso rapido aos remedios salvos"
      : "Resumo do aplicativo e do trabalho";

  useEffect(() => {
    if (isOpen) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
      return;
    }

    translateX.setValue(-360);
  }, [isOpen, translateX]);

  return (
    <Modal visible={isOpen} animationType="none" transparent onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animated.View style={[styles.drawer, { transform: [{ translateX }] }]}>
              <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentBody}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.header}>
                  <View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{subtitle}</Text>
                  </View>

                  <Pressable style={styles.closeButton} onPress={onClose}>
                    <Ionicons name="close" size={20} color={colors.textPrimary} />
                  </Pressable>
                </View>

                <View style={styles.navList}>
                  <Pressable style={styles.navItem} onPress={onSelectHome}>
                    <View style={styles.navLeft}>
                      <Ionicons name="home-outline" size={18} color={colors.accent} />
                      <Text style={styles.navText}>Inicio</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.accent} />
                  </Pressable>

                  <Pressable
                    style={[
                      styles.navItem,
                      activeSection === "favorites" && styles.navItemActive,
                    ]}
                    onPress={() => onSelectSection("favorites")}
                  >
                    <View style={styles.navLeft}>
                      <Ionicons
                        name="heart-outline"
                        size={18}
                        color={colors.accent}
                      />
                      <Text style={styles.navText}>Favoritos</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.accent} />
                  </Pressable>

                  <Pressable
                    style={[
                      styles.navItem,
                      activeSection === "about" && styles.navItemActive,
                    ]}
                    onPress={() => onSelectSection("about")}
                  >
                    <View style={styles.navLeft}>
                      <Ionicons
                        name="information-circle-outline"
                        size={18}
                        color={colors.accent}
                      />
                      <Text style={styles.navText}>Sobre</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.accent} />
                  </Pressable>
                </View>

                {activeSection === "favorites" ? favoritesContent : aboutContent}
              </ScrollView>
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(18, 26, 23, 0.28)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  drawer: {
    width: "84%",
    height: "100%",
    backgroundColor: colors.background,
    paddingTop: 56,
    paddingBottom: 18,
    shadowColor: colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 4, height: 0 },
    elevation: 12,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.title,
    fontWeight: "700",
  },
  subtitle: {
    marginTop: 4,
    color: colors.textSecondary,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  navList: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  navItem: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navItemActive: {
    backgroundColor: colors.accentSoft,
  },
  navLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  navText: {
    color: colors.textPrimary,
    fontWeight: "600",
  },
  contentBody: {
    paddingBottom: spacing.xl,
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingBottom: spacing.xl,
  },
});
