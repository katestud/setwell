import { PatternDef } from "./patternDef";
import { useId } from "react";

type SquiggleIconProps = {
  color: string,
  shading: 'shaded' | 'solid' | 'empty',
  width?: number,
  height?: number
}

export const SquiggleIcon: React.FC<SquiggleIconProps> = ({ color, shading, width = 50, height = 50 }) => {
  const id = useId()

  let rectStyle = {} as React.CSSProperties
  const stripeId = `stripe-${id}`

  switch (shading) {
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

  return (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width={width}
    height={height}
    viewBox="0 0 349.078 349.078"
    xmlSpace="preserve"
  >
    <PatternDef id={stripeId} color={color} />
    <g>
      <path d="M198.779,322.441v-58.245c0-7.903,6.406-14.304,14.304-14.304c28.183,0,43.515-28.904,45.643-85.961h-45.643 c-7.897,0-14.304-6.41-14.304-14.304V26.64c0-7.9,6.406-14.301,14.304-14.301h121.69c7.896,0,14.305,6.408,14.305,14.301v122.988 c0,27.349-2.761,52.446-8.181,74.611c-5.568,22.722-14.115,42.587-25.398,59.049c-11.604,16.917-26.132,30.192-43.155,39.437 c-17.152,9.304-37.09,14.026-59.267,14.026C205.186,336.745,198.779,330.338,198.779,322.441z M14.301,249.887" style={rectStyle} stroke={color} />
    </g>
  </svg>
  )
}
