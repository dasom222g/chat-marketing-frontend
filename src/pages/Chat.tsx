import React, { FC, useCallback, useEffect, useState } from 'react'
import MessageBox from '../components/MessageBox'
import { GPTMessageType, UserFormDataType } from '../lib/types'
import { chatbotFlow } from '../data/response'
import { useRecoilValue } from 'recoil'
import { refState } from '../data/data'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../firebase'

interface ChatProps {
  endpoint: string
}

const Chat: FC<ChatProps> = ({ endpoint }): JSX.Element => {
  // logic
  const SCRIPT_URL = process.env.REACT_APP_GOOGLE_SCRIPT_URL
  const [totalStepList, setTotalStepList] = useState([chatbotFlow[0]])
  const [formData, setFormData] = useState<UserFormDataType | null>(null)
  const [isLastStep, setIsLastStep] = useState(false)

  // gpt
  const [messages, setMessages] = useState<GPTMessageType[]>([])
  const [isMessageLoading, setIsMessageLoading] = useState(false)

  // 진입 경로
  const ref = useRecoilValue(refState)

  const sendMessage = async (userMessage: GPTMessageType): Promise<void> => {
    console.log('userMessage', userMessage)
    setIsMessageLoading(true)
    try {
      const response = await fetch(`${endpoint}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage, messages: [...messages] }),
      })
      // gpt 답변
      const result = await response.json()
      console.log('🚀 ~ result:', result)
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: 'assistant', message: result.data.message },
      ])
    } catch (error) {
      console.error(error)
    }
    // setIsMessageLoading(false)
  }

  const handleNextStep = (nextId: number): void => {
    // 이미 추가된 경우 실행안함
    if (totalStepList.find((step) => step.id === nextId)) return

    const nextItem = chatbotFlow.find((item) => item.id === nextId)
    nextItem && setTotalStepList((prev) => [...prev, nextItem])
  }

  const handleStepClick = (type: string, currentId: number, formData?: UserFormDataType): void => {
    // formData 있는 경우 추가
    formData && setFormData(formData)

    const nextId = chatbotFlow.find((item) => item.id === currentId)?.interaction.nextId
    const isLast = currentId === nextId
    nextId && !isLast && handleNextStep(nextId)
    isLast && setIsLastStep(true)
  }

  const postGoogleSheets = async (formData: UserFormDataType, createAt: number): Promise<void> => {
    if (!SCRIPT_URL) return
    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, createAt, ref }),
      })
      const result = await response.json()
      console.log('구글시트에 데이터 보내기 완료!!', result)
    } catch (error) {
      console.error(error)
    }
  }

  const postFormData = useCallback(
    async (data: UserFormDataType): Promise<void> => {
      console.log('추가 시작!!')
      setIsMessageLoading(true)
      const createAt = Date.now()
      try {
        const res = await addDoc(collection(db, 'info'), {
          ...data,
          ref,
          createAt, // 작성 시간을 밀리초 단위로 저장
        })
        console.log('추가 완료!!', res)
        console.log('챗GPT 요청')

        // TODO: GPT 요청
        const { name, contact, monthlyRevenue, businessType, address, mainProduct, etc } = data
        const userMessage: GPTMessageType = {
          id: createAt,
          role: 'user',
          message: `1. **이름**: ${name}
2. **연락처**:  ${contact}
3. **매출(월)**:  ${monthlyRevenue}
4. **업종**:  ${businessType}
5. **주소**:  ${address}
6. **주요상품**:  ${mainProduct}
7. **의견**:  ${etc}`,
        }
        await sendMessage(userMessage)
      } catch (e) {
        console.error(e)
      } finally {
        // setIsMessageLoading(false)
      }
    },
    [ref],
  )

  useEffect(() => {
    if (!isLastStep || !formData) return
    // 마지막 flow이면서 입력값이 있을때
    // 파이어베이스에 데이터 추가
    postFormData(formData)

    // TODO: 구글시트에 추가
  }, [isLastStep, formData, postFormData])

  useEffect(() => {
    console.log('🚀 ~ isMessageLoading:', isMessageLoading)
  }, [isMessageLoading])

  // view
  return (
    <div className="w-full h-full break-keep overflow-auto">
      {/* START:헤더 영역 */}
      <header className="bg-ai-purple-500 text-center py-5 fixed top-0 left-0 right-0">
        <span className="text-4xl text-ai-mint-500">AI 마케팅 진단</span>
      </header>
      {/* END:헤더 영역 */}
      {/* START:채팅 영역 */}
      <main className="pt-20 h-full">
        <div className="h-full overflow-auto">
          <MessageBox
            flowList={totalStepList}
            isLastStep={isLastStep}
            isLoading={isMessageLoading}
            onNext={handleStepClick}
          />
        </div>
      </main>
      {/* END:채팅 영역 */}
    </div>
  )
}

export default Chat
