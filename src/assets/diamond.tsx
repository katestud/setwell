import { PatternDef } from './patternDef'

type DiamondIconProps = {
    color?: string,
    shading: 'shaded' | 'solid' | 'empty'
}

export const DiamondIcon: React.FC<DiamondIconProps> = ({color, shading}) => {
  // TODO: Extract this to a React hook that does "useIconShading hook" that returns the style
  let rectStyle = {} as React.CSSProperties

  switch(shading) {
    case 'shaded':
      rectStyle = { fill: 'url(#stripes)' }
      break
    case 'solid':
      rectStyle = { fill: color }
      break
    case 'empty':
      rectStyle = { fill: 'transparent' }
      break
  }

  return (
    <svg
      aria-hidden="true"
      role="img"
      width="173"
      height="173"
      viewBox="0 0 173 173"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
    >
      <PatternDef id="stripes" color={color} />

      <rect x="83.8912" y="0.707092" width="123.403" height="118.398" transform="rotate(44.6346 83.8912 0.707092)" style={rectStyle} stroke="black"/>
    </svg>
  )
}
