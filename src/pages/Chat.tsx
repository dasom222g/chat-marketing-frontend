import React, { FC, useState } from 'react'
import MessageBox from '../components/MessageBox'
import { MessageType, UserFormDataType } from '../lib/types'
import { chatbotFlow } from '../data/response'

interface ChatProps {
  endpoint: string
}

const Chat: FC<ChatProps> = ({ endpoint }): JSX.Element => {
  // logic
  const [totalStepList, setTotalStepList] = useState([chatbotFlow[0]])
  const [formData, setFormData] = useState({})

  const [value, setValue] = useState('')
  const [infoMessages, setInfoMessages] = useState<MessageType[]>([])
  const [messages, setMessages] = useState<MessageType[]>([])
  const [isMessageLoading, setIsMessageLoading] = useState(false)

  const hadleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    const userMessage: MessageType = { role: 'user', content: value.trim() }
    setMessages((prev) => [...prev, userMessage])
    sendMessage(userMessage)
    setValue('') // input 초기화
  }

  const sendMessage = async (userMessage: MessageType): Promise<void> => {
    setIsMessageLoading(true)
    try {
      const response = await fetch(`${endpoint}/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage, messages: [...infoMessages, ...messages] }),
      })
      const result = await response.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: result.data.content }])
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
    if (formData) {
      // formData 있는 경우
      setFormData(formData)
    }
    const nextId = chatbotFlow.find((item) => item.id === currentId)?.interaction.nextId
    nextId && handleNextStep(nextId)
  }

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
            name={'AI'}
            isLoading={false}
            onNext={handleStepClick}
          />
        </div>
      </main>
      {/* END:채팅 영역 */}
    </div>
  )
}

export default Chat
