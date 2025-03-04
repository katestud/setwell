import './App.css'

import { DiamondIcon } from './assets/diamond'
import { PillIcon } from './assets/pill'
import reactLogo from './assets/react.svg'
import { useState } from 'react'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        < DiamondIcon shading='shaded' />
        < DiamondIcon shading='empty' />
        < DiamondIcon shading='solid' />
        < PillIcon shading='shaded' />
        < PillIcon shading='empty' />
        < PillIcon shading='solid' />
      </div>
    </>
  )
}

export default App
