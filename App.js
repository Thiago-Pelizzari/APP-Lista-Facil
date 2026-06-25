import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  FlatList,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ==========================================
// 🎨 SISTEMA DE DESIGN (CORES E CONSTANTES)
// ==========================================
const COLORS = {
  primary: '#2E7D32',       // Verde Floresta
  secondary: '#4CAF50',     // Verde Folha
  lightGreen: '#E8F5E9',    // Verde Claro de Fundo
  background: '#F5F7F6',    // Fundo off-white
  cardBackground: '#FFFFFF',
  textDark: '#1A3022',
  textMedium: '#5C6E63',
  textLight: '#8C9E93',
  white: '#FFFFFF',
  error: '#D32F2F',
  border: '#E0E6E2',
  shadow: '#000000',
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const SIZES = {
  radiusSm: 8,
  radiusMd: 12,
  radiusLg: 18,
};

// ==========================================
// 🗂️ DADOS MOCKADOS DE INICIALIZAÇÃO
// ==========================================
const INITIAL_ITEMS = [
  { id: '1', name: 'Arroz 5kg', quantity: '1 pct', location: 'Supermercado Extra', checked: false },
  { id: '2', name: 'Feijão Carioca', quantity: '2 kg', location: 'Mercado Central', checked: true },
  { id: '3', name: 'Leite Integral', quantity: '6 caixas', location: 'Pão de Açúcar', checked: false },
];

const CATEGORIES = [
  { id: '1', name: 'Hortifruti', icon: 'leaf-outline', color: '#4CAF50' },
  { id: '2', name: 'Laticínios', icon: 'water-outline', color: '#2196F3' },
  { id: '3', name: 'Limpeza', icon: 'brush-outline', color: '#FF9800' },
  { id: '4', name: 'Bebidas', icon: 'beer-outline', color: '#E91E63' },
  { id: '5', name: 'Carnes', icon: 'restaurant-outline', color: '#F44336' },
  { id: '6', name: 'Padaria', icon: 'pizza-outline', color: '#795548' },
];

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

// ==========================================
// 🚀 COMPONENTE PRINCIPAL (COM ROTEADOR STATE)
// ==========================================
export default function App() {
  const [screen, setScreen] = useState('Home'); // Home | List | AddItem | Categories | CategoryDetail
  const [items, setItems] = useState(INITIAL_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Formulário de Adicionar Item
  const [formName, setFormName] = useState('');
  const [formQuantity, setFormQuantity] = useState('');
  const [formLocation, setFormLocation] = useState('');

  // Navegar entre telas
  const navigateTo = (screenName, params = {}) => {
    if (params.categoryName) {
      setSelectedCategory(params.categoryName);
    }
    setScreen(screenName);
  };

  // Funções da Lista
  const toggleCheckItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, checked: !item.checked } : item));
  };

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const saveItem = () => {
    if (!formName.trim()) {
      Alert.alert('Aviso', 'Por favor, digite o nome do item.');
      return;
    }

    const newItem = {
      id: Date.now().toString(),
      name: formName.trim(),
      quantity: formQuantity.trim() || '1 un',
      location: formLocation.trim() || 'Geral',
      checked: false,
    };

    setItems([newItem, ...items]);
    
    // Resetar formulário
    setFormName('');
    setFormQuantity('');
    setFormLocation('');

    // Voltar para a lista
    setScreen('List');
  };

  // ==========================================
  // 🖥️ RENDERIZAÇÃO DAS TELAS
  // ==========================================
  
  // 1. TELA HOME
  const renderHomeScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.centerContent}>
        {/* Marca / Logo */}
        <View style={styles.homeHeader}>
          <View style={styles.logoContainer}>
            <Ionicons name="basket" size={42} color={COLORS.primary} />
          </View>
          <Text style={styles.appName}>ListaFácil</Text>
          <Text style={styles.tagline}>Sua lista de compras simples e organizada</Text>
        </View>

        {/* Card Ilustrativo */}
        <View style={styles.illustrationCard}>
          <View style={{ zIndex: 2, width: '80%' }}>
            <Text style={styles.illustrationTitle}>Praticidade no mercado</Text>
            <Text style={styles.illustrationDescription}>
              Marque os itens no carrinho, adicione novos produtos e veja por categorias de forma limpa.
            </Text>
          </View>
          <View style={styles.decorCircle} />
        </View>

        {/* Ações */}
        <View style={styles.buttonGroup}>
          <Text style={styles.sectionTitle}>Opções</Text>
          
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => navigateTo('List')}
            activeOpacity={0.8}
          >
            <Ionicons name="list-outline" size={20} color={COLORS.white} style={styles.btnIcon} />
            <Text style={styles.primaryBtnText}>Ver minha lista</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.outlineBtn}
            onPress={() => navigateTo('AddItem')}
            activeOpacity={0.8}
          >
            <Ionicons name="add-circle-outline" size={20} color={COLORS.primary} style={styles.btnIcon} />
            <Text style={styles.outlineBtnText}>Adicionar item</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryBtn}
            onPress={() => navigateTo('Categories')}
            activeOpacity={0.8}
          >
            <Ionicons name="grid-outline" size={20} color={COLORS.primary} style={styles.btnIcon} />
            <Text style={styles.secondaryBtnText}>Categorias</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // 2. TELA DE LISTA DE COMPRAS
  const renderListScreen = () => (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('Home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Minha Lista</Text>
        <TouchableOpacity onPress={() => navigateTo('AddItem')} style={styles.addButtonHeader}>
          <Ionicons name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Lista */}
      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View style={[styles.itemCard, item.checked && styles.itemCardChecked]}>
              <TouchableOpacity
                onPress={() => toggleCheckItem(item.id)}
                style={styles.checkbox}
              >
                <Ionicons
                  name={item.checked ? 'checkmark-circle' : 'ellipse-outline'}
                  size={26}
                  color={item.checked ? COLORS.primary : COLORS.textLight}
                />
              </TouchableOpacity>
              
              <View style={styles.itemInfo}>
                <Text style={[styles.itemName, item.checked && styles.itemNameChecked]}>
                  {item.name}
                </Text>
                <View style={styles.itemDetailsRow}>
                  <View style={styles.qtyBadge}>
                    <Text style={styles.qtyBadgeText}>{item.quantity}</Text>
                  </View>
                  <View style={styles.locBadge}>
                    <Ionicons name="location-outline" size={12} color={COLORS.textMedium} style={{ marginRight: 2 }} />
                    <Text style={styles.locBadgeText} numberOfLines={1}>{item.location}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity onPress={() => deleteItem(item.id)} style={styles.deleteBtn}>
                <Ionicons name="trash-outline" size={20} color={COLORS.error} />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="checkbox-outline" size={72} color={COLORS.textLight} />
          <Text style={styles.emptyTitle}>Nenhum item na lista</Text>
          <Text style={styles.emptySubtitle}>Adicione itens para começar suas compras.</Text>
        </View>
      )}

      {/* Botões do Rodapé */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigateTo('AddItem')}>
          <Ionicons name="add-circle" size={20} color={COLORS.white} style={styles.btnIcon} />
          <Text style={styles.primaryBtnText}>Adicionar Item</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigateTo('Home')} style={[styles.secondaryBtn, { marginTop: 8 }]}>
          <Text style={styles.secondaryBtnText}>Voltar para Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // 3. TELA DE ADICIONAR ITEM
  const renderAddItemScreen = () => (
    <SafeAreaView style={styles.screenContainer}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigateTo('List')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Adicionar Item</Text>
          <View style={{ width: 24 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Instruções */}
          <View style={styles.cardHeader}>
            <Ionicons name="cart" size={40} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Novo Produto</Text>
            <Text style={styles.cardSubtitle}>Insira as informações básicas do item.</Text>
          </View>

          {/* Form */}
          <View style={styles.formCard}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome do Item *</Text>
              <TextInput
                value={formName}
                onChangeText={setFormName}
                placeholder="Ex: Arroz, Feijão, Leite..."
                placeholderTextColor={COLORS.textLight}
                style={styles.textInput}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Quantidade</Text>
              <TextInput
                value={formQuantity}
                onChangeText={setFormQuantity}
                placeholder="Ex: 2 pct, 1 kg, 3 caixas..."
                placeholderTextColor={COLORS.textLight}
                style={styles.textInput}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Local de compra</Text>
              <TextInput
                value={formLocation}
                onChangeText={setFormLocation}
                placeholder="Ex: Supermercado Verde, Padaria..."
                placeholderTextColor={COLORS.textLight}
                style={styles.textInput}
              />
            </View>
          </View>

          {/* Ações */}
          <View style={styles.formActions}>
            <TouchableOpacity style={styles.primaryBtn} onPress={saveItem}>
              <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.white} style={styles.btnIcon} />
              <Text style={styles.primaryBtnText}>Salvar Item</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.outlineBtn, { marginTop: 8 }]} onPress={() => navigateTo('List')}>
              <Text style={styles.outlineBtnText}>Cancelar / Voltar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

  // 4. TELA DE CATEGORIAS
  const renderCategoriesScreen = () => (
    <View style={styles.screenContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigateTo('Home')} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categorias</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Grade de Categorias */}
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigateTo('CategoryDetail', { categoryName: item.name })}
            activeOpacity={0.7}
          >
            <View style={styles.catIconWrapper}>
              <Ionicons name={item.icon} size={28} color={item.color} />
            </View>
            <Text style={styles.catName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );

  // 5. TELA DE DETALHES DE CATEGORIA
  const renderCategoryDetailScreen = () => {
    const listItems = MOCK_CATEGORY_ITEMS[selectedCategory] || [];

    return (
      <View style={styles.screenContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigateTo('Categories')} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{selectedCategory}</Text>
          <TouchableOpacity onPress={() => navigateTo('Home')} style={styles.addButtonHeader}>
            <Ionicons name="home-outline" size={20} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        {/* Conteúdo */}
        <View style={styles.detailContent}>
          <Text style={styles.detailSectionTitle}>Sugestões para {selectedCategory}</Text>

          {listItems.length > 0 ? (
            <FlatList
              data={listItems}
              keyExtractor={(item) => item.name}
              contentContainerStyle={{ paddingVertical: SPACING.sm }}
              renderItem={({ item }) => (
                <View style={styles.sugCard}>
                  <Ionicons name="checkmark-circle-outline" size={20} color={COLORS.primary} style={{ marginRight: 12 }} />
                  <View>
                    <Text style={styles.sugName}>{item.name}</Text>
                    <Text style={styles.sugDetail}>{item.detail}</Text>
                  </View>
                </View>
              )}
            />
          ) : (
            <View style={styles.emptyContainer}>
              <Ionicons name="alert-circle-outline" size={40} color={COLORS.textLight} />
              <Text style={styles.emptyText}>Sem sugestões disponíveis.</Text>
            </View>
          )}

          {/* Botões */}
          <View style={styles.detailActions}>
            <TouchableOpacity style={styles.primaryBtn} onPress={() => navigateTo('Categories')}>
              <Text style={styles.primaryBtnText}>Voltar para Categorias</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.secondaryBtn, { marginTop: 8 }]} onPress={() => navigateTo('Home')}>
              <Text style={styles.secondaryBtnText}>Ir para Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  // ==========================================
  // ROTEAMENTO DINÂMICO
  // ==========================================
  const renderActiveScreen = () => {
    switch (screen) {
      case 'List':
        return renderListScreen();
      case 'AddItem':
        return renderAddItemScreen();
      case 'Categories':
        return renderCategoriesScreen();
      case 'CategoryDetail':
        return renderCategoryDetailScreen();
      case 'Home':
      default:
        return renderHomeScreen();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      {renderActiveScreen()}
    </SafeAreaView>
  );
}

