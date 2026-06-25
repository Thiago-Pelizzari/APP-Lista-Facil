import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, SIZES, FONTS } from '../styles/theme';

export default function CategoryCard({
  category,
  onPress,
}) {
  const { name, icon, color = COLORS.primary } = category;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={styles.card}
    >
      <View style={[styles.iconWrapper, { backgroundColor: COLORS.lightGreen }]}>
        <Ionicons name={icon} size={32} color={color} />
      </View>
      <Text style={styles.categoryName} numberOfLines={1}>
        {name}
      </Text>
      <Ionicons name="chevron-forward" size={16} color={COLORS.textLight} style={styles.arrow} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLg,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 2,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    minHeight: 130,
    position: 'relative',
  },
  iconWrapper: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: SPACING.sm,
  },
  categoryName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
    textAlign: 'center',
  },
  arrow: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
});
