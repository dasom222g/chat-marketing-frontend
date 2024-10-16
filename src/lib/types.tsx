interface ButtonOption {
  text: string
}

interface InputField {
  type: string
  label: string
  placeholder: string
  key: FormField
}

interface ButtonInteraction {
  type: 'button'
  options: ButtonOption[]
  nextId: number
}

interface InputInteraction {
  type: 'input' | 'textarea'
  fields: InputField[]
  nextId: number
}

export type Interaction = ButtonInteraction | InputInteraction
export interface ChatbotFlowType {
  id: number
  message: string
  interaction: Interaction
}

export type InteractionType = {
  type: 'input' | 'textarea' | 'button' | 'gpt'
}
// 필드 키를 유니온 타입으로 정의합니다.
type FormField =
  | 'name'
  | 'contact'
  | 'monthlyRevenue'
  | 'businessType'
  | 'address'
  | 'mainProduct'
  | 'etc'
  | 'schedule'

// type 키워드를 사용하여 UserFormDataType을 정의합니다.
export type UserFormDataType = {
  [key in FormField]: string
}

export interface GPTMessageType {
  id: number
  role: 'user' | 'assistant' | 'system'
  message: string
}
