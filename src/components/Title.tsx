import React, { FC } from 'react'

interface TitleProps {
  mainTitle: string
  subTitle?: string
}

const Title: FC<TitleProps> = ({ mainTitle, subTitle }): JSX.Element => {
  return (
    <div className="px-2 pt-6">
      <h1 className="text-4.5xl font-black text-white max-w-3/4">{mainTitle}</h1>
      {subTitle && (
        <span className="block text-sm mt-3 text-white break-keep pr-7">{subTitle}</span>
      )}
    </div>
  )
}

export default Title
