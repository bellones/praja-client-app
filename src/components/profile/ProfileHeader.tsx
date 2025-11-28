import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Profile } from '../../features/profile/types';
import { useTheme } from '../../theme';
import { AppTheme } from '../../theme/types';

interface ProfileHeaderProps {
  profile: Profile;
  onClubPress?: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  profile,
  onClubPress,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          {profile.avatar ? (
            <Image source={{ uri: profile.avatar }} style={styles.avatarImage} />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>
                {profile?.name?.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          {profile.clubStatus?.hasClub && (
            <View style={styles.clubBadge}>
              <View style={styles.clubBadgeInner} />
            </View>
          )}
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{profile.name}</Text>
        {profile.email && (
          <Text style={styles.email}>{profile.email}</Text>
        )}
        {profile.clubStatus?.hasClub && (
          <Pressable onPress={onClubPress} style={styles.clubLink}>
            <Text style={styles.clubLinkText}>Ver meu Clube {'>'}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

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