// ==========================================
// 🎨 FOLHAS DE ESTILO ÚNICA (CSS / STYLESHEET)
// ==========================================
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  screenContainer: {
    flex: 1,
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SPACING.lg,
  },

  // 1. Home Styles
  homeHeader: {
    alignItems: 'center',
    marginBottom: SPACING.xl,
  },
  logoContainer: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: COLORS.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.md,
    elevation: 2,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  tagline: {
    fontSize: 13,
    color: COLORS.textMedium,
    marginTop: 4,
    textAlign: 'center',
  },
  illustrationCard: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radiusLg,
    padding: SPACING.lg,
    marginBottom: SPACING.xl,
    overflow: 'hidden',
    position: 'relative',
    elevation: 3,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  illustrationTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  illustrationDescription: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 13,
    lineHeight: 18,
  },
  decorCircle: {
    position: 'absolute',
    right: -30,
    bottom: -30,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  buttonGroup: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: SPACING.sm,
  },

  // Botões Padrões Estilizados
  primaryBtn: {
    backgroundColor: COLORS.primary,
    height: 50,
    borderRadius: SIZES.radiusMd,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    elevation: 1,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  primaryBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryBtn: {
    backgroundColor: COLORS.lightGreen,
    height: 50,
    borderRadius: SIZES.radiusMd,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginTop: 8,
  },
  secondaryBtnText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  outlineBtn: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    height: 50,
    borderRadius: SIZES.radiusMd,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    marginTop: 8,
  },
  outlineBtnText: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  btnIcon: {
    marginRight: 8,
  },

  // 2. List Styles
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
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  addButtonHeader: {
    padding: SPACING.xs,
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: 160,
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
  itemCardChecked: {
    backgroundColor: '#F0F3F1',
    opacity: 0.75,
  },
  checkbox: {
    marginRight: SPACING.sm,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: COLORS.textMedium,
  },
  itemDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBadge: {
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 8,
    paddingVertical: 1.5,
    borderRadius: 6,
    marginRight: SPACING.sm,
  },
  qtyBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.primary,
  },
  locBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locBadgeText: {
    fontSize: 12,
    color: COLORS.textMedium,
  },
  deleteBtn: {
    padding: SPACING.xs,
  },
  emptyContainer: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: SPACING.md,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textMedium,
    textAlign: 'center',
    marginTop: 4,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.cardBackground,
    padding: SPACING.md,
    borderTopWidth: 1,
    borderColor: COLORS.border,
  },

  // 3. Add Item Styles
  scrollContent: {
    padding: SPACING.lg,
  },
  cardHeader: {
    alignItems: 'center',
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLg,
    padding: SPACING.lg,
    marginBottom: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: SPACING.sm,
  },
  cardSubtitle: {
    fontSize: 13,
    color: COLORS.textMedium,
    textAlign: 'center',
    marginTop: 4,
  },
  formCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  textInput: {
    height: 48,
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusMd,
    paddingHorizontal: SPACING.md,
    fontSize: 14,
    color: COLORS.textDark,
  },
  formActions: {
    marginBottom: SPACING.xl,
  },

  // 4. Categories Styles
  gridContainer: {
    padding: SPACING.sm,
  },
  categoryCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLg,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 120,
    elevation: 1,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  catIconWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: COLORS.lightGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  catName: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    textAlign: 'center',
  },

  // 5. Category Details Styles
  detailContent: {
    flex: 1,
    padding: SPACING.lg,
  },
  detailSectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textMedium,
    marginBottom: SPACING.sm,
  },
  sugCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMd,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sugName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  sugDetail: {
    fontSize: 12,
    color: COLORS.textMedium,
    marginTop: 2,
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.textMedium,
    marginTop: 8,
  },
  detailActions: {
    marginTop: 'auto',
    paddingTop: SPACING.md,
  },
});
