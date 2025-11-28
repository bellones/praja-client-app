import React, { useCallback } from 'react';
import { Controller, Control, FieldPath, FieldValues } from 'react-hook-form';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';
import { AppTheme } from '../../theme/types';
import { maskCPF, maskDate, maskPhone, unmaskCPF, unmaskDate, unmaskPhone } from '../../utils/masks';

export type MaskType = 'cpf' | 'phone' | 'date';

export interface MaskedInputProps<T extends FieldValues> extends Omit<TextInputProps, 'style'> {
  name: FieldPath<T>;
  control: Control<T>;
  mask: MaskType;
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;
}

export const MaskedInput = <T extends FieldValues>({
  mask,
  control,
  name,
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  leftIcon,
  rightIcon,
  onRightIconPress,
  onLeftIconPress,
  placeholder,
  ...rest
}: MaskedInputProps<T>) => {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  const applyMask = useCallback(
    (value: string, maskType: MaskType): string => {
      if (!value) return '';
      switch (maskType) {
        case 'cpf':
          return maskCPF(value);
        case 'phone':
          return maskPhone(value);
        case 'date':
          return maskDate(value);
        default:
          return value;
      }
    },
    []
  );

  const removeMask = useCallback(
    (value: string, maskType: MaskType): string => {
      if (!value) return '';
      switch (maskType) {
        case 'cpf':
          return unmaskCPF(value);
        case 'phone':
          return unmaskPhone(value);
        case 'date':
          return unmaskDate(value);
        default:
          return value;
      }
    },
    []
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => {
        const errorMessage = error || fieldError?.message;
        const hasError = !!errorMessage;
        
        // Display masked value, but store unmasked value in form
        const displayValue = value ? applyMask(value, mask) : '';
        
        const handleChangeText = (text: string) => {
          // Remove existing mask
          const currentUnmasked = value ? removeMask(value, mask) : '';
          // Remove mask from new text
          const newUnmasked = removeMask(text, mask);
          
          // Only update if the unmasked value changed (prevents issues with cursor position)
          if (newUnmasked !== currentUnmasked) {
            // Store unmasked value in form
            onChange(newUnmasked);
          }
        };

        return (
          <View style={[styles.container, containerStyle]}>
            {label && (
              <Text style={[styles.label, labelStyle]}>{label}</Text>
            )}

            <View
              style={[
                styles.inputContainer,
                hasError && styles.inputContainerError,
              ]}
            >
              {leftIcon && (
                <Pressable
                  onPress={onLeftIconPress}
                  disabled={!onLeftIconPress}
                  style={styles.leftIconContainer}
                >
                  {leftIcon}
                </Pressable>
              )}

              <TextInput
                style={[
                  styles.input,
                  leftIcon ? styles.inputWithLeftIcon : undefined,
                  rightIcon ? styles.inputWithRightIcon : undefined,
                  inputStyle,
                ]}
                value={displayValue}
                onChangeText={handleChangeText}
                onBlur={onBlur}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textSecondary}
                keyboardType={mask === 'date' || mask === 'cpf' ? 'numeric' : 'phone-pad'}
                {...rest}
              />

              {rightIcon && (
                <Pressable
                  onPress={onRightIconPress}
                  disabled={!onRightIconPress}
                  style={styles.rightIconContainer}
                >
                  {rightIcon}
                </Pressable>
              )}
            </View>

            {errorMessage && (
              <Text style={[styles.errorText, errorStyle]}>
                {errorMessage}
              </Text>
            )}
          </View>
        );
      }}
    />
  );
};

const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      marginBottom: theme.spacing(3),
      width: '100%',
    },
    label: {
      fontSize: 14,
      fontFamily: theme.fonts.primary,
      fontWeight: '500',
      color: theme.colors.text,
      marginBottom: theme.spacing(1),
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.md,
      backgroundColor: theme.colors.surface,
      minHeight: 48,
    },
    inputContainerError: {
      borderColor: theme.colors.danger,
    },
    input: {
      flex: 1,
      fontSize: 16,
      fontFamily: theme.fonts.primary,
      color: theme.colors.text,
      paddingHorizontal: theme.spacing(3),
      paddingVertical: theme.spacing(2),
    },
    inputWithLeftIcon: {
      paddingLeft: theme.spacing(1),
    },
    inputWithRightIcon: {
      paddingRight: theme.spacing(1),
    },
    leftIconContainer: {
      paddingLeft: theme.spacing(3),
      justifyContent: 'center',
      alignItems: 'center',
    },
    rightIconContainer: {
      paddingRight: theme.spacing(3),
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorText: {
      fontSize: 12,
      fontFamily: theme.fonts.primary,
      color: theme.colors.danger,
      marginTop: theme.spacing(1),
      marginLeft: theme.spacing(1),
    },
  });


