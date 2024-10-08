import { atom } from 'recoil'

// 진입 경로 저장
export const refState = atom({
  key: 'refState',
  default: '',
})
