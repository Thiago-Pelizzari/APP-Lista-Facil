import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, SIZES } from '../styles/theme';
import CustomButton from '../components/CustomButton';

const MOCK_CATEGORY_ITEMS = {
  'Hortifruti': [
    { name: 'Alface Americana', detail: 'Fresca - 1 un' },
    { name: 'Tomate Italiano', detail: 'Maduro - 1 kg' },
    { name: 'Banana Prata', detail: '1 dúzia' },
  ],
  'Laticínios': [
    { name: 'Queijo Muçarela', detail: 'Fatiado - 300g' },
    { name: 'Iogurte Natural', detail: 'Desnatado - 4 potes' },
    { name: 'Manteiga com Sal', detail: '200g' },
  ],
  'Limpeza': [
    { name: 'Sabão em Pó', detail: 'Omo - 1,6kg' },
    { name: 'Desinfetante Pinho', detail: 'Lavanda - 1L' },
    { name: 'Esponja de Aço', detail: '1 pct c/ 4' },
  ],
  'Bebidas': [
    { name: 'Suco de Uva Integral', detail: 'Aurora - 1,5L' },
    { name: 'Água Mineral', detail: 'Sem gás - Pacote c/ 6' },
    { name: 'Refrigerante Cola', detail: 'Zero açúcar - 2L' },
  ],
  'Carnes': [
    { name: 'Peito de Frango', detail: 'Filé resfriado - 1 kg' },
    { name: 'Alcatra Bovina', detail: 'Bife - 1 kg' },
    { name: 'Linguiça Toscana', detail: 'Perdigão - 800g' },
  ],
  'Padaria': [
    { name: 'Pão Francês', detail: 'Quentinho - 10 un' },
    { name: 'Pão de Forma', detail: 'Integral - 1 pct' },
    { name: 'Bolo de Milho', detail: 'Fofinho - 1 un' },
  ]
};

export default function CategoryDetailScreen({ route, navigation }) {
  const { categoryName } = route.params || { categoryName: 'Categoria' };
  const items = MOCK_CATEGORY_ITEMS[categoryName] || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.homeButtonHeader}
        >
          <Ionicons name="home-outline" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.subTitle}>Itens Sugeridos em {categoryName}:</Text>
        
        {items.length > 0 ? (
          <FlatList
            data={items}
            keyExtractor={(item) => item.name}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <View style={styles.itemCard}>
                <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.primary} style={styles.itemIcon} />
                <View>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemDetail}>{item.detail}</Text>
                </View>
              </View>
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="alert-circle-outline" size={48} color={COLORS.textLight} />
            <Text style={styles.emptyText}>Nenhum item sugerido nesta categoria.</Text>
          </View>
        )}

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Voltar para Categorias"
            variant="primary"
            onPress={() => navigation.goBack()}
            style={styles.btn}
          />
          <CustomButton
            title="Ir para Home"
            variant="outline"
            onPress={() => navigation.navigate('Home')}
            style={styles.btn}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.cardBackground,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  backButton: {
    padding: SPACING.xs,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  homeButtonHeader: {
    padding: SPACING.xs,
  },
  content: {
    flex: 1,
    padding: SPACING.lg,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textMedium,
    marginBottom: SPACING.md,
  },
  listContainer: {
    paddingBottom: SPACING.xl,
  },
  itemCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMd,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemIcon: {
    marginRight: SPACING.sm,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  itemDetail: {
    fontSize: 13,
    color: COLORS.textMedium,
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: COLORS.textMedium,
    marginTop: SPACING.sm,
  },
  buttonContainer: {
    marginTop: 'auto',
    paddingTop: SPACING.md,
  },
  btn: {
    marginVertical: 4,
  },
});
