// import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import InfoInput from '../components/InfoInput'
import PrevButton from '../components/PrevButton'
import Title from '../components/Title'
import { InfoType, IngredientType } from '../lib/types'
import { FC, useState } from 'react'
import AddButton from '../components/AddButton'

interface UserInfoProps {
  addInfo: (info: InfoType) => void
}

const UserInfo: FC<UserInfoProps> = ({ addInfo }): JSX.Element => {
  // logic
  const history = useNavigate()

  const [ingredientList, setIngredientList] = useState<IngredientType[]>([])

  const addIngredient = (): void => {
    const id = Number(Date.now().toString())
    const newIngredient: IngredientType = {
      id,
      label: `ingredient${id}`,
      text: '재료명',
      value: '',
    }
    setIngredientList((prev) => [...prev, newIngredient])
  }

  const handleNext = (): void => {
    // addInfo(userInfo)
    const filterDataList = ingredientList.filter((item) => item.value.trim() !== '')
    filterDataList.length ? history('/chat') : alert('재료명을 1개이상 입력해주세요')
  }

  const handleChangeData = (data: IngredientType): void => {
    console.log('data', data)
    setIngredientList((prev) => prev.map((item) => (item.id === data.id ? data : item)))
  }

  const hanldeRemove = (id: number): void => {
    setIngredientList((prev) => prev.filter((item) => item.id !== id))
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
        {/* START:form 영역 */}
        <div className="mt-20 overflow-auto">
          <form>
            {/* START:input 영역 */}
            <div>
              {ingredientList.map((item) => (
                <InfoInput
                  key={item.id}
                  content={item}
                  onChange={handleChangeData}
                  onRemove={hanldeRemove}
                />
              ))}
            </div>
            {/* END:input 영역 */}
          </form>
        </div>
        {/* END:form 영역 */}
        {/* START:Add button 영역 */}
        <AddButton onClick={addIngredient} />
        {/* END:Add button 영역 */}
        {/* START:Button 영역 */}
        <Button text="Next" color="bg-chef-green-500" onClick={handleNext} />
        {/* END:Button 영역 */}
      </div>
    </div>
  )
}

export default UserInfo
