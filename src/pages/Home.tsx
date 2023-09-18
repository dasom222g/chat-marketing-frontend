import React from 'react'
import Button from '../components/Button'
import Title from '../components/Title'

const Home = (): JSX.Element => {
  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-168 h-168 rounded-full bg-date-pink-500 fixed -z-10 -left-60 -top-56"></div>
      <div className="fixed top-1/2 transform -translate-y-1/2 -z-10">
        <img src="./images/hero.png" alt="hero" />
      </div>
      <div className="h-full flex flex-col">
        <Title />
        <div className="mt-auto w-full flex justify-center">
          <Button />
        </div>
      </div>
    </div>
  )
}

export default Home
