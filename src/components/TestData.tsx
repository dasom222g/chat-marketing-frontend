import React from 'react'

const TestData = (): JSX.Element => {
  // logic
  const endpoint = process.env.REACT_APP_SERVER_ADDRESS
  const getData = async (): Promise<void> => {
    const response = await fetch(`${endpoint}/data`)
    const result = await response.json()
    console.log('result==>', result)
  }

  const postData = async (): Promise<void> => {
    const requestData = {
      message: '안녕? 뭐하고 있어?',
    }
    const request = await fetch(`${endpoint}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    })
    const response = await request.json()
    console.log('response==>', response)
  }

  // view

  return (
    <div>
      <button type="button" className="block bg-slate-400 p-1 rounded-lg" onClick={getData}>
        getData
      </button>
      <button type="button" className="block bg-slate-400 p-1 rounded-lg" onClick={postData}>
        postData
      </button>
    </div>
  )
}

export default TestData
