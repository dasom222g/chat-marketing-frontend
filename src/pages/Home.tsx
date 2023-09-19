import React from 'react'
import Button from '../components/Button'
import Title from '../components/Title'
import { useNavigate } from 'react-router-dom'

const Home = (): JSX.Element => {
  // logic
  const history = useNavigate()

  const handleClick = (): void => {
    console.log('Click')
    history('/user-info')
  }

  // view
  return (
    <div className="w-full h-full px-6 break-keep overflow-auto">
      <i className="w-168 h-168 rounded-full bg-date-pink-500 fixed -z-10 -left-60 -top-56"></i>
      <div className="fixed left-0 top-1/2 transform -translate-y-1/2 -z-10">
        <img src="./images/hero.png" alt="hero" />
      </div>
      <div className="h-full flex flex-col">
        <Title
          mainTitle={'소개팅 1초전'}
          subTitle="소개팅 전, 어떤 얘기를 해야되나 고민되시나요? 미리 연습하고 가보세요!"
        />
        <Button onClick={handleClick} />
      </div>
    </div>
  )
}

export default Home
