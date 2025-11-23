import React, { memo, useMemo } from 'react';
import {
    Pressable,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { fontWeights } from '../../theme/fonts';
import { useTheme } from '../../theme/ThemeProvider';
import { AppTheme } from '../../theme/types';

export type TextButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type TextButtonSize = 'small' | 'medium' | 'large';

interface TextButtonProps {
  text: string;
  onPress: () => void;
  position?: 'left' | 'center' | 'right';
  variant?: TextButtonVariant;
  size?: TextButtonSize;
  disabled?: boolean;
  underlined?: boolean;     
  style?: ViewStyle;
  textStyle?: TextStyle; 
  testID?: string;
  accessibilityLabel?: string;
}

const TextButton: React.FC<TextButtonProps> = ({
  text,
  onPress,
  position = 'center',
  variant = 'primary',
  size = 'medium',
  disabled = false,
  underlined = false,
  style,
  textStyle,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);
  
  const containerAlignStyle = useMemo<ViewStyle>(() => {
    switch (position) {
      case 'left':
        return styles.leftContainer;
      case 'right':
        return styles.rightContainer;
      case 'center':
      default:
        return styles.centerContainer;
    }
  }, [position, styles]);

  const getTextStyle = (): (TextStyle | undefined)[] => {
    const baseStyle: (TextStyle | undefined)[] = [
      styles.text,
      styles[`text_${size}`],
    ];

    if (disabled) {
      baseStyle.push(styles.textDisabled);
    } else {
      baseStyle.push(styles[`text_${variant}`]);
    }

    if (underlined) {
      baseStyle.push(styles.textUnderlined);
    }

    if (textStyle) {
      baseStyle.push(textStyle);
    }

    return baseStyle;
  };

  return (
    <View style={[containerAlignStyle, style]}>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel ?? text}
        testID={testID}
        style={({ pressed }) => [
          styles.button,
          disabled && styles.buttonDisabled,
          pressed && !disabled && styles.buttonPressed,
        ]}
      >
        <Text style={getTextStyle()}>{text}</Text>
      </Pressable>
    </View>
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    leftContainer: { alignSelf: 'flex-start' },
    centerContainer: { alignSelf: 'center' },
    rightContainer: { alignSelf: 'flex-end' },

    button: {
      paddingVertical: theme.spacing(2),
      paddingHorizontal: theme.spacing(1),
    },
    buttonDisabled: {
      opacity: 0.5,
    },
    buttonPressed: {
      opacity: 0.7,
    },
    text: {
      fontFamily: theme.fonts.primary,
      fontWeight: fontWeights.medium,
    },
    text_small: {
      fontSize: 12,
    },
    text_medium: {
      fontSize: 14,
    },
    text_large: {
      fontSize: 16,
    },
    text_primary: {
      color: theme.colors.primary,
    },
    text_secondary: {
      color: theme.colors.textSecondary,
    },
    text_danger: {
      color: theme.colors.danger,
    },
    text_ghost: {
      color: theme.colors.text,
    },
    textDisabled: {
      color: theme.colors.disabled,
    },
    textUnderlined: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
    },
  });

export default memo(TextButton);