import type { IconColor, Shading } from "../types";

import { PatternDef } from "./patternDef";
import { useId } from "react";

type SquiggleIconProps = {
  color: IconColor;
  shading: Shading;
  width?: number;
  height?: number;
};

export const SquiggleIcon: React.FC<SquiggleIconProps> = ({
  color,
  shading,
  width = 60,
  height = 60,
}) => {
  const id = useId();

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
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0 0 976 800"
      xmlSpace="preserve"
      transform="rotate(90)"
    >
      <PatternDef id={stripeId} color={color} />
      <g>
        <path
          transform="translate(734,170)"
          d="m0 0h14l20 4 18 7 20 13 11 9 8 8 9 12 9 15 6 13 5 14 3 15 2 18v13l-3 26-5 23-9 27-9 21-8 16-12 21-11 16-8 10-13 15-16 16-13 10-18 11-21 9-24 8-28 6-18 2h-39l-31-3-37-6-67-14-34-6-9-1h-18l-21 4-21 7-25 11-35 17-34 14-19 5-7 1h-17l-20-4-17-7-13-8-10-9-7-6v-2l-4-2-10-12-11-18-7-18-3-14-1-9v-36l3-21 8-32 11-28 8-16 10-17 8-12 12-16 21-21 19-14 20-12 19-9 21-7 27-5 10-1h37l26 3 25 4 46 11 37 10 34 8 14 2h25l18-3 16-6 12-6 12-8 12-9 10-8 11-9 16-13 24-16 16-7z"
          style={rectStyle}
          stroke={color}
          className="icon"
        />
      </g>
    </svg>
  );
};
