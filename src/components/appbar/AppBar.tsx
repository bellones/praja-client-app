import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ViewStyle,
} from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useTheme } from '../../theme/ThemeProvider';
import { AppTheme } from '../../theme/types';

/**
 * AppBar Component
 * 
 * A reusable app bar component with back button, title, and right actions.
 * 
 * @example
 * // Basic usage with title
 * <AppBar title="My Screen" />
 * 
 * @example
 * // With icon button action
 * <AppBar 
 *   title="My Screen"
 *   rightActions={[
 *     <Pressable onPress={handleSave}>
 *       <CheckIcon size={24} color={theme.colors.primary} />
 *     </Pressable>
 *   ]}
 * />
 * 
 * @example
 * // With text button action
 * <AppBar 
 *   title="My Screen"
 *   rightActions={[
 *     <TextButton text="Save" onPress={handleSave} variant="primary" />
 *   ]}
 * />
 * 
 * @example
 * // Custom back button handler
 * <AppBar 
 *   title="My Screen"
 *   onBackPress={() => navigation.navigate('Home')}
 * />
 * 
 * @example
 * // Hide back button
 * <AppBar 
 *   title="My Screen"
 *   showBackButton={false}
 * />
 */

export interface AppBarAction {
  icon?: React.ReactNode;
  text?: string;
  onPress: () => void;
  disabled?: boolean;
}

export interface AppBarProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightActions?: React.ReactNode[];
  containerStyle?: ViewStyle;
}

export const AppBar: React.FC<AppBarProps> = ({
  title,
  showBackButton = true,
  onBackPress,
  rightActions = [],
  containerStyle,
}) => {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const styles = createStyles(theme);

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, containerStyle]}>
      <View style={styles.container}>
        {/* Left Section - Back Button */}
        <View style={styles.leftSection}>
          {showBackButton && (
            <Pressable
              onPress={handleBackPress}
              style={styles.backButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ChevronLeftIcon
                size={24}
                color={theme.colors.text}
              />
            </Pressable>
          )}
        </View>

        {/* Center Section - Title */}
        <View style={styles.centerSection}>
          {title && (
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
          )}
        </View>

        {/* Right Section - Actions */}
        <View style={styles.rightSection}>
          {rightActions.map((action, index) => (
            <View key={index} style={styles.actionItem}>
              {action}
            </View>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    safeArea: {
      backgroundColor: theme.colors.background,
    },
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 56,
      paddingHorizontal: theme.spacing(2),
      backgroundColor: theme.colors.background,
    },
    leftSection: {
      width: 48,
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    backButton: {
      padding: theme.spacing(1),
      justifyContent: 'center',
      alignItems: 'center',
    },
    centerSection: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: theme.spacing(2),
    },
    title: {
      fontSize: 18,
      fontFamily: theme.fonts.primary,
      fontWeight: '600',
      color: theme.colors.text,
      textAlign: 'center',
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-end',
      minWidth: 48,
    },
    actionItem: {
      marginLeft: theme.spacing(2),
    },
  });

