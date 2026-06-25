import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, SIZES } from '../styles/theme';
import ShoppingItemCard from '../components/ShoppingItemCard';
import CustomButton from '../components/CustomButton';

const INITIAL_ITEMS = [
  { id: '1', name: 'Arroz 5kg', quantity: '1 pct', location: 'Supermercado Extra', checked: false },
  { id: '2', name: 'Feijão Carioca', quantity: '2 kg', location: 'Mercado Central', checked: true },
  { id: '3', name: 'Leite Integral', quantity: '6 caixas', location: 'Pão de Açúcar', checked: false },
  { id: '4', name: 'Detergente Líquido', quantity: '3 frascos', location: 'Supermercado Extra', checked: false },
];

export default function ListScreen({ route, navigation }) {
  const [items, setItems] = useState(INITIAL_ITEMS);

  // Monitor parameters from navigation to catch newly added items
  useEffect(() => {
    if (route.params?.newItem) {
      const { name, quantity, location } = route.params.newItem;
      
      const newListItem = {
        id: Date.now().toString(),
        name,
        quantity: quantity || '1 un',
        location: location || 'Geral',
        checked: false,
      };

      setItems((prevItems) => [newListItem, ...prevItems]);

      // Clear the navigation params to prevent duplicating items
      navigation.setParams({ newItem: undefined });
    }
  }, [route.params?.newItem]);

  const handleToggleCheck = (id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

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
        <Text style={styles.headerTitle}>Minha Lista</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddItem')}
          style={styles.addButtonHeader}
        >
          <Ionicons name="add" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      {/* Main List */}
      {items.length > 0 ? (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <ShoppingItemCard
              item={item}
              onToggleCheck={handleToggleCheck}
              onDelete={handleDeleteItem}
            />
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="checkbox-outline" size={80} color={COLORS.textLight} />
          <Text style={styles.emptyTitle}>Sua lista está vazia</Text>
          <Text style={styles.emptySubtitle}>Adicione itens clicando no botão abaixo!</Text>
        </View>
      )}

      {/* Footer Button Bar */}
      <View style={styles.footer}>
        <CustomButton
          title="Adicionar Item"
          variant="primary"
          icon={<Ionicons name="add-circle" size={20} color={COLORS.white} />}
          onPress={() => navigation.navigate('AddItem')}
          style={styles.footerBtn}
        />
        <CustomButton
          title="Voltar para Home"
          variant="secondary"
          onPress={() => navigation.navigate('Home')}
          style={styles.footerBtn}
        />
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
  addButtonHeader: {
    padding: SPACING.xs,
  },
  listContent: {
    padding: SPACING.md,
    paddingBottom: 100, // Safe space for floating footer
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SPACING.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.textDark,
    marginTop: SPACING.md,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textMedium,
    textAlign: 'center',
    marginTop: SPACING.xs,
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
    flexDirection: 'column',
  },
  footerBtn: {
    marginVertical: 4,
  },
});
