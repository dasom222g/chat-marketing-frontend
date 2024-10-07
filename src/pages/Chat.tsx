import React, { FC, useCallback, useEffect, useState } from 'react'
import MessageBox from '../components/MessageBox'
import PrevButton from '../components/PrevButton'
import { MessageType } from '../lib/types'

interface ChatProps {
  endpoint: string
}

const Chat: FC<ChatProps> = ({ endpoint }): JSX.Element => {
  // logic

  const [value, setValue] = useState('')
  const [infoMessages, setInfoMessages] = useState<MessageType[]>([])
  const [messages, setMessages] = useState<MessageType[]>([])
  const [isMessageLoading, setIsMessageLoading] = useState(false)

  const hadleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target
    setValue(value)
  }

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
          <MessageBox messages={messages} name={'맛있는 쉐프'} isLoading={isMessageLoading} />
        </div>
      </main>
      {/* END:채팅 영역 */}
    </div>
  )
}

export default Chat
