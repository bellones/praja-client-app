import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/types';

interface CategoryCardSkeletonProps {
  columns?: number;
}

export const CategoryCardSkeleton: React.FC<CategoryCardSkeletonProps> = ({
  columns = 2,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme, columns);
  const fadeAnim = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <View style={styles.titleSkeleton} />
          <View style={styles.subtitleSkeleton} />
        </View>
        <View style={styles.imageSkeleton} />
      </View>
    </Animated.View>
  );
};

const createStyles = (theme: AppTheme, columns: number) =>
  StyleSheet.create({
    container: {
      borderRadius: theme.radius.md,
      padding: theme.spacing(3),
      margin: theme.spacing(1),
      minHeight: 120,
      backgroundColor: theme.colors.surface,
      justifyContent: 'center',
    },
    content: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textContainer: {
      flex: 1,
    },
    titleSkeleton: {
      height: 20,
      width: '70%',
      backgroundColor: theme.colors.border,
      borderRadius: theme.radius.sm,
      marginBottom: theme.spacing(1),
    },
    subtitleSkeleton: {
      height: 14,
      width: '50%',
      backgroundColor: theme.colors.border,
      borderRadius: theme.radius.sm,
      marginTop: theme.spacing(0.5),
    },
    imageSkeleton: {
      width: 80,
      height: 80,
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colors.border,
    },
  });


