import './App.css'

import { Card } from './components/card'

function App() {
  // const red = "#ff0001"
  // const green = "#028100"
  // const purple = "#330481"

  const cards = []

  const colors = ["#ff0001", "#028100", "#330481"]
  const shapes: Array<'diamond' | 'squiggle' | 'pill'> = ["diamond", "squiggle", "pill"]
  const counts: Array<1 | 2 | 3> = [1, 2, 3]
  const shadings: Array<'solid' | 'empty' | 'shaded'> = ["solid", "empty", "shaded"]

  for (const color of colors) {
    for (const shape of shapes) {
      for (const count of counts) {
        for (const shading of shadings) {
          cards.push(
            <Card
              key={`${color}-${shape}-${count}-${shading}`}
              color={color}
              shape={shape}
              count={count}
              shading={shading}
            />
          )
        }
      }
    }
  }

  return (
    <>
      <h1>Lot</h1>
      <div className="card-container">
        {cards}
      </div>
    </>
  )
}

export default App
