import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppTheme } from '../../theme/types';

interface ProfileMenuItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: number;
  onPress: () => void;
}
 const ProfileMenuItem: React.FC<ProfileMenuItemProps> = ({
  icon,
  label,
  badge,
  onPress,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>{icon}</View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.rightSection}>
        {badge !== undefined && badge > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
    </Pressable>
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
    iconContainer: {
      width: 24,
      height: 24,
      marginRight: theme.spacing(3),
      justifyContent: 'center',
      alignItems: 'center',
    },
    label: {
      fontSize: 16,
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    badge: {
      minWidth: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: theme.colors.danger,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 6,
      marginRight: theme.spacing(2),
    },
    badgeText: {
      fontSize: 12,
      fontWeight: '600',
      color: theme.colors.primaryText,
      fontFamily: theme.fonts.primary,
    },
  });

  export default ProfileMenuItem;