import React, {useState, useEffect} from 'react'
import { evaluate } from 'mathjs'

const Calculator = () => {
  const [input, setInput] = useState('')
  const [result, setResult] = useState(0)
  const [lastActionEquals, setLastActionEquals] = useState(false)

  const [history, setHistory] = useState([])

  const handleButtonClick = (value) =>{
    const operators = ["+", "-", "*", "/"]

    if (value === "C"){
        setInput("")
        setResult("")
        setLastActionEquals(false)
    } else if (value === "DEL"){
        setInput(input.slice(0, -1))
        setLastActionEquals(false)
    } else if (value === "="){
        try {
            try {
                let sanitizedInput = input;

                if (operators.includes(sanitizedInput.slice(-1))) {
                    const lastNumberMatch = sanitizedInput.match(/(\d+)(?=[\+\-\*\/]?$)/);
                    if (lastNumberMatch) {
                        const lastNumber = lastNumberMatch[1]; // Extract the last number
                        sanitizedInput += lastNumber; // Append the last number after the operator
                    }
                }
                
                if(sanitizedInput){
                    const evaluatedResult = evaluate(sanitizedInput);
                    console.log(evaluatedResult)

                    setResult(evaluatedResult)
                    setInput(evaluatedResult.toString())
                    setLastActionEquals(true)

                    setHistory((prev) => [
                        ...prev.slice(-9),  // Keep only the last 9 entries
                        {input: sanitizedInput, result: evaluatedResult}
                    ])
                }
                
            } catch (error) {
                setResult(Error)
                setLastActionEquals(true)
            }
            
        } catch (error) {
            setResult(Error)
            setLastActionEquals(true)
        }
    } else {
        if (lastActionEquals){
            setInput(value.toString())
            setLastActionEquals(false)
        } else {
            //Prevent consecutive operators
            if(operators.includes(value)){
                if (operators.includes(input.slice(-1))) {
                    setInput((prev) => prev.slice(0, -1) + value); // Replace the last operator
                } else {
                    setInput((prev) => prev + value)
                }
            } else {
                setInput((prev) => prev +value)
            }
            
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
    <div className='flex flex-row items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-80 p-4 bg-white rounded-lg shadow-md max-h-100'>
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
      <div className='mt-2 px-2 bg-gray-100 rounded-lg shadow-lg max-h-100 overflow-y-auto '>
        <h2 className='text-lg font-bold mb-2 '>History</h2>
        {history.length === 0 ? (
            <p className='text-gray-500'>No history yet</p>
        ): (
            <ul
                className='space-y-2'
            >{history.map((item, index) => (
                <li 
                    key={index} 
                    className='flex justify-between text-sm'
                >
                    <span>{item.input}</span>
                    <span> = </span>
                    <span>{item.result}</span>
                </li>
            ))}</ul>
        )}
        <button
            onClick={() => setHistory([])}
            className='mt-2 px-4 py-2 bg-red-500 text-white text-sm rounded shadow hover:bg-red-600'
        >
            Clear History
        </button>
      </div>
    </div>
  )
}

export default Calculator