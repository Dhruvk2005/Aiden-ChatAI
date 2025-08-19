import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'


function App() {

  const BASE_URL = import.meta.env.VITE_BASE_URL
  const API_KEY = import.meta.env.VITE_API_KEY

  const [answer, setAnswer] = useState('')
  const [question, setQuestion] = useState('')

  const generateAnswer = async () => {
    setAnswer('Processing...')
    try {
      const response = await axios({
        method: 'post',
        url: `${BASE_URL}?key=${API_KEY}`,
        data: {
          "contents": [
            {
              "parts": [
                {
                  "text": question
                }
              ]
            }
          ]
        }
      })

      console.log('Answer:', response)
      const answers = response.data.candidates[0].content.parts[0].text
      setAnswer(answers)

    }


    catch (err) {
      console.log(err)
    }


  }


  return (
    <>

    <div  >
      <h1>CHAT AI </h1>
      <p> By Dhruv</p>

      
        <input value={question} onChange={(e) => setQuestion(e.target.value)} />
      <textarea className='w-[500px] h-[500px]' value={answer} >

      </textarea>
      <button onClick={generateAnswer} >Generate Answer</button>
      </div>
    </>
  )
}

export default App
