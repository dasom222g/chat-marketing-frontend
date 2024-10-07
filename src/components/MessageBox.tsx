import React, { FC, useEffect, useRef, useState } from 'react'
import { ChatbotFlowType, UserFormDataType } from '../lib/types'
import { PulseLoader } from 'react-spinners'
import { initialFormData } from '../data/initialData'

interface MessageBoxProps {
  flowList: ChatbotFlowType[]
  isLoading: boolean
  onNext: (type: string, id: number, formData?: UserFormDataType) => void
}

const MessageBox: FC<MessageBoxProps> = ({ flowList, isLoading, onNext }): JSX.Element => {
  // logic
  const ref = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState<UserFormDataType>(initialFormData)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>, type: string, id: number): void => {
    e.preventDefault()
    onNext(type, id, formData)
  }

  useEffect(() => {
    // 자동 스크롤
    if (!flowList) return
    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    })
  }, [flowList])

  useEffect(() => {
    // console.log('formData', formData)
  }, [formData])

  // view
  return (
    <>
      {flowList.map((step, index) => (
        <div className="px-4" key={index}>
          <div className="py-4 max-w-3/4 flex">
            <div className="min-w-12 w-12 max h-12 bg-chef-green-500 rounded-full overflow-hidden">
              <img src={'./images/hero.png'} alt="chef" />
            </div>
            <div className="pl-1">
              {/* <span className="text-base font-medium">{name}</span> */}
              <div className="pt-3">
                <div className="px-4 py-3 rounded-xl rounded-tl-none bg-ai-mint-400 flex flex-col gap-2">
                  <span className="inline-block text-sm  text-left bg-chef-gray-100 whitespace-pre-wrap">
                    {step.message}
                  </span>
                  {step.interaction.type === 'button' ? (
                    /* START: 버튼영역 */
                    <button
                      type="button"
                      className="block w-full bg-ai-purple-500 text-white rounded-xl p-1"
                      onClick={() => onNext(step.interaction.type, step.id)}>
                      네!
                    </button>
                  ) : (
                    <form
                      className="bg-white px-2 py-4 rounded-xl flex flex-col gap-4"
                      onSubmit={(e) => handleSubmit(e, step.interaction.type, step.id)}>
                      {step.interaction.fields.map((field, index) => (
                        <div key={index}>
                          <label htmlFor={field.key} className="block pb-1">
                            {field.label}
                          </label>
                          {step.interaction.type === 'input' ? (
                            <input
                              id={field.key}
                              type={field.type}
                              name={field.key}
                              value={formData[field.key] || ''}
                              required={true}
                              disabled={step.id !== flowList[flowList.length - 1].id}
                              className="border border-ai-gray-200 rounded-md p-2 disabled:bg-ai-gray-10 disabled:opacity-40"
                              placeholder={field.placeholder}
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                              }
                            />
                          ) : (
                            <textarea
                              id={field.key}
                              name={field.key}
                              value={formData[field.key] || ''}
                              placeholder={field.placeholder}
                              rows={10}
                              disabled={step.id !== flowList[flowList.length - 1].id}
                              className="w-full border border-ai-gray-200 rounded-md p-2 disabled:bg-ai-gray-10 disabled:opacity-40 resize-none"
                              onChange={(e) =>
                                setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                              }
                            />
                          )}
                        </div>
                      ))}
                      <button
                        type="submit"
                        className="block w-fit bg-ai-purple-500 text-white rounded-lg py-1 px-6 ml-auto">
                        다음
                      </button>
                    </form>
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
