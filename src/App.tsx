import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import UserInfo from './pages/UserInfo'
import Home from './pages/Home'
import Chat from './pages/Chat'
import { InfoCategoryType, InfoType } from './lib/types'
import { initialUserInfo } from './data/initialData'

const App = (): JSX.Element => {
  // logic
  const endpoint = process.env.REACT_APP_SERVER_ADDRESS

  const [userInfo, setUserInfo] = useState<InfoType>(initialUserInfo)
  const [partnerInfo, setPartnerInfo] = useState<InfoType>(initialUserInfo)

  const addInfo = (data: InfoType, type: InfoCategoryType): void => {
    // const duplicateIndex = infoList.findIndex((info) => info.type === data.type)
    // const resultList =
    //   duplicateIndex < 0
    //     ? [...infoList, data]
    //     : infoList.map((prev, index) => (duplicateIndex === index ? data : prev))
    // setInfoList(resultList)

    type === 'user' ? setUserInfo(data) : setPartnerInfo(data)
  }

  // view
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/user-info"
        element={<UserInfo addInfo={(data: InfoType) => addInfo(data, 'user')} />}
      />
      <Route
        path="/chat"
        element={<Chat userInfo={userInfo} partnerInfo={partnerInfo} endpoint={endpoint || ''} />}
      />
    </Routes>
  )
}

export default App
