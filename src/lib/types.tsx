export interface IngredientType {
  id: number
  label: string // ingredient + id
  text: string // 재료명
  value: string // 사용자 입력값
}

// -----
// const genders = {
//   male: 'male',
//   female: 'female',
// } as const

// type GendersType = (typeof genders)[keyof typeof genders] // 'male' | 'female'

type MbtiType =
  | 'INTJ'
  | 'INTP'
  | 'INFJ'
  | 'INFP'
  | 'ISTJ'
  | 'ISTP'
  | 'ISFJ'
  | 'ISFP'
  | 'ENTJ'
  | 'ENTP'
  | 'ENFJ'
  | 'ENFP'
  | 'ESTJ'
  | 'ESTP'
  | 'ESFJ'
  | 'ESFP'

export interface InfoGenderType {
  id: number
  type: 'male' | 'female'
  text: '남자' | '여자'
}

export type InfoCategoryType = 'user' | 'partner'

export interface InfoType {
  id: number
  type: 'user' | 'partner'
  gender: InfoGenderType
  name: string
  age: string
  mbti: MbtiType | null
}

export interface InfoContentType {
  id: number
  label: 'name' | 'age' | 'mbti'
  text: 'Name' | 'Age' | 'MBTI'
  placeholder: string
  value: string
}

export interface MessageType {
  role: 'user' | 'assistant'
  content: string
}
