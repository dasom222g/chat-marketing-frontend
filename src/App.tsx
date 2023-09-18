import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserInfo from './pages/UserInfo'
import Home from './pages/Home'
import PartnerInfo from './pages/PartnerInfo'
import Chat from './pages/Chat'

const App = (): JSX.Element => {
  // logic

  // view
  return (
    <BrowserRouter>
      <div className="color"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-info" element={<UserInfo />} />
        <Route path="/partner-info" element={<PartnerInfo />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
