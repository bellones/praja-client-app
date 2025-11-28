import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ChevronDownIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/types';

interface FilterButton {
  id: string;
  label: string;
  onPress: () => void;
}

interface FilterButtonsProps {
  filters: FilterButton[];
  selectedFilter?: string;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  filters,
  selectedFilter,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter) => (
        <Pressable
          key={filter.id}
          onPress={filter.onPress}
          style={[
            styles.button,
            selectedFilter === filter.id && styles.buttonSelected,
          ]}
        >
          <Text
            style={[
              styles.buttonText,
              selectedFilter === filter.id && styles.buttonTextSelected,
            ]}
          >
            {filter.label}
          </Text>
          <ChevronDownIcon
            size={16}
            color={
              selectedFilter === filter.id
                ? theme.colors.primaryText
                : theme.colors.textSecondary
            }
          />
        </Pressable>
      ))}
    </ScrollView>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: theme.spacing(4),
      paddingVertical: theme.spacing(2),
      backgroundColor: theme.colors.background,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing(3),
      paddingVertical: theme.spacing(1.5),
      borderRadius: theme.radius.pill,
      backgroundColor: theme.colors.surface,
      marginRight: theme.spacing(2),
    },
    buttonSelected: {
      backgroundColor: theme.colors.primary,
    },
    buttonText: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts.primary,
      marginRight: theme.spacing(1),
    },
    buttonTextSelected: {
      color: theme.colors.primaryText,
    },
  });

