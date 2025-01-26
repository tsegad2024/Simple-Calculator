import React, {useState, useEffect} from 'react'
import { evaluate } from 'mathjs'

const Calculator = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(0)
  const [lastActionEquals, setLastActionEquals] = useState(false)

  const handleButtonClick = (value) =>{
    if (value === "C"){
        setInput("")
        setResult("")
        setLastActionEquals(false)
    } else if (value === "DEL"){
        setInput(input.slice(0, -1))
        setLastActionEquals(false)
    } else if (value === "="){
        try {
            const evaluatedResult = evaluate(input);
            setResult(evaluatedResult)
            setInput(evaluatedResult.toString())
            setLastActionEquals(true)
        } catch (error) {
            setResult(Error)
            setLastActionEquals(true)
        }
    } else {
        if (lastActionEquals){
            setInput(value.toString())
            setLastActionEquals(false)
        } else {
            setInput((prev) => prev +value)
        }
        
    }
  }

//   Handle keypress events
  const handleKeyDown = (e) => {
    const key = e.key;

    if (
        /[0-9+\-*/.]/.test(key) || // Numbers and operators
        key === "Enter" || //Equals
        key === "Backspace" || // Delete Last character
        key === "Escape" // Clear all
    ){
        e.preventDefault();

        if (/[0-9+\-*/.]/.test(key)){
            setInput((prev) => prev + key)
        } else if (key === "Enter"){
            handleButtonClick("=")
        } else if (key === "Backspace"){
            handleButtonClick("DEL")
        } else if (key === "Escape"){
            handleButtonClick("C")
        }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)

    return () => {
        window.removeEventListener("keydown", handleKeyDown)
    }
  }, [input]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-80 p-4 bg-white rounded-lg shadow-md'>
        <div className='text-right bg-gray-200 text-xl p-2 mb-4 rounded-md'>{input || "0"}</div>
      
        <div className='grid grid-cols-4 gap-2'>
        {["DEL", "C", "/","7", "8", "9", "*","4", "5", "6", "-", "1", "2", "3","+", "0", ".", "="].map((btn) => (
            <button
                key={btn}
                onClick={()=>handleButtonClick(btn)}
                className={`bg-gray-300 p-4 text-xl rounded  shadow hover:bg-gray-400 ${
                    btn === "=" ? "col-span-2 bg-blue-400 text-white" : btn === "DEL" ?"col-span-2":""
                }`}
                >
                    {btn}
            </button>
        ))}
        
        </div>
      </div>
    </div>
  )
}

export default Calculator