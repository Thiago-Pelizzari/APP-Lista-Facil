import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, SIZES, FONTS } from '../styles/theme';

export default function ShoppingItemCard({
  item,
  onToggleCheck,
  onDelete, // Optional, for premium feel
}) {
  const { id, name, quantity, location, checked } = item;

  return (
    <View style={[styles.card, checked && styles.cardChecked]}>
      {/* Checkbox Section */}
      <TouchableOpacity
        onPress={() => onToggleCheck(id)}
        activeOpacity={0.6}
        style={styles.checkboxContainer}
      >
        <Ionicons
          name={checked ? 'checkmark-circle' : 'ellipse-outline'}
          size={26}
          color={checked ? COLORS.primary : COLORS.textLight}
        />
      </TouchableOpacity>

      {/* Info Section */}
      <View style={styles.infoContainer}>
        <Text style={[styles.itemName, checked && styles.itemNameChecked]}>
          {name}
        </Text>
        <View style={styles.detailsRow}>
          {/* Quantity Badge */}
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{quantity}</Text>
          </View>

          {/* Location Badge */}
          {location ? (
            <View style={styles.locationContainer}>
              <Ionicons name="location-outline" size={14} color={COLORS.textMedium} style={styles.locationIcon} />
              <Text style={styles.locationText} numberOfLines={1}>
                {location}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Action / Delete Button (Bonus Polish) */}
      {onDelete && (
        <TouchableOpacity
          onPress={() => onDelete(id)}
          activeOpacity={0.6}
          style={styles.deleteButton}
        >
          <Ionicons name="trash-outline" size={20} color={COLORS.error} style={{ opacity: 0.8 }} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusMd,
    padding: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 1,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardChecked: {
    backgroundColor: COLORS.background,
    borderColor: COLORS.border,
    opacity: 0.8,
  },
  checkboxContainer: {
    marginRight: SPACING.sm,
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.textDark,
    fontFamily: FONTS.bold,
    marginBottom: 4,
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: COLORS.textMedium,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    backgroundColor: COLORS.lightGreen,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: SIZES.radiusSm,
    marginRight: SPACING.md,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  locationIcon: {
    marginRight: 2,
  },
  locationText: {
    fontSize: 13,
    color: COLORS.textMedium,
    fontFamily: FONTS.regular,
  },
  deleteButton: {
    padding: SPACING.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
