interface ButtonOption {
  text: string
}

interface InputField {
  type: string
  label: string
  placeholder: string
  key: string
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

type Interaction = ButtonInteraction | InputInteraction
export interface ChatbotFlowType {
  id: number
  message: string
  interaction: Interaction
}

export type InteractionType = {
  type: 'input' | 'textarea' | 'button'
}

export interface MessageType {
  role: 'user' | 'assistant' | 'system'
  content: string
}
