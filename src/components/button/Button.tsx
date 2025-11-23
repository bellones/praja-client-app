import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import { fontWeights } from '../../theme/fonts';
import { useTheme } from '../../theme/ThemeProvider';
import { AppTheme } from '../../theme/types';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title: string;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  containerStyle,
  textStyle,
  leftIcon,
  rightIcon,
  onPress,
  ...rest
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const isDisabled = disabled || loading;

  const getButtonStyle = (): (ViewStyle | undefined)[] => {
    const baseStyle: (ViewStyle | undefined)[] = [
      styles.button,
      styles[`button_${size}`],
    ];
    
    if (fullWidth) {
      baseStyle.push(styles.buttonFullWidth);
    }

    if (isDisabled) {
      baseStyle.push(styles.buttonDisabled);
    } else {
      baseStyle.push(styles[`button_${variant}`]);
    }

    if (containerStyle) {
      baseStyle.push(containerStyle);
    }

    return baseStyle;
  };

  const getTextStyle = (): (TextStyle | undefined)[] => {
    const baseStyle: (TextStyle | undefined)[] = [
      styles.text,
      styles[`text_${size}`],
    ];

    if (isDisabled) {
      baseStyle.push(styles.textDisabled);
    } else {
      baseStyle.push(styles[`text_${variant}`]);
    }

    if (textStyle) {
      baseStyle.push(textStyle);
    }

    return baseStyle;
  };

  const getActivityIndicatorColor = (): string => {
    if (isDisabled) {
      return theme.colors.textSecondary;
    }

    switch (variant) {
      case 'primary':
      case 'danger':
        return theme.colors.primaryText;
      case 'secondary':
        return theme.colors.text;
      case 'outline':
      case 'ghost':
        return theme.colors.primary;
      default:
        return theme.colors.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.7}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getActivityIndicatorColor()} />
      ) : (
        <>
          {leftIcon && <>{leftIcon}</>}
          <Text style={getTextStyle()}>{title}</Text>
          {rightIcon && <>{rightIcon}</>}
        </>
      )}
    </TouchableOpacity>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: theme.radius.md,
      fontFamily: theme.fonts.primary,
    },
    button_small: {
      paddingHorizontal: theme.spacing(3),
      paddingVertical: theme.spacing(1.5),
      minHeight: 36,
    },
    button_medium: {
      paddingHorizontal: theme.spacing(4),
      paddingVertical: theme.spacing(2.5),
      minHeight: 48,
    },
    button_large: {
      paddingHorizontal: theme.spacing(5),
      paddingVertical: theme.spacing(3.5),
      minHeight: 56,
    },
    buttonFullWidth: {
      width: '100%',
    },
    button_primary: {
      backgroundColor: theme.colors.primary,
    },
    button_secondary: {
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    button_outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    button_danger: {
      backgroundColor: theme.colors.danger,
    },
    button_ghost: {
      backgroundColor: 'transparent',
    },
    buttonDisabled: {
      backgroundColor: theme.colors.disabled,
      opacity: 0.6,
    },
    text: {
      fontFamily: theme.fonts.primary,
      fontWeight: fontWeights.bold,
      textAlign: 'center',
    },
    text_small: {
      fontSize: 14,
    },
    text_medium: {
      fontSize: 16,
    },
    text_large: {
      fontSize: 18,
    },
    text_primary: {
      color: theme.colors.primaryText,
    },
    text_secondary: {
      color: theme.colors.text,
    },
    text_outline: {
      color: theme.colors.primary,
    },
    text_danger: {
      color: theme.colors.primaryText,
    },
    text_ghost: {
      color: theme.colors.primary,
    },
    textDisabled: {
      color: theme.colors.textSecondary,
    },
  });

