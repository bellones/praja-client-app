import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/types';
import { Category } from '../../features/categories/types';

interface CategoryCardProps {
  category: Category;
  onPress: () => void;
  columns?: number;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onPress,
  columns = 2,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme, columns);

  const backgroundColor = category.backgroundColor || theme.colors.primary;

  return (
    <Pressable onPress={onPress} style={[styles.container, { backgroundColor }]}>
      {category.image ? (
        <Image source={{ uri: category.image }} style={styles.image} resizeMode="cover" />
      ) : (
        <View style={styles.placeholder} />
      )}
    </Pressable>
  );
};

const createStyles = (theme: AppTheme, columns: number) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.radius.md,
      margin: theme.spacing(1),
      width: '100%',
      aspectRatio: 1,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: '100%',
      height: '100%',
    },
    placeholder: {
      width: '100%',
      height: '100%',
    },
  });

