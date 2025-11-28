/**
 * Mask utilities for Brazilian formats
 */

/**
 * Masks a CPF value to format: 000.000.000-00
 */
export const maskCPF = (value: string): string => {
  const unmasked = unmaskCPF(value);
  
  if (unmasked.length <= 3) {
    return unmasked;
  } else if (unmasked.length <= 6) {
    return `${unmasked.slice(0, 3)}.${unmasked.slice(3)}`;
  } else if (unmasked.length <= 9) {
    return `${unmasked.slice(0, 3)}.${unmasked.slice(3, 6)}.${unmasked.slice(6)}`;
  } else {
    return `${unmasked.slice(0, 3)}.${unmasked.slice(3, 6)}.${unmasked.slice(6, 9)}-${unmasked.slice(9, 11)}`;
  }
};

/**
 * Removes CPF mask formatting
 */
export const unmaskCPF = (value: string): string => {
  return value.replace(/[^\d]/g, '');
};

/**
 * Masks a Brazilian phone number to format: (00) 00000-0000
 */
export const maskPhone = (value: string): string => {
  const unmasked = unmaskPhone(value);
  
  if (unmasked.length === 0) {
    return '';
  } else if (unmasked.length <= 2) {
    return `(${unmasked}`;
  } else if (unmasked.length <= 7) {
    return `(${unmasked.slice(0, 2)}) ${unmasked.slice(2)}`;
  } else {
    return `(${unmasked.slice(0, 2)}) ${unmasked.slice(2, 7)}-${unmasked.slice(7, 11)}`;
  }
};

/**
 * Removes phone mask formatting
 */
export const unmaskPhone = (value: string): string => {
  return value.replace(/[^\d]/g, '');
};

/**
 * Masks a date to format: dd/MM/yyyy
 */
export const maskDate = (value: string): string => {
  const unmasked = unmaskDate(value);
  
  if (unmasked.length <= 2) {
    return unmasked;
  } else if (unmasked.length <= 4) {
    return `${unmasked.slice(0, 2)}/${unmasked.slice(2)}`;
  } else {
    return `${unmasked.slice(0, 2)}/${unmasked.slice(2, 4)}/${unmasked.slice(4, 8)}`;
  }
};

/**
 * Removes date mask formatting
 */
export const unmaskDate = (value: string): string => {
  return value.replace(/[^\d]/g, '');
};

/**
 * Converts date from dd/MM/yyyy to yyyy-MM-dd for API
 */
export const formatDateForAPI = (date: string): string => {
  const unmasked = unmaskDate(date);
  
  if (unmasked.length !== 8) {
    return date; // Return as-is if invalid format
  }
  
  const day = unmasked.slice(0, 2);
  const month = unmasked.slice(2, 4);
  const year = unmasked.slice(4, 8);
  
  return `${year}-${month}-${day}`;
};

/**
 * Converts date from yyyy-MM-dd to dd/MM/yyyy for display
 */
export const parseDateFromAPI = (date: string): string => {
  // Handle both formats: yyyy-MM-dd and dd/MM/yyyy
  if (date.includes('/')) {
    return date; // Already in dd/MM/yyyy format
  }
  
  const parts = date.split('-');
  if (parts.length === 3) {
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  }
  
  return date;
};

