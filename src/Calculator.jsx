import React, {useState} from 'react'
import { evaluate } from 'mathjs'

const Calculator = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(0)
  const [lastActionEquals, setLastActionEquals] = useState(false)

  const fakeinput = "1 + 2; alert('Hacked!')";


  const handleNumberClick = (number) => {
    if (lastActionEquals) {
      setInput(number.toString())
      setLastActionEquals(false)
    }else {
      setInput(input + number.toString())
    }
  }
  const handleOperatorClick = (operator) => {
    // if (lastActionEquals) {
    //   setInput(result + operator)
    // }else {
    //   setInput(input + operator)
    // }
    setInput((prevInput) => prevInput + operator);
    setLastActionEquals(false);
  }
  const handleEqualClick = () => {
    try {
      
      const evaluatedResult = evaluate(input);
      setResult(evaluatedResult);
      setInput(evaluatedResult.toString())
      setLastActionEquals(true)
    } catch (error) {
      setInput("Error")
      setLastActionEquals(true)
    }
  }
  const handleClear = () => {
    setInput('');
    setResult(0);
    setLastActionEquals(false);
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-80 p-4 bg-white rounded-lg shadow-md'>
        <div className='text-right bg-gray-200 text-xl p-2 mb-4 rounded-md'>{input || result}</div>
      
        <div className='grid grid-cols-4 gap-2'>
          <button 
            className='col-span-2 bg-red-500 text-white rounded p-2'
            onClick={handleClear}
          >
            C
          </button>
          <button 
            className='operatorButton'
            onClick={() => handleOperatorClick('/')}
          >
            ÷
          </button>
          <button 
            className='operatorButton'
            onClick={() => handleOperatorClick('*')}
          >
            ×
          </button>
          {[7,8,9].map((num)=>(
            <button 
              key={num}
              className='numberButton'
              onClick={()=>handleNumberClick(num)}
            >
              {num}
            </button>
          ))}
          <button 
            className='operatorButton'
            onClick={() => handleOperatorClick('-')}
          >
            -
          </button>
          {[4,5,6].map((num)=>(
            <button 
              key={num}
              className='numberButton'
              onClick={()=>handleNumberClick(num)}
            >
              {num}
            </button>
          ))}
          <button 
            className='operatorButton'
            onClick={() => handleOperatorClick('+')}
          >
            +
          </button>
          {[1,2,3].map((num)=>(
            <button 
             key={num}
              className='numberButton'
              onClick={()=>handleNumberClick(num)}
            >
              {num}
            </button>
          ))}
          <button 
            className='row-span-2 bg-green-500 text-white rounded p-2'
            onClick={handleEqualClick}
          >
            =
          </button>

          <button 
            className='numberButton'
            onClick={()=>handleNumberClick(0)}
          >
            0
          </button>
          <button 
            className='numberButton'
            onClick={()=>handleNumberClick('.')}
          >
            .
          </button>
        </div>
      </div>
    </div>
  )
}

export default Calculator