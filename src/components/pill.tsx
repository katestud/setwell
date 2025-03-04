import { PatternDef } from "./patternDef";
import { useId } from "react";

type PillIconProps = {
    color: string,
    shading: 'shaded' | 'solid' | 'empty',
    width?: number,
    height?: number
}

export const PillIcon: React.FC<PillIconProps> = ({color, shading, width=50, height=50}) => {

    const id = useId()
    // TODO: Extract this to a React hook that does "useIconShading hook" that returns the style
    let rectStyle = {} as React.CSSProperties
    const stripeId = `stripe-${id}`

  switch(shading) {
    case 'shaded':
      rectStyle = { fill: `url(#${stripeId})` }
      break
    case 'solid':
      rectStyle = { fill: color }
      break
    case 'empty':
      rectStyle = { fill: 'transparent' }
      break
  }
  return (<svg
    width={width}
    height={height}
    viewBox="0 0 111 223"
    xmlns="http://www.w3.org/2000/svg"
    color={color}
  >
    <PatternDef id={stripeId} color={color} />
    <rect x={0.5} y={0.5} width={110} height={222} rx={49.5} style={rectStyle} stroke={color} />
  </svg>)
};
