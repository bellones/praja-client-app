import React from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../theme/ThemeProvider';
import { AppTheme } from '../theme/types';

export interface InputProps<T extends FieldValues> extends TextInputProps {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  errorStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = <T extends FieldValues>({
  name,
  control,
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  errorStyle,
  leftIcon,
  rightIcon,
  placeholder,
  secureTextEntry,
  autoCapitalize,
  keyboardType,
  autoComplete,
  ...rest
}: InputProps<T>) => {
  const { theme } = useTheme();

  const styles = createStyles(theme);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error: fieldError } }) => {
        const errorMessage = error || fieldError?.message;
        const hasError = !!errorMessage;

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
                <View style={styles.leftIconContainer}>{leftIcon}</View>
              )}

              <TextInput
                style={[
                  styles.input,
                  leftIcon ? styles.inputWithLeftIcon : undefined,
                  rightIcon ? styles.inputWithRightIcon : undefined,
                  inputStyle,
                ]}
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                placeholderTextColor={theme.colors.textSecondary}
                secureTextEntry={secureTextEntry}
                autoCapitalize={autoCapitalize}
                keyboardType={keyboardType}
                autoComplete={autoComplete}
                {...rest}
              />

              {rightIcon && (
                <View style={styles.rightIconContainer}>{rightIcon}</View>
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

