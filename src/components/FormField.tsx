import React, { FC, useState } from 'react'
import { Interaction } from '../lib/types'

interface FormFieldProps {
  id: number
  interaction: Interaction
  disabled: boolean
  onNext: (type: string, id: number, formData?: Record<string, string>) => void
}

const FormField: FC<FormFieldProps> = ({ id, interaction, disabled, onNext }) => {
  // logic
  const [formData, setFormData] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    onNext(interaction.type, id, formData)
  }

  // view
  return (
    <>
      {interaction.type === 'button' ? (
        /* START: 버튼영역 */
        <button
          type="button"
          className="block w-full bg-ai-purple-500 text-white rounded-xl p-1 disabled:bg-ai-gray-200"
          disabled={disabled}
          onClick={() => onNext(interaction.type, id)}>
          네!
        </button>
      ) : (
        <form className="bg-white px-2 py-4 rounded-xl flex flex-col gap-4" onSubmit={handleSubmit}>
          {interaction.fields.map((field, index) => (
            <div key={index}>
              <label htmlFor={field.key} className="block pb-1">
                {field.label}
              </label>
              {interaction.type === 'input' ? (
                <input
                  id={field.key}
                  type={field.type}
                  name={field.key}
                  value={formData[field.key] || ''}
                  required={true}
                  disabled={disabled}
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
                  disabled={disabled}
                  className="w-full border border-ai-gray-200 rounded-md p-2 disabled:bg-ai-gray-100 disabled:opacity-40 resize-none"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, [field.key]: e.target.value }))
                  }
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            disabled={disabled}
            className="block w-fit bg-ai-purple-500 text-white rounded-lg py-1 px-6 ml-auto disabled:bg-ai-gray-200">
            다음
          </button>
        </form>
      )}
    </>
  )
}

export default FormField
