// import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InfoGender from '../components/InfoGender'
import InfoInput from '../components/InfoInput'
import PrevButton from '../components/PrevButton'
import Title from '../components/Title'
import { genders, infoContents } from '../data/response'

const UserInfo = (): JSX.Element => {
  // logic
  const history = useNavigate()

  const handleClick = (): void => {
    history('/partner-info')
  }

  // view
  return (
    <div className="w-full h-full px-6 pt-10 break-keep overflow-auto">
      <i className="w-168 h-168 rounded-full bg-date-pink-500 fixed -z-10 -left-60 -top-104"></i>
      {/* START:뒤로가기 버튼 */}
      <PrevButton />
      {/* END:뒤로가기 버튼 */}
      <div className="h-full flex flex-col">
        <Title mainTitle="당신을 알려주세요" />
        {/* START:info 영역 */}
        <form className="pt-20">
          {/* START:성별 체크 */}
          <InfoGender genders={genders} />
          {/* END:성별 체크 */}
          {/* START:input 영역 */}
          <div>
            {infoContents.map((content) => (
              <InfoInput key={content.id} content={content} />
            ))}
          </div>
          {/* END:input 영역 */}
        </form>
        {/* END:info 영역 */}

        {/* START:Button 영역 */}
        <Button text="Next" onClick={handleClick} />
        {/* END:Button 영역 */}
      </div>
    </div>
  )
}

export default UserInfo
