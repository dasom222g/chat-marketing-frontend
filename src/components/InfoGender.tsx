import React, { FC, useEffect, useState } from 'react'
import { InfoGenderType } from '../lib/types'

interface InfoGenderProps {
  items: InfoGenderType[]
  defaultCheckedData: InfoGenderType
  onChange: (data: InfoGenderType) => void
}

const InfoGender: FC<InfoGenderProps> = ({ items, defaultCheckedData, onChange }): JSX.Element => {
  // logic

  const [value, setValue] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const data = event.target.value
    const selectedData = items.find((gender) => gender.type === data)
    setValue(data)
    selectedData && onChange(selectedData)
  }

  useEffect(() => {
    setValue(defaultCheckedData.type)
  }, [defaultCheckedData])

  // views
  return (
    <div className="flex py-8">
      {items.map((gender) => (
        <div key={gender.id} className="w-full text-center">
          <label htmlFor={gender.type} className="peer-checked:bg-red-500">
            <input
              id={gender.type}
              type="radio"
              name="gender"
              value={gender.type}
              checked={value === gender.type}
              className="hidden peer"
              onChange={handleChange}
            />
            <div className="pb-4 grayscale peer-checked:grayscale-0">
              <img
                src={`./images/${gender.type}.svg`}
                alt={gender.type}
                className="block w-3/5 mx-auto"
              />
            </div>
            <span className="w-5 h-5 inline-block align-middle rounded bg-date-gray-200 peer-checked:bg-date-blue-500">
              <i className="block w-full h-full bg-[url('../public/images/check.svg')] bg-no-repeat bg-center"></i>
            </span>
            <span className="inline-block align-middle px-2">{gender.text}</span>
          </label>
        </div>
      ))}
    </div>
  )
}

export default InfoGender
