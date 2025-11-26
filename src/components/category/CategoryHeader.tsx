import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ArrowUpTrayIcon, ChevronLeftIcon, StarIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/types';
import { CategoryDetails } from '../../features/categories/types';

interface CategoryHeaderProps {
  category: CategoryDetails;
  onSharePress?: () => void;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  category,
  onSharePress,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <ChevronLeftIcon size={24} color={theme.colors.primaryText} />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{category.name}</Text>
          <StarIcon size={20} color={theme.colors.primaryText} />
        </View>
        {onSharePress && (
          <Pressable onPress={onSharePress} style={styles.shareButton}>
            <ArrowUpTrayIcon size={20} color={theme.colors.primaryText} />
          </Pressable>
        )}
      </View>
      <Text style={styles.subtitle}>
        {category.description || 'Restaurantes com a melhor experiência pra você'}
      </Text>
      {category.image && (
        <Image source={{ uri: category.image }} style={styles.image} />
      )}
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.colors.danger,
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(6),
      paddingHorizontal: theme.spacing(4),
    },
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(2),
    },
    backButton: {
      padding: theme.spacing(1),
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primaryText,
      fontFamily: theme.fonts.primary,
      marginRight: theme.spacing(1),
    },
    shareButton: {
      padding: theme.spacing(1),
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      borderRadius: theme.radius.sm,
    },
    subtitle: {
      fontSize: 14,
      color: theme.colors.primaryText,
      fontFamily: theme.fonts.primary,
      opacity: 0.9,
      marginBottom: theme.spacing(2),
    },
    image: {
      width: '100%',
      height: 150,
      borderRadius: theme.radius.md,
      marginTop: theme.spacing(2),
    },
  });

