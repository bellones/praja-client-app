import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/types';

export const ProfileMenuItemSkeleton: React.FC = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
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
      <View style={styles.leftSection}>
        <View style={styles.iconSkeleton} />
        <View style={styles.labelSkeleton} />
      </View>
    </Animated.View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: theme.spacing(5),
      paddingHorizontal: theme.spacing(4),
      backgroundColor: theme.colors.background,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    iconSkeleton: {
      width: 24,
      height: 24,
      borderRadius: theme.radius.sm,
      backgroundColor: theme.colors.border,
      marginRight: theme.spacing(3),
    },
    labelSkeleton: {
      height: 16,
      width: '60%',
      backgroundColor: theme.colors.border,
      borderRadius: theme.radius.sm,
    },
  });


