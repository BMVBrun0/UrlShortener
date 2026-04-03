import React from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppRoute } from "../../app/types";
import { colors } from "../theme/colors";
import { spacing } from "../theme/spacing";

type Props = {
  visible: boolean;
  onClose: () => void;
  route: AppRoute;
  onNavigate: (route: AppRoute) => void;
  pendingCount: number;
};

const menuItems: { route: AppRoute; title: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { route: "home", title: "Painel principal", icon: "flash-outline" },
  { route: "history", title: "Histórico local", icon: "time-outline" },
  { route: "settings", title: "Configurações", icon: "settings-outline" },
  { route: "about", title: "Sobre o projeto", icon: "information-circle-outline" }
];

export const AppSidebar: React.FC<Props> = ({ visible, onClose, route, onNavigate, pendingCount }) => {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.drawer} onPress={() => undefined}>
          <View style={styles.header}>
            <Text style={styles.title}>Pocket Links</Text>
            <Text style={styles.subtitle}>Demo mobile offline-first para portfólio</Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>Fila local</Text>
            <Text style={styles.infoText}>{pendingCount} item(ns) aguardando sincronização</Text>
          </View>

          <View style={styles.menu}>
            {menuItems.map((item) => {
              const active = item.route === route;

              return (
                <Pressable
                  key={item.route}
                  style={[styles.menuItem, active && styles.menuItemActive]}
                  onPress={() => {
                    onNavigate(item.route);
                    onClose();
                  }}
                >
                  <Ionicons
                    name={item.icon}
                    size={20}
                    color={active ? colors.accentAlt : colors.textMuted}
                  />
                  <Text style={[styles.menuLabel, active && styles.menuLabelActive]}>{item.title}</Text>
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  drawer: {
    width: "82%",
    maxWidth: 360,
    height: "100%",
    backgroundColor: colors.surface,
    paddingTop: spacing.xxl,
    paddingHorizontal: spacing.lg,
    gap: spacing.lg
  },
  header: {
    gap: spacing.xs
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900"
  },
  subtitle: {
    color: colors.textMuted,
    lineHeight: 20
  },
  infoBox: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    padding: spacing.md,
    gap: spacing.xs
  },
  infoTitle: {
    color: colors.text,
    fontWeight: "800"
  },
  infoText: {
    color: colors.textMuted
  },
  menu: {
    gap: spacing.xs
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: 16,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md
  },
  menuItemActive: {
    backgroundColor: colors.surfaceAlt
  },
  menuLabel: {
    color: colors.textMuted,
    fontWeight: "700"
  },
  menuLabelActive: {
    color: colors.text
  }
});
