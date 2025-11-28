/**
 * CPF validation utility
 * Validates Brazilian CPF (Cadastro de Pessoas Físicas) using check digit algorithm
 */

/**
 * Validates a CPF number
 * @param cpf - CPF string (with or without mask)
 * @returns true if CPF is valid, false otherwise
 */
export const validateCPF = (cpf: string): boolean => {
  // Remove mask
  const cleanCPF = cpf.replace(/[^\d]/g, '');
  
  // Check length
  if (cleanCPF.length !== 11) {
    return false;
  }
  
  // Check if all digits are the same (invalid CPF)
  if (/^(\d)\1{10}$/.test(cleanCPF)) {
    return false;
  }
  
  // Known invalid CPF sequences
  const invalidCPFs = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
  ];
  
  if (invalidCPFs.includes(cleanCPF)) {
    return false;
  }
  
  // Validate check digits
  let sum = 0;
  let remainder: number;
  
  // Validate first check digit
  for (let i = 1; i <= 9; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i), 10) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(9, 10), 10)) {
    return false;
  }
  
  // Validate second check digit
  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum += parseInt(cleanCPF.substring(i - 1, i), 10) * (12 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.substring(10, 11), 10)) {
    return false;
  }
  
  return true;
};

