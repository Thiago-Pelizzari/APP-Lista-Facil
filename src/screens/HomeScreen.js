import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Image, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, SIZES } from '../styles/theme';
import CustomButton from '../components/CustomButton';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      <View style={styles.content}>
        {/* Header / Brand Area */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Ionicons name="basket" size={42} color={COLORS.primary} />
          </View>
          <Text style={styles.appName}>ListaFácil</Text>
          <Text style={styles.tagline}>Sua lista de compras moderna e organizada</Text>
        </View>

        {/* Feature Illustration/Card */}
        <View style={styles.illustrationCard}>
          <View style={styles.illustrationTextContainer}>
            <Text style={styles.illustrationTitle}>Praticidade no mercado</Text>
            <Text style={styles.illustrationDescription}>
              Esqueça o papel. Adicione itens, marque o que já pegou e divida por estabelecimentos de forma simples.
            </Text>
          </View>
          <View style={styles.decorCircle} />
          <View style={styles.decorCircleSmall} />
        </View>

        {/* Quick Actions List */}
        <View style={styles.actionsContainer}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>

          <CustomButton
            title="Ver minha lista"
            variant="primary"
            icon={<Ionicons name="list-outline" size={20} color={COLORS.white} />}
            onPress={() => navigation.navigate('List')}
            style={styles.actionBtn}
          />

          <CustomButton
            title="Adicionar item"
            variant="outline"
            icon={<Ionicons name="add-circle-outline" size={20} color={COLORS.primary} />}
            onPress={() => navigation.navigate('AddItem')}
            style={styles.actionBtn}
          />

          <CustomButton
            title="Categorias"
            variant="secondary"
            icon={<Ionicons name="grid-outline" size={20} color={COLORS.primary} />}
            onPress={() => navigation.navigate('Categories')}
            style={styles.actionBtn}
          />
        </View>
      </View>

      {/* Footer Info */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>ListaFácil App v1.0.0 (Protótipo)</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: COLORS.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    elevation: 3,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 14,
    color: COLORS.textMedium,
    marginTop: 6,
    textAlign: 'center',
  },
  illustrationCard: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusLg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    overflow: 'hidden',
    position: 'relative',
    elevation: 4,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  illustrationTextContainer: {
    zIndex: 2,
    width: '80%',
  },
  illustrationTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: SPACING.sm,
  },
  illustrationDescription: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    lineHeight: 18,
  },
  decorCircle: {
    position: 'absolute',
    right: -40,
    bottom: -40,
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    zIndex: 1,
  },
  decorCircleSmall: {
    position: 'absolute',
    right: 40,
    top: -20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    zIndex: 1,
  },
  actionsContainer: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: SPACING.md,
    paddingLeft: SPACING.xs,
  },
  actionBtn: {
    marginBottom: SPACING.sm,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  footerText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});
