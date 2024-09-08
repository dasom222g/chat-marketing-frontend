// import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InfoInput from '../components/InfoInput'
import PrevButton from '../components/PrevButton'
import Title from '../components/Title'
import { infoContents } from '../data/response'
import { InfoContentType, InfoType } from '../lib/types'
import { FC, useState } from 'react'
import { initialUserInfo } from '../data/initialData'

interface UserInfoProps {
  addInfo: (info: InfoType) => void
}

const UserInfo: FC<UserInfoProps> = ({ addInfo }): JSX.Element => {
  // logic
  const history = useNavigate()

  const [userInfo, setUserInfo] = useState<InfoType>(initialUserInfo)

  const handleNext = (): void => {
    addInfo(userInfo)
    history('/partner-info')
  }

  const handleInfoContentData = (data: InfoContentType): void => {
    const { label, value } = data
    const result = { ...userInfo, [label]: value }
    setUserInfo(result)
  }

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-168 h-168 rounded-full bg-chef-green-500 fixed -z-10 -left-60 -top-104"></i>
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        <Title mainTitle="당신의 냉장고를 알려주세요" />
        {/* START:info 영역 */}
        <form className="pt-20">
          {/* START:input 영역 */}
          <div>
            {infoContents.map((content) => (
              <InfoInput key={content.id} content={content} onChange={handleInfoContentData} />
            ))}
          </div>
          {/* END:input 영역 */}
        </form>
        {/* END:info 영역 */}

        {/* START:Button 영역 */}
        <Button text="Next" color="bg-chef-green-500" onClick={handleNext} />
        {/* END:Button 영역 */}
      </div>
    </div>
  )
}

export default UserInfo
