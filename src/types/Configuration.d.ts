export interface Input {
  type: string
  name: string
  label: string
  required: boolean
}

export interface Configuration {
  schema: Input[]
  title: string
  description: string
  submit: string
  success: string
  error: string
}
