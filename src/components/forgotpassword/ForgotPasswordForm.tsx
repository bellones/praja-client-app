import React from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { View } from 'react-native';
import { ForgotPasswordFormData } from '../../features/auth/schemas/authSchemas';
import { Input } from '../input/Input';

type ForgotPasswordFormProps = {
  control: Control<ForgotPasswordFormData>;
  errors: FieldErrors<ForgotPasswordFormData>;
};

const ForgotPasswordForm = ({ control, errors }: ForgotPasswordFormProps) => {
  return (
    <View style={{ width: '100%' }}>
      <Input
        label="Email"
        control={control}
        name="email"
        placeholder="Digite seu email"
        error={errors.email?.message}
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
      />
    </View>
  );
};

export default ForgotPasswordForm;




