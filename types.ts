export interface FormFieldValidationResult {
  valid: boolean
  error: string | null
}

export type ValidateFn<T> = (
  value: T,
  form: FormState
) => FormFieldValidationResult

export type FormField<T> = {
  value: T
  initialValue: T
  valid: boolean
  error?: string
  validate?: Array<ValidateFn<T>>
}

export type FormFields = {
  [index: string]: FormField<any>
}

export interface FormStateFields {
  fields: FormFields
}

export interface FormState extends FormStateFields {
  submitting: boolean
}

export interface SerializedForm {
  [index: string]: string | boolean
}

export type FormRenderProp = (
  formComponent: PreactComponentInstance,
  form: FormState
) => any

export interface FormComponentProps {
  children: FormRenderProp | [FormRenderProp]
  initialForm: (props: object) => FormStateFields
  onUpdate?: (formState: FormState) => void
  onInitialState?: (formState: FormState) => void
}

export interface FormComponentState {
  form: FormState
}

export interface PreactComponentInstance {
  props: FormComponentProps
  state: FormComponentState
  setState: Function
}
