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

export interface GenderType {
  id: number
  type: 'male' | 'female'
  text: '남자' | '여자'
}

export interface InfoType {
  id: number
  type: 'user' | 'partner'
  gender: GenderType
  name: string
  age: string
  mbti: MbtiType
}

export interface InfoContentType {
  id: number
  label: 'name' | 'age' | 'mbti'
  text: 'Name' | 'Age' | 'MBTI'
  value: string
}

export interface MessageType {
  role: 'user' | 'assistant'
  content: string
}
