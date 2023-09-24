import React, { FC } from 'react'
import { MessageType } from '../lib/types'

interface MessageBoxProps {
  messages: MessageType[]
}

const MessageBox: FC<MessageBoxProps> = ({ messages }): JSX.Element => {
  return (
    <>
      {messages.map((data) => (
        <>
          {data.role === 'user' ? (
            // user 채팅
            <div className="py-4 max-w-3/4 ml-auto text-right">
              <span className="inline-block px-4 py-3 text-sm rounded-xl text-left bg-date-blue-600 text-white rounded-tr-none">
                {data.content}
              </span>
              <span className="block text-right text-date-gray-400 text-xs mt-2 px-2">
                09:25 AM
              </span>
            </div>
          ) : (
            // assistant 채팅
            <div className="py-4 max-w-3/4 flex">
              <div className="w-10 h-10 bg-date-blue-500 rounded-full">
                <img src="./images/female.svg" alt="" />
              </div>
              <div className="pl-3">
                <span className="text-base font-medium">홍길동</span>
                <div className="pt-3 pl-2">
                  <span className="inline-block px-4 py-3 text-sm rounded-xl text-left bg-date-gray-100 rounded-tl-none">
                    {data.content}
                  </span>
                  <span className="block text-right text-date-gray-400 text-xs mt-2 px-2">
                    09:25 AM
                  </span>
                </div>
              </div>
            </div>
          )}
        </>
      ))}
    </>
  )
}

export default MessageBox
