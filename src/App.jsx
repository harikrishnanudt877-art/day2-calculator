
import { useState } from 'react'

function App() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operator, setOperator] = useState(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const handleNumber = (number) => {
    if (waitingForOperand) {
      setDisplay(number)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === '0' ? number : display + number)
    }
  }

  const calculate = (first, second, op) => {
    switch (op) {
      case '+': return first + second
      case '-': return first - second
      case '×': return first * second
      case '÷': return second === 0 ? 'Error' : first / second
      default: return second
    }
  }

  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display)

    if (isNaN(inputValue)) return

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operator && !waitingForOperand) {
      const result = calculate(previousValue, inputValue, operator)

      if (result === 'Error') {
        setDisplay('Error')
        setPreviousValue(null)
        setOperator(null)
        setWaitingForOperand(true)
        return
      }

      setDisplay(String(result))
      setPreviousValue(result)
    }

    setWaitingForOperand(true)
    setOperator(nextOperator)
  }

  const handleEquals = () => {
    if (operator === null || previousValue === null) return

    const result = calculate(
      previousValue,
      parseFloat(display),
      operator
    )

    setDisplay(String(result))
    setPreviousValue(null)
    setOperator(null)
    setWaitingForOperand(true)
  }

  const handleClear = () => {
    setDisplay('0')
    setPreviousValue(null)
    setOperator(null)
    setWaitingForOperand(false)
  }

  const handleDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.')
      setWaitingForOperand(false)
    } else if (!display.includes('.')) {
      setDisplay(display + '.')
    }
  }

  const handleBackspace = () => {
    if (waitingForOperand) return

    setDisplay(
      display.length > 1 ? display.slice(0, -1) : '0'
    )
  }

  const handlePercent = () => {
    if (display === 'Error') return
    setDisplay(String(parseFloat(display) / 100))
  }

  const buttons = [
    { label: 'AC', action: handleClear, style: 'special' },
    { label: '⌫', action: handleBackspace, style: 'special' },
    { label: '%', action: handlePercent, style: 'special' },
    { label: '÷', action: () => handleOperator('÷'), style: 'operator' },

    { label: '7', action: () => handleNumber('7') },
    { label: '8', action: () => handleNumber('8') },
    { label: '9', action: () => handleNumber('9') },
    { label: '×', action: () => handleOperator('×'), style: 'operator' },

    { label: '4', action: () => handleNumber('4') },
    { label: '5', action: () => handleNumber('5') },
    { label: '6', action: () => handleNumber('6') },
    { label: '-', action: () => handleOperator('-'), style: 'operator' },

    { label: '1', action: () => handleNumber('1') },
    { label: '2', action: () => handleNumber('2') },
    { label: '3', action: () => handleNumber('3') },
    { label: '+', action: () => handleOperator('+'), style: 'operator' },

    { label: '0', action: () => handleNumber('0'), style: 'zero' },
    { label: '.', action: handleDecimal },
    { label: '=', action: handleEquals, style: 'equals' },
  ]

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-indigo-950 to-slate-900 flex items-center justify-center p-5">

      <div className="w-full max-w-sm rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">

        <div className="mb-7 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Calculator
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Simple calculations, beautifully done
            </p>
          </div>

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/20 text-2xl">
            🧮
          </div>
        </div>

        <div className="mb-5 flex min-h-32 flex-col items-end justify-end overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 p-5">

          <p className="mb-2 text-sm text-slate-400">
            {previousValue !== null
              ? `${previousValue} ${operator || ''}`
              : 'Ready to calculate'}
          </p>

          <h2 className="max-w-full overflow-x-auto text-4xl font-semibold text-white">
            {display}
          </h2>

        </div>

        <div className="grid grid-cols-4 gap-3">

          {buttons.map((button) => (
            <button
              key={button.label}
              onClick={button.action}
              className={`
                h-16 rounded-2xl text-xl font-semibold
                transition-all duration-200
                active:scale-95 hover:brightness-125
                ${button.style === 'special'
                  ? 'bg-slate-600 text-white'
                  : button.style === 'operator'
                  ? 'bg-indigo-500/30 text-indigo-300'
                  : button.style === 'equals'
                  ? 'bg-linear-to-br from-indigo-500 to-purple-600 text-white'
                  : button.style === 'zero'
                  ? 'col-span-2 bg-slate-800 text-white'
                  : 'bg-slate-800 text-white'
                }
              `}
            >
              {button.label}
            </button>
          ))}

        </div>

        <p className="mt-6 text-center text-xs text-slate-500">
          Built with React + Tailwind CSS
        </p>

      </div>

    </main>
  )
}

export default App
