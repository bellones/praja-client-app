import { yupResolver } from '@hookform/resolvers/yup';
import { FieldPath, UseFormProps, useForm as useReactHookForm } from 'react-hook-form';
import * as yup from 'yup';

interface UseFormOptions<T extends yup.AnyObjectSchema> {
  schema: T;
  defaultValues?: UseFormProps<yup.InferType<T>>['defaultValues'];
  mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'onTouched' | 'all';
}

export const useForm = <T extends yup.AnyObjectSchema>({
  schema,
  defaultValues,
  mode = 'onChange',
}: UseFormOptions<T>) => {
  const form = useReactHookForm<yup.InferType<T>>({
    resolver: yupResolver(schema),
    defaultValues,
    mode,
  });

  return {
    ...form,
    // Helper method to reset form with new values
    resetForm: (values?: Partial<yup.InferType<T>>) => {
      form.reset(values);
    },
    // Helper method to set field error
    setFieldError: (field: FieldPath<yup.InferType<T>>, message: string) => {
      form.setError(field, { type: 'manual', message });
    },
    // Helper method to clear field error
    clearFieldError: (field: FieldPath<yup.InferType<T>>) => {
      form.clearErrors(field);
    },
    // Helper method to check if form is valid
    isFormValid: form.formState.isValid,
    // Helper method to get field value
    getFieldValue: (field: FieldPath<yup.InferType<T>>) => {
      return form.getValues(field);
    },
  };
};