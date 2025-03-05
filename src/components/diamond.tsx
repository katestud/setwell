import type { IconColor, Shading } from "../types";

import { PatternDef } from "./patternDef";
import { useId } from "react";

type DiamondIconProps = {
  color: IconColor;
  shading: Shading;
  width?: number;
  height?: number;
};

export const DiamondIcon: React.FC<DiamondIconProps> = ({
  color,
  shading,
  width = 50,
  height = 50,
}) => {
  const id = useId();
  // TODO: Extract this to a React hook that does "useIconShading hook" that returns the style
  let rectStyle = {} as React.CSSProperties;
  const stripeId = `stripe-${id}`;

  switch (shading) {
    case "shaded":
      rectStyle = { fill: `url(#${stripeId})` };
      break;
    case "solid":
      rectStyle = { fill: color };
      break;
    case "empty":
      rectStyle = { fill: "transparent" };
      break;
  }

  return (
    <svg
      aria-hidden="true"
      role="img"
      width={width}
      height={height}
      viewBox="0 0 173 173"
      xmlns="http://www.w3.org/2000/svg"
      color={color}
    >
      <PatternDef id={stripeId} color={color} />

      <rect
        x="83.8912"
        y="0.707092"
        width="123.403"
        height="118.398"
        transform="rotate(44.6346 83.8912 0.707092)"
        style={rectStyle}
        stroke={color}
      />
    </svg>
  );
};
