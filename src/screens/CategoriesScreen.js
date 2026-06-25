import React from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../styles/theme';
import CategoryCard from '../components/CategoryCard';

const CATEGORIES = [
  { id: '1', name: 'Hortifruti', icon: 'leaf-outline', color: '#4CAF50' },
  { id: '2', name: 'Laticínios', icon: 'water-outline', color: '#2196F3' },
  { id: '3', name: 'Limpeza', icon: 'brush-outline', color: '#FF9800' },
  { id: '4', name: 'Bebidas', icon: 'beer-outline', color: '#E91E63' },
  { id: '5', name: 'Carnes', icon: 'restaurant-outline', color: '#F44336' },
  { id: '6', name: 'Padaria', icon: 'pizza-outline', color: '#795548' },
];

export default function CategoriesScreen({ navigation }) {
  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryDetail', { categoryName: category.name });
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
        <Text style={styles.headerTitle}>Categorias</Text>
        <View style={{ width: 24 }} /> {/* Spacer */}
      </View>

      {/* Categories Grid */}
      <FlatList
        data={CATEGORIES}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.gridContainer}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            onPress={() => handleCategoryPress(item)}
          />
        )}
      />
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
  gridContainer: {
    padding: SPACING.md,
  },
});
