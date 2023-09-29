import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserInfo from './pages/UserInfo'
import Home from './pages/Home'
import PartnerInfo from './pages/PartnerInfo'
import Chat from './pages/Chat'
import { InfoType } from './lib/types'

const App = (): JSX.Element => {
  // logic
  const endpoint = process.env.REACT_APP_SERVER_ADDRESS

  const [infoList, setInfoList] = useState<InfoType[]>([])

  const addInfo = (data: InfoType): void => {
    const duplicateIndex = infoList.findIndex((info) => info.type === data.type)
    const resultList =
      duplicateIndex < 0
        ? [...infoList, data]
        : infoList.map((prev, index) => (duplicateIndex === index ? data : prev))
    setInfoList(resultList)
  }

  // view
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-info" element={<UserInfo addInfo={addInfo} />} />
      <Route path="/partner-info" element={<PartnerInfo addInfo={addInfo} />} />
      <Route path="/chat" element={<Chat infoList={infoList} endpoint={endpoint || ''} />} />
    </Routes>
  )
}

export default App
