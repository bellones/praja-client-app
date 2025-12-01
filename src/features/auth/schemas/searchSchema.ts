import * as yup from 'yup';

export const searchSchema = yup.object().shape({
  search: yup.string().required('Pesquisa é obrigatória').min(3, 'A pesquisa deve ter pelo menos 3 caracteres'),
});

export type SearchFormData = yup.InferType<typeof searchSchema>;