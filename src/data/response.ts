import { GenderType, InfoContentType, MessageType } from '../lib/types';

export const infoContents: InfoContentType[] = [
  {
    id: 1,
    label: 'name',
    text: 'Name',
    value: ''
  }, {
    id: 2,
    label: 'age',
    text: 'Age',
    value: ''
  }, {
    id: 3,
    label: 'mbti',
    text: 'MBTI',
    value: ''
  }
]

export const genders:GenderType[] = [
  {
    id: 1,
    type: 'male',
    text: '남자'
  },
  {
    id: 2,
    type: 'female',
    text: '여자'
  },
]

export const messages: MessageType[] = [
  {
    role: 'user',
    content: 'user입니다'
  },
  {
    role: 'assistant',
    content: 'assistant입니다'
  },
]