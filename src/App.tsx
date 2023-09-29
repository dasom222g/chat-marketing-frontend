import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserInfo from './pages/UserInfo'
import Home from './pages/Home'
import PartnerInfo from './pages/PartnerInfo'
import Chat from './pages/Chat'
import { InfoType } from './lib/types'

const App = (): JSX.Element => {
  const [infoList, setInfoList] = useState<InfoType[]>([])
  // logic
  const addInfo = (data: InfoType): void => {
    const duplicateIndex = infoList.findIndex((info) => info.type === data.type)
    const resultList =
      duplicateIndex < 0
        ? [...infoList, data]
        : infoList.map((prev, index) => (duplicateIndex === index ? data : prev))
    setInfoList(resultList)
  }

  useEffect(() => {
    console.log('infoList', infoList)
  }, [infoList])

  // view
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-info" element={<UserInfo addInfo={addInfo} />} />
      <Route path="/partner-info" element={<PartnerInfo addInfo={addInfo} />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  )
}

export default App
