import { PatternDef } from './patternDef'

type PillIconProps = {
    color?: string,
    shading: 'shaded' | 'solid' | 'empty'
}

export const PillIcon: React.FC<PillIconProps> = ({color, shading}) => {

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
  return (<svg
    width={111}
    height={223}
    viewBox="0 0 111 223"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
  >
    <PatternDef id="stripes" color={color} />
    <rect x={0.5} y={0.5} width={110} height={222} rx={49.5} style={rectStyle} stroke="black" />
  </svg>)
};
