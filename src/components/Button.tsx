import React, { FC } from 'react'

interface ButtonProps {
  text: string
  color: string
  onClick: () => void
}

const Button: FC<ButtonProps> = ({ text, color, onClick }): JSX.Element => {
  // logic

  // view
  return (
    <div className="mt-auto py-12 w-full flex justify-center">
      <button
        className={`w-full py-4 px-1 block ${color} rounded-3xl text-white text-sm font-medium`}
        type="button"
        onClick={onClick}>
        {text || 'Get started'}
      </button>
    </div>
  )
}

export default Button
