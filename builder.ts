import pluralize from 'pluralize'
import { FormField, FormFieldValidationResult, ValidateFn } from './types'

export function stringField(
  initialValue?: string,
  validate?: Array<ValidateFn<string>>
): FormField<string> {
  return {
    value: initialValue || '',
    initialValue: initialValue || '',
    valid: true,
    validate
  }
}

export function objectField(
  initialValue?: object,
  validate?: Array<ValidateFn<object>>
): FormField<object> {
  return {
    value: initialValue || {},
    initialValue: initialValue || {},
    valid: true,
    validate
  }
}

export function booleanField(
  initialValue?: boolean,
  validate?: Array<ValidateFn<boolean>>
): FormField<boolean> {
  return {
    value: initialValue || false,
    initialValue: initialValue || false,
    valid: true,
    validate
  }
}

export function validatePresence(error?: string): ValidateFn<string> {
  return (value: string): FormFieldValidationResult => {
    const valid = Boolean(value && value.trim())
    return {
      valid,
      error: valid ? null : error || 'This field is required'
    }
  }
}

export function validateMinLength(
  minLength: number,
  error?: string
): ValidateFn<string> {
  return (value: string): FormFieldValidationResult => {
    const valid = ((value && value.trim()) || '').length >= minLength
    return {
      valid,
      error: valid
        ? null
        : error ||
          `This field should be at least ${minLength} ${pluralize(
            'characters',
            minLength
          )} long`
    }
  }
}
