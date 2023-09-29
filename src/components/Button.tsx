import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'

interface ButtonProps {
  text: string
  onClick: () => void
}

const Button: FC<ButtonProps> = ({ text, onClick }): JSX.Element => {
  // logic
  const location = useLocation()

  // view
  return (
    <div className="mt-auto py-12 w-full flex justify-center">
      <button
        className={`w-full py-4 px-1 block ${
          location.pathname === '/partner-info' ? 'bg-date-blue-700' : 'bg-date-pink-700'
        } rounded-3xl text-white text-sm font-medium`}
        type="button"
        onClick={onClick}>
        {text || 'Get started'}
      </button>
    </div>
  )
}

export default Button
