import {
  FormField,
  FormState,
  FormFieldValidationResult,
  PreactComponentInstance,
  SerializedForm
} from './types'

export function updateOnInput(
  comp: PreactComponentInstance,
  key: string,
  cb?: Function
) {
  return ({ target: { value } }: { target: { value: string } }) => {
    updateWithValue(comp, key, value)
    return cb && cb(value, key)
  }
}

export function updateOnCheckbox(
  comp: PreactComponentInstance,
  key: string,
  cb?: Function
) {
  return ({ target: { checked: value } }: { target: { checked: boolean } }) => {
    updateWithValue(comp, key, value)
    return cb && cb(value, key)
  }
}

export function updateOnClick(
  context: PreactComponentInstance,
  key: string,
  value: any,
  cb?: Function
) {
  return (e: any) => {
    updateWithValue(context, key, value)
    cb && cb(e)
  }
}

export function updateWithValue(
  comp: PreactComponentInstance,
  key: string,
  value: any
) {
  const form = updateField(comp.state.form, key, value)
  comp.setState({ form })
  const { onUpdate } = comp.props
  onUpdate && onUpdate(form)
}

export function updateField(
  form: FormState,
  key: string,
  value: string | boolean
) {
  const newForm = cloneDeep(form)
  newForm.fields[key].value = value
  return newForm
}

export function trySubmit(form: FormState) {
  const newForm = cloneDeep(form)

  Object.keys(newForm.fields).forEach(fieldKey => {
    const field = newForm.fields[fieldKey]
    Object.assign(field, validate(field, form))
  })

  const valid = !Object.values(newForm.fields).some(({ valid }) => !valid)

  Object.assign(newForm, {
    valid,
    submitting: valid,
    onceTriedToSubmit: true
  })

  return newForm
}

export function serialize(form: FormState) {
  return Object.keys(form.fields).reduce(
    (acc, fieldName) => {
      const { value } = form.fields[fieldName]
      if (value !== undefined) acc[fieldName] = value
      return acc
    },
    {} as SerializedForm
  )
}

function validate(
  field: FormField<any>,
  form: FormState
): FormFieldValidationResult {
  if (field.validate) {
    for (let validateFn of field.validate) {
      let result = validateFn(field.value, form)
      if (!result.valid) return result
    }
  }

  return { valid: true, error: null }
}

function cloneDeep<T>(value: T): T {
  if (!value || !(typeof value === 'object')) return value
  const typeStr = Object.prototype.toString.call(value)
  const newObj: { [key: string]: any } = Object.assign(
    typeStr === '[object Array]' ? [] : {},
    value
  )
  Object.keys(newObj).forEach(key => {
    if (newObj[key] && typeof newObj[key] === 'object') {
      newObj[key] = cloneDeep(newObj[key])
    }
  })
  return newObj as T
}
