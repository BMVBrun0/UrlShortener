import React from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { SurfaceCard } from "../../shared/components/SurfaceCard";
import { colors } from "../../shared/theme/colors";
import { spacing } from "../../shared/theme/spacing";

export const AboutScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <SurfaceCard style={styles.card}>
        <Text style={styles.title}>Sobre o projeto</Text>
        <Text style={styles.body}>
          Pocket Links é um estudo público em React Native pensado para portfólio. A aplicação usa uma
          arquitetura mais limpa que a versão original do teste técnico e foca em organização de código,
          persistência local e recursos interessantes para vitrine pública.
        </Text>
      </SurfaceCard>

      <SurfaceCard style={styles.card}>
        <Text style={styles.title}>O que esta versão demonstra</Text>
        <Text style={styles.listItem}>• separação por feature e infraestrutura</Text>
        <Text style={styles.listItem}>• estado local persistido com cache</Text>
        <Text style={styles.listItem}>• fluxo offline-first com fila pendente</Text>
        <Text style={styles.listItem}>• navegação simples com header, drawer e bottom bar</Text>
        <Text style={styles.listItem}>• base preparada para crescer com login, sync e E2E</Text>
      </SurfaceCard>

      <SurfaceCard style={styles.card}>
        <Text style={styles.title}>Próximos incrementos sugeridos</Text>
        <Text style={styles.body}>
          Autenticação opcional, sincronização multi-dispositivo, providers reais de encurtamento, geração
          de QR Code, analytics local e uma camada de testes end-to-end são evoluções naturais para as
          próximas versões.
        </Text>
      </SurfaceCard>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg
  },
  card: {
    gap: spacing.md
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900"
  },
  body: {
    color: colors.textMuted,
    lineHeight: 22
  },
  listItem: {
    color: colors.textMuted,
    lineHeight: 22
  }
});
