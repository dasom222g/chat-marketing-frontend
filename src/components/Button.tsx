import React, { FC } from 'react'

interface ButtonProps {
  onClick: () => void
}

const Button: FC<ButtonProps> = ({ onClick }): JSX.Element => {
  return (
    <div className="mt-auto py-12 w-full flex justify-center">
      <button
        className="w-full py-4 px-1 block bg-date-pink-700 rounded-3xl text-white text-sm font-medium"
        type="button"
        onClick={onClick}>
        Get started
      </button>
    </div>
  )
}

export default Button
