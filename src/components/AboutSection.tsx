import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { colors, radii, spacing, typography } from "../styles/theme";

export function AboutSection() {
  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <View style={styles.heroIcon}>
          <MaterialCommunityIcons
            name="hospital-marker"
            size={30}
            color={colors.surfaceTint}
          />
        </View>
        <Text style={styles.title}>Sobre o projeto</Text>
        <Text style={styles.subtitle}>
          Aplicativo academico criado para facilitar a busca de remedios e a
          localizacao de farmacias populares em Santa Maria - RS.
        </Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Ionicons name="search" size={18} color={colors.accent} />
          <Text style={styles.infoText}>Busca de remedios com sugestoes.</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="map" size={18} color={colors.accent} />
          <Text style={styles.infoText}>Mapa com marcadores das farmacias.</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="heart" size={18} color={colors.accent} />
          <Text style={styles.infoText}>Lista de remedios favoritos.</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="information-circle" size={18} color={colors.accent} />
          <Text style={styles.infoText}>
            Dados carregados em tempo real pela API conectada ao banco Neon.
          </Text>
        </View>
      </View>

      <View style={styles.footerCard}>
        <Text style={styles.footerTitle}>Objetivo</Text>
        <Text style={styles.footerText}>
          Melhorar o acesso a informacao para pessoas com menos familiaridade com
          tecnologia, usando uma interface direta, visual e simples de navegar.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  heroCard: {
    backgroundColor: colors.hero,
    borderRadius: radii.xl,
    padding: spacing.lg,
    gap: spacing.sm,
  },
  heroIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "rgba(255,255,255,0.14)",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: colors.surfaceTint,
    fontSize: typography.title,
    fontWeight: "700",
  },
  subtitle: {
    color: "#dfece6",
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    flex: 1,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  footerCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  footerTitle: {
    color: colors.textPrimary,
    fontSize: typography.bodyLg,
    fontWeight: "700",
  },
  footerText: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
