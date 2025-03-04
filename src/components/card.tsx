import { DiamondIcon } from './diamond'
import { PillIcon } from './pill'
import { SquiggleIcon } from './squiggle'

type CardProps = {
    color: string,
    shading: 'shaded' | 'solid' | 'empty',
    count: 1 | 2 | 3,
    shape: 'diamond' | 'pill' | 'squiggle'
}

export const Card: React.FC<CardProps> = ({color, shading, count, shape}) => {
  // TODO: Extract this to a React hook that does "useIconShading hook" that returns the style

  let component = <></>

  switch(shape) {
    case 'diamond':
      component = <DiamondIcon color={color} shading={shading} />
      break
    case 'pill':
      component = <PillIcon color={color} shading={shading} />
      break
    case 'squiggle':
      component = <SquiggleIcon color={color} shading={shading} />
      break
  }

  // Generate an array of components based on the count
  const components = Array.from({ length: count }, (_, index) => (
    <div key={index} className="icon-container">
      {component}
    </div>
  ))

  return (
    <div className="card">
      {components}
    </div>
  )
}
