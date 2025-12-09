import { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BellIcon } from "react-native-heroicons/outline";
import { User } from "../../state";
import { useTheme } from "../../theme/ThemeProvider";
import { AppTheme } from "../../theme/types";

type UserProfileProps = {
    user: User | null;
}

const UserProfile = ({ user }: UserProfileProps) => {
    const { theme } = useTheme();
    const styles = useMemo(() => createUserProfileStyles(theme), [theme]);
    return (
        <View style={styles.container}>
            <View style={styles.userPhoto} />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{user?.name}</Text>
                <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
            <View style={styles.userActions} > 
                <TouchableOpacity style={styles.iconButton} accessibilityLabel="Notifications" activeOpacity={0.8}>
                    <BellIcon size={24} color={theme.colors.text} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const createUserProfileStyles = (theme: AppTheme) => StyleSheet.create({
    container: {
        backgroundColor: theme.colors.background,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: theme.spacing(1),
        paddingLeft: theme.spacing(2),
    },
    userPhoto: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.disabled,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: theme.colors.text,
        fontFamily: theme.fonts.primary,
    },
    userEmail: {
        fontSize: 14,
        color: theme.colors.textSecondary,
        fontFamily: theme.fonts.secondary,
    },
    userActions: {
        flexDirection: 'row',
        gap: theme.spacing(2),
    },
    iconButton: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default UserProfile;