import { InfoGenderType, InfoType } from '../lib/types';

const initialGender:InfoGenderType = {
  id: 1,
  type: 'male',
  text: '남자'
}

export const initialUserInfo: InfoType = {
  id: 1,
  type: 'user',
  gender: initialGender,
  name: '',
  age: '',
  mbti: null,
}
export const initialPartnerInfo: InfoType = {
  id: 2,
  type: 'partner',
  gender: initialGender,
  name: '',
  age: '',
  mbti: null,
}