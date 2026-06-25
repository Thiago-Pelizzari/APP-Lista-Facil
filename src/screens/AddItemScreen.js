import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING, SIZES, FONTS } from '../styles/theme';
import CustomButton from '../components/CustomButton';

export default function AddItemScreen({ navigation }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [location, setLocation] = useState('');

  const [nameFocused, setNameFocused] = useState(false);
  const [qtyFocused, setQtyFocused] = useState(false);
  const [locFocused, setLocFocused] = useState(false);

  const handleSave = () => {
    if (!name.trim()) {
      Alert.alert('Aviso', 'Por favor, digite o nome do item.');
      return;
    }

    // Navigate back to the List screen, passing the new item params
    navigation.navigate('List', {
      newItem: {
        name: name.trim(),
        quantity: quantity.trim(),
        location: location.trim(),
      },
    });

    // Reset fields for next visit
    setName('');
    setQuantity('');
    setLocation('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        {/* Custom Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color={COLORS.textDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Adicionar Novo Item</Text>
          <View style={{ width: 24 }} /> {/* Spacer to align title */}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Decorative Card */}
          <View style={styles.cardHeader}>
            <Ionicons name="cart" size={48} color={COLORS.primary} />
            <Text style={styles.cardTitle}>O que deseja comprar?</Text>
            <Text style={styles.cardSubtitle}>Preencha as informações para organizar sua compra.</Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Item Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nome do Item *</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                placeholder="Ex: Arroz, Feijão, Leite..."
                placeholderTextColor={COLORS.textLight}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                style={[
                  styles.input,
                  nameFocused && styles.inputFocused,
                ]}
              />
            </View>

            {/* Quantity Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Quantidade / Medida</Text>
              <TextInput
                value={quantity}
                onChangeText={setQuantity}
                placeholder="Ex: 2 unidades, 1 kg, 3 caixas..."
                placeholderTextColor={COLORS.textLight}
                onFocus={() => setQtyFocused(true)}
                onBlur={() => setQtyFocused(false)}
                style={[
                  styles.input,
                  qtyFocused && styles.inputFocused,
                ]}
              />
            </View>

            {/* Location Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Local de Compra</Text>
              <TextInput
                value={location}
                onChangeText={setLocation}
                placeholder="Ex: Supermercado Extra, Sacolão..."
                placeholderTextColor={COLORS.textLight}
                onFocus={() => setLocFocused(true)}
                onBlur={() => setLocFocused(false)}
                style={[
                  styles.input,
                  locFocused && styles.inputFocused,
                ]}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <CustomButton
              title="Salvar na Lista"
              variant="primary"
              icon={<Ionicons name="checkmark-circle-outline" size={20} color={COLORS.white} />}
              onPress={handleSave}
              style={styles.saveBtn}
            />

            <CustomButton
              title="Voltar"
              variant="outline"
              onPress={() => navigation.goBack()}
              style={styles.backBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
  form: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: SIZES.radiusLg,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.lg,
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 6,
    paddingLeft: 2,
  },
  input: {
    height: 50,
    backgroundColor: COLORS.background,
    borderWidth: 1.5,
    borderColor: COLORS.border,
    borderRadius: SIZES.radiusMd,
    paddingHorizontal: SPACING.md,
    color: COLORS.textDark,
    fontSize: 15,
  },
  inputFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.cardBackground,
  },
  buttonContainer: {
    marginBottom: SPACING.xl,
  },
  saveBtn: {
    marginBottom: SPACING.xs,
  },
  backBtn: {
    marginVertical: SPACING.xs,
  },
});
