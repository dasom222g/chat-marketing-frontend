import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Chat from './pages/Chat'
import { RecoilRoot } from 'recoil'

const App = (): JSX.Element => {
  // logic
  const endpoint = process.env.REACT_APP_SERVER_ADDRESS

  // view
  return (
    <RecoilRoot>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat endpoint={endpoint || ''} />} />
      </Routes>
    </RecoilRoot>
  )
}

export default App
