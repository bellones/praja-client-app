import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/types';

interface PromotionalBannerProps {
  icon?: React.ReactNode;
  iconImage?: string;
  title: string;
  description: string;
  onPress?: () => void;
}

export const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  icon,
  iconImage,
  title,
  description,
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.iconContainer}>
        {iconImage ? (
          <Image source={{ uri: iconImage }} style={styles.iconImage} />
        ) : (
          icon
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <ChevronRightIcon size={20} color={theme.colors.textSecondary} />
    </Pressable>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      padding: theme.spacing(3),
      marginHorizontal: theme.spacing(4),
      marginBottom: theme.spacing(3),
    },
    iconContainer: {
      width: 48,
      height: 48,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing(3),
    },
    iconImage: {
      width: '100%',
      height: '100%',
      borderRadius: theme.radius.md,
    },
    textContainer: {
      flex: 1,
    },
    title: {
      fontSize: 16,
      fontWeight: '600',
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
      marginBottom: theme.spacing(0.5),
    },
    description: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts.primary,
    },
  });

