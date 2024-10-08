import React, { FC, useEffect, useState } from 'react'
import MessageBox from '../components/MessageBox'
import { GPTMessageType, UserFormDataType } from '../lib/types'
import { chatbotFlow } from '../data/response'
import { initialFormData } from '../data/initialData'

interface ChatProps {
  endpoint: string
}

const Chat: FC<ChatProps> = ({ endpoint }): JSX.Element => {
  // logic
  const [totalStepList, setTotalStepList] = useState([chatbotFlow[0]])
  const [formData, setFormData] = useState<UserFormDataType | null>(null)
  const [messages, setMessages] = useState<GPTMessageType[]>([])

  const [value, setValue] = useState('')
  const [infoMessages, setInfoMessages] = useState<GPTMessageType[]>([])
  const [isMessageLoading, setIsMessageLoading] = useState(false)

  const hadleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const userMessage: GPTMessageType = { id: Date.now(), role: 'user', message: value.trim() }
    setMessages((prev) => [...prev, userMessage])
    sendMessage(userMessage)
    setValue('') // input 초기화
  }

  const sendMessage = async (userMessage: GPTMessageType): Promise<void> => {
    setIsMessageLoading(true)
    try {
      const response = await fetch(`${endpoint}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage, messages: [...infoMessages, ...messages] }),
      })
      const result = await response.json()
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), role: 'assistant', message: result.data.message },
      ])
    } catch (error) {
      console.error(error)
    }
    setIsMessageLoading(false)
  }

  const handleNextStep = (nextId: number): void => {
    // 이미 추가된 경우 실행안함
    if (totalStepList.find((step) => step.id === nextId)) return

    const nextItem = chatbotFlow.find((item) => item.id === nextId)
    nextItem && setTotalStepList((prev) => [...prev, nextItem])
  }

  const handleStepClick = (type: string, currentId: number, formData?: UserFormDataType): void => {
    console.log('currentId', currentId)
    // formData 있는 경우 추가
    formData && setFormData(formData)

    const nextId = chatbotFlow.find((item) => item.id === currentId)?.interaction.nextId
    const isLast = currentId === nextId
    nextId && !isLast && handleNextStep(nextId)

    if (isLast) {
      // TODO: GPT 요청
    }
  }

  useEffect(() => {
    if (!formData) return
    // TODO: 데이터 구글시트에 추가 (setDoc)
    console.log('formData', formData)
  }, [formData])

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
          <MessageBox flowList={totalStepList} isLoading={false} onNext={handleStepClick} />
        </div>
      </main>
      {/* END:채팅 영역 */}
    </div>
  )
}

export default Chat
