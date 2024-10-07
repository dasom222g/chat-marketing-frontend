import React from 'react'
import { Link } from 'react-router-dom'

const Home = (): JSX.Element => {
  // logic

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto bg-ai-purple-500">
      {/* START:타이틀 영역 */}

      <h1 className="text-6xl text-ai-mint-500 text-center">
        <p className="text-3xl">병원 원장님을 위한</p>
        <div className="pt-2">
          AI <br />
          마케팅진단
        </div>
      </h1>
      {/* <Title mainTitle={'AI 마케팅진단'} /> */}
      {/* END:타이틀 영역 */}
      <div className="">
        <img src="./images/hero.png" alt="hero" />
      </div>
      <div className="">
        {/* START:Button 영역 */}
        <Link
          to="/chat"
          className="bg-ai-mint-400 text-ai-orange-500 block px-2 py-4 rounded-xl mx-auto text-center text-4xl shadow-xl w-1/2">
          Start
        </Link>
        {/* END:Button 영역 */}
      </div>
    </div>
  )
}

export default Home
