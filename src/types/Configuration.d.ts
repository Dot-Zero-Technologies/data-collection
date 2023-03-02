export interface Input {
  type: string
  name: string
  label: string
  required: boolean
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

export interface Configuration {
  schema: Input[]
  title: string
  description: string
  submit: string
  success: string
  error: string
  hooks: Hooks
}
