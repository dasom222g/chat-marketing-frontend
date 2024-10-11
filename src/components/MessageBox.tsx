import React, { FC, useEffect, useRef, useState } from 'react'
import { ChatbotFlowType, GPTMessageType, UserFormDataType } from '../lib/types'
import { PulseLoader } from 'react-spinners'
import FormField from './FormField'
import { initialFormData } from '../data/initialData'

interface BaseProps {
  isLoading: boolean
  isLastStep: boolean
  onNext: (type: string, id: number, formData?: UserFormDataType) => void
}

interface FlowProps extends BaseProps {
  flowList: ChatbotFlowType[]
  gptMessgeList?: never // 어떤값도 할당하지 않음
}

interface GPTProps extends BaseProps {
  flowList?: never // 어떤값도 할당하지 않음
  gptMessgeList: GPTMessageType[]
}

type MessageBoxProps = FlowProps | GPTProps

const MessageBox: FC<MessageBoxProps> = ({
  flowList,
  gptMessgeList,
  isLastStep,
  isLoading,
  onNext,
}): JSX.Element => {
  // logic
  const ref = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<UserFormDataType>(initialFormData)

  const list = flowList || gptMessgeList

  const handleNext = (type: string, id: number, userFormData?: Record<string, string>): void => {
    if (userFormData) {
      // 사용자 입력값이 있는경우
      const resultData = { ...formData, ...userFormData }
      setFormData(resultData)
      onNext(type, id, resultData)

      return
    }
    // 사용자 입력값이 없는경우
    onNext(type, id)
  }

  useEffect(() => {
    // 자동 스크롤
    if (!list) return
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [list, isLoading])

  // view
  return (
    <>
      {list.map((item) => (
        <div className="px-4" key={item.id}>
          <div className="py-4 max-w-3/4 flex">
            <div className="min-w-12 w-12 max h-12 bg-chef-green-500 rounded-full overflow-hidden">
              <img src={'./images/hero.png'} alt="chef" />
            </div>
            <div className="pl-1">
              {/* <span className="text-base font-medium">{name}</span> */}
              <div className="pt-3">
                <div className="px-4 py-3 rounded-xl rounded-tl-none bg-ai-mint-400 flex flex-col gap-2">
                  <span className="inline-block text-sm  text-left bg-chef-gray-100 whitespace-pre-wrap">
                    {item.message}
                  </span>
                  {/* in연산자: 지정된 속성이 해당 객체에 존재하는지 확인 */}
                  {'interaction' in item && (
                    <FormField
                      id={item.id}
                      interaction={item.interaction}
                      disabled={item.id !== list[list.length - 1].id || isLastStep}
                      onNext={handleNext}
                    />
                  )}

                  {/* END: 버튼영역 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {isLoading && (
        <div className="px-4">
          <div className="py-4 max-w-3/4 flex">
            <div className="min-w-12 w-12 max h-12 bg-chef-green-500 rounded-full overflow-hidden">
              <img src={'./images/hero.png'} alt="" />
            </div>
            <div className="pl-1">
              {/* <span className="text-base font-medium">{name}</span> */}
              <div className="pt-3">
                <span className="inline-block px-4 py-3 text-sm rounded-xl text-left bg-chef-gray-100 rounded-tl-none bg-ai-mint-400 whitespace-pre-wrap">
                  {/* {data.content} */}
                  <PulseLoader size={5} color="#46A195" />
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <div>{isLoading}</div> */}
      <div ref={ref} />
    </>
  )
}

export default MessageBox
