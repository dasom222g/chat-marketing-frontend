import React from 'react'

const Chat = (): JSX.Element => {
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <div className="h-full flex flex-col">
        {/* 헤더 영역 */}
        <div className="pb-4">
          <span className="block text-2xl text-center">홍길동</span>
        </div>
        {/* 헤더 영역 */}
        {/* 채팅 영역 */}
        <div className="overflow-auto">
          {/* user 채팅 */}
          <div className="py-4 max-w-3/4 ml-auto text-right">
            <span className="inline-block px-4 py-3 text-sm rounded-xl text-left bg-date-blue-600 text-white rounded-tr-none">
              Hello
            </span>
            <span className="block text-right text-date-gray-400 text-xs mt-2 px-2">09:25 AM</span>
          </div>
          {/* user 채팅 */}
          {/* assistant 채팅 */}
          <div className="py-4 max-w-3/4 flex">
            <div className="w-10 h-10 bg-date-blue-500 rounded-full">
              <img src="./images/female.svg" alt="" />
            </div>
            <div className="pl-3">
              <span className="text-base font-medium">홍길동</span>
              <div className="pt-3 pl-2">
                <span className="inline-block px-4 py-3 text-sm rounded-xl text-left bg-date-gray-100 rounded-tl-none">
                  Hello ! Nazrul How are you?
                </span>
                <span className="block text-right text-date-gray-400 text-xs mt-2 px-2">
                  09:25 AM
                </span>
              </div>
            </div>
          </div>
          {/* assistant 채팅 */}
        </div>
        {/* 채팅 영역 */}
        {/* 메시지 입력 영역 */}
        <div className="mt-auto flex py-5 -mx-2 border-t border-gray-100">
          <div className="w-full px-2">
            <input className="w-full h-10 block rounded-xl bg-gray-100" type="text" />
          </div>
          <button
            type="button"
            className="w-10 h-10 inline-block rounded-full bg-date-blue-600 text-none px-2">
            보내기
          </button>
        </div>
        {/* 메시지 입력 영역 */}
      </div>
    </div>
  )
}

export default Chat
