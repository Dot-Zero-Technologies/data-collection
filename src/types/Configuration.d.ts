export interface Attribute {
  name: string
  value: string
}

export interface Input {
  type: string
  name: string
  label: string
  required: boolean
  attributes: Attribute[]
}

export interface Hooks {
  onSubmit: Hook[]
}

export interface Hook {
  method: string
  url: string
  headers: { [key: string]: string }
  body: any
}

export interface ExistsLimit {
  type: 'exists'
  field: string
  message: string
}

export interface MaxLimit {
  type: 'max'
  field: string
  value: number
  message: string
}

export type Limit = ExistsLimit | MaxLimit

export interface Configuration {
  schema: Input[]
  title: string
  description: string
  submit: string
  submitionInfo: string
  success: string
  error: string
  limits: Limit[]
  hooks: Hooks
}
