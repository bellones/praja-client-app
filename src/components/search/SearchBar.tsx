import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/types';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'O que vai pedir hoje?',
  value,
  onChangeText,
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={styles.container}>
        <MagnifyingGlassIcon size={20} color={theme.colors.textSecondary} />
        <View style={styles.placeholderContainer}>
          <TextInput
            style={styles.placeholderText}
            placeholder={placeholder}
            placeholderTextColor={theme.colors.textSecondary}
            editable={false}
            value={value}
          />
        </View>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <MagnifyingGlassIcon size={20} color={theme.colors.textSecondary} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondary}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      paddingHorizontal: theme.spacing(3),
      paddingVertical: theme.spacing(2),
      marginHorizontal: theme.spacing(4),
      marginVertical: theme.spacing(2),
    },
    input: {
      flex: 1,
      marginLeft: theme.spacing(2),
      fontSize: 16,
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
    },
    placeholderContainer: {
      flex: 1,
      marginLeft: theme.spacing(2),
    },
    placeholderText: {
      fontSize: 16,
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts.primary,
    },
  });

