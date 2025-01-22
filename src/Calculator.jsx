import React, {useState} from 'react'

const Calculator = () => {
    const [display, setDisplay] = useState('')

    const handleClick = (value) => {
        setDisplay(display+value)
    }
    const calculate = () =>{
        try {
            setDisplay(eval(display))
        } catch (error) {
            setDisplay('error')
        }
    }
    const clearDisplay = ()=>{
        setDisplay('');
    }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-6 rounded shadow-md w-80'>{/*Display */} </div>
      <div className='mb-4 bg-gray-200 p-4 text-right text-xl font-mono rounded'>
        {display || '0'}
      </div>
      {/*Buttons */}
      <div className='grid grid-cols-4 gap-2'>
        {/*Number Buttons */}
        {[7, 8, 9,'C', 4, 5, 6,'/', 1, 2, 3,'*','.', 0,'=','-'].map((btn) => (
            <button
            key={btn}
            onClick={()=>(btn === '=' ? calculate(): btn==="C" ?clearDisplay(): handleClick(btn))}
            
            className={`p-4 text-lg rounded ${
                btn === '='
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : btn === 'C'
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              >
                {btn}
            </button>
        ))}
        <button
            onClick={() => handleClick('+')}
            className="p-4 text-lg rounded bg-gray-300 col-span-4 hover:bg-gray-400"
          >
            +
          </button>
      </div>
    </div>
  )
}

export default Calculator
