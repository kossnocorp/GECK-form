import { h } from 'preact'
import { V, H } from 'GECK-UI/Spacing'
import { Text, Strong } from 'GECK-UI/Text'
import Input from '../Input'
import { Select } from '../Select'
import { updateOnInput, updateOnCheckbox } from '..'
import { FieldLabel, FieldDescription, FieldError } from './style'
import { Size } from 'GECK-UI/types'
import { PreactComponentInstance } from '../types'

export { FieldLabel, FieldDescription, FieldError }

interface CommonFieldProps {
  formContext: PreactComponentInstance
  fieldName: string
  label?: string
  description?: string
  optional?: boolean
  size?: Size
}

export function TextField({
  formContext,
  fieldName,
  label,
  description,
  optional,
  size = Size.Medium,
  ...props
}: CommonFieldProps & {
  type?: string
  placeholder?: string
}) {
  const { submitting, fields } = formContext.state.form
  const { value, error } = fields[fieldName]
  return (
    <V tag="label" size="small">
      {label && <Label label={label} optional={optional} />}

      <Input
        name={fieldName}
        {...props}
        size={size}
        value={value}
        onInput={updateOnInput(formContext, fieldName)}
        disabled={submitting}
        fullWidth
      />

      {error && <FieldError>{error}</FieldError>}

      {description && <Text color="secondary">{description}</Text>}
    </V>
  )
}

export interface Option {
  value: string
  label: string
}

export function SelectField({
  formContext,
  fieldName,
  label,
  optional,
  description,
  options
}: CommonFieldProps & {
  options: Option[]
}) {
  const { submitting, fields } = formContext.state.form
  const { value, valid, error } = fields[fieldName]
  return (
    <V tag="label" size="small">
      <Label label={label} optional={optional} />

      <Select
        name={fieldName}
        tag="select"
        size="large"
        value={value}
        onInput={updateOnInput(formContext, fieldName)}
        errored={!valid}
        disabled={submitting}
      >
        {options.map(({ value, label }) => (
          <option value={value} key={value}>
            {label}
          </option>
        ))}
      </Select>

      {error && <FieldError>{error}</FieldError>}

      {description && <Text color="secondary">{description}</Text>}
    </V>
  )
}

export function CheckboxField({
  formContext,
  fieldName,
  label,
  optional,
  description
}: CommonFieldProps) {
  const { submitting, fields } = formContext.state.form
  const { value, error } = fields[fieldName]
  return (
    <V tag="label" size="small">
      <H tag="label" size="small" adjusted>
        <input
          type="checkbox"
          checked={value}
          onChange={updateOnCheckbox(formContext, fieldName)}
          disabled={submitting}
        />

        <Label label={label} optional={optional} />
      </H>

      {error && <FieldError>{error}</FieldError>}

      {description && <Text color="secondary">{description}</Text>}
    </V>
  )
}

export function Label({
  label,
  optional
}: {
  label: string
  optional?: boolean
}) {
  return (
    <Text>
      <Strong tag="strong">{label}</Strong>{' '}
      {optional && (
        <Text tag="span" color="secondary">
          (optional)
        </Text>
      )}
    </Text>
  )
}
