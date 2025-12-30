import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAuthStore } from '../../state/authStore';
import { useTheme } from '../../theme/ThemeProvider';
import { AppTheme } from '../../theme/types';

const ProfileHeader = () => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  const user = useAuthStore((state) => state.user);
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>

            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {user?.name?.charAt(0).toUpperCase()}
              </Text>
            </View>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user?.name}</Text>
        {user?.email && (
          <Text style={styles.email}>{user?.email}</Text>
        )}

      </View>
    </View>
  );
};

export default ProfileHeader;

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing(4),
      paddingVertical: theme.spacing(4),
      backgroundColor: theme.colors.background,
    },
    avatarContainer: {
      marginRight: theme.spacing(3),
    },
    avatar: {
      width: 64,
      height: 64,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
      borderRadius: theme.radius.md,
    },
    avatarPlaceholder: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primaryText,
      fontFamily: theme.fonts.primary,
    },
    clubBadge: {
      position: 'absolute',
      bottom: -4,
      right: -4,
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
      alignItems: 'center',
    },
    clubBadgeInner: {
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: theme.colors.primary,
    },
    infoContainer: {
      flex: 1,
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.colors.text,
      fontFamily: theme.fonts.primary,
      marginBottom: theme.spacing(0.5),
    },
    email: {
      fontSize: 14,
      color: theme.colors.textSecondary,
      fontFamily: theme.fonts.primary,
      marginBottom: theme.spacing(1),
    },
    clubLink: {
      alignSelf: 'flex-start',
    },
    clubLinkText: {
      fontSize: 14,
      color: theme.colors.primary,
      fontFamily: theme.fonts.primary,
    },
  });