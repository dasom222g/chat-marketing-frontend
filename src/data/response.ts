import { ChatbotFlowType, GPTMessageType } from '../lib/types';

export const chatbotFlow: ChatbotFlowType[] = [
  {
    id: 1,
    message: '안녕하세요^^\n문의주셔서 감사합니다.\n컨설팅을 도와드릴까요?',
    interaction: {
      type: 'button',
      options: [{ text: '네!' }],
      nextId: 2
    },
  },
  {
    id: 2,
    message: '감사합니다^^\n컨설팅 신청자 확인을 위해 아래 정보를 입력바랍니다.',
    interaction: {
      type: 'input',
      fields: [
        { type: 'text', label: '이름', placeholder: '이름을 적어주세요', key: 'name' },
        { type: 'text', label: '연락처', placeholder: '연락처를 적어주세요', key: 'contact' },
      ],
      nextId: 3,
    },
  },
  {
    id: 3,
    message: '감사합니다^^\n맞춤형 컨설팅을 위해 아래 정보를 입력해주세요',
    interaction: {
      type: 'input',
      fields: [
        { type: 'text', label: '매출(월 00만원)', placeholder: '000', key: 'monthlyRevenue' },
        { type: 'text', label: '업종', placeholder: '치의/한의/요양/외과/내과', key: 'businessType' },
        { type: 'text', label: '주소', placeholder: '주소 입력하기', key: 'address' },
        { type: 'text', label: '주요상품', placeholder: '주요상품을 적어주세요', key: 'mainProduct' },
      ],
      nextId: 4,
    },
  },
  {
    id: 4,
    message: '끝으로 병원 마케팅을 위해 필요한 의견을 자유롭게 적어주세요 :)',
    interaction: {
      type: 'textarea',
      fields: [
        { type: 'textarea', label: '기타 의견 및 제안', placeholder: '의견을 자유롭게 적어주세요', key: 'etc' }
      ],
      nextId: 4
    },
  },
];


export const gptMessages: GPTMessageType[] = [
  {
    id: 1,
    role: 'assistant',
    message: 'assistant입니다'
  },
]