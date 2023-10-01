import React, { FC, useCallback, useEffect, useState } from 'react'
import MessageBox from '../components/MessageBox'
import PrevButton from '../components/PrevButton'
import { InfoType, MessageType } from '../lib/types'

interface ChatProps {
  userInfo: InfoType
  partnerInfo: InfoType
  endpoint: string
}

const Chat: FC<ChatProps> = ({ userInfo, partnerInfo, endpoint }): JSX.Element => {
  // logic

  const [value, setValue] = useState('')
  const [infoMessages, setInfoMessages] = useState<MessageType[]>([])
  const [messages, setMessages] = useState<MessageType[]>([])

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
    const response = await fetch(`${endpoint}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userMessage, messages: [...infoMessages, ...messages] }),
    })
    const result = await response.json()
    setMessages((prev) => [...prev, { role: 'assistant', content: result.data.content }])
  }

  const sendInfo = useCallback(async (): Promise<void> => {
    // TODO: 로딩 스피너 on
    try {
      const response = await fetch(`${endpoint}/info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userInfo, partnerInfo }),
      })
      const result = await response.json()
      setInfoMessages(result.data)
    } catch (error) {
      console.error(error)
    }
    // TODO: 로딩 스피너 off
  }, [endpoint, partnerInfo, userInfo])

  useEffect(() => {
    sendInfo()
  }, [sendInfo])

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        {/* START:헤더 영역 */}
        <div className="-mx-6 -mt-10 py-7 bg-date-blue-600">
          <span className="block text-xl text-center text-white">{partnerInfo.name}</span>
        </div>
        {/* END:헤더 영역 */}
        {/* START:채팅 영역 */}
        <div className="overflow-auto">
          <MessageBox messages={messages} partnerInfo={partnerInfo} />
        </div>
        {/* END:채팅 영역 */}
        {/* START:메시지 입력 영역 */}
        <div className="mt-auto flex py-5 -mx-2 border-t border-gray-100">
          <form id="sendForm" className="w-full px-2 h-full" onSubmit={hadleSubmit}>
            <input
              className="w-full text-sm px-3 py-2 h-full block rounded-xl bg-gray-100 focus:"
              type="text"
              name="message"
              value={value}
              onChange={hadleChange}
            />
          </form>
          <button
            type="submit"
            form="sendForm"
            className="w-10 min-w-10 h-10 inline-block rounded-full bg-date-blue-600 text-none px-2 bg-[url('../public/images/send.svg')] bg-no-repeat bg-center">
            보내기
          </button>
        </div>
        {/* END:메시지 입력 영역 */}
      </div>
    </div>
  )
}

export default Chat
