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
  width = 30,
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
      viewBox="0 0 27 47"
      xmlSpace="preserve"
    >
      <PatternDef id={stripeId} color={color} />
      <g>
        <path
          d="M26 38.377V39.2377L25.7541 40.4672L25.3238 41.5738L24.5246 42.8033L23.9713 43.4795L23.4795 43.9713L22.7418 44.5246L21.8197 45.0779L21.0205 45.4467L20.1598 45.7541L19.2377 45.9385L18.1311 46.0615H17.332L15.7336 45.8771L14.3197 45.5697L12.6598 45.0164L11.3689 44.4631L10.3852 43.9713L9.09426 43.2336L8.11066 42.5574L7.4959 42.0656L6.57377 41.2664L5.59016 40.2828L4.97541 39.4836L4.29918 38.377L3.7459 37.0861L3.2541 35.6107L2.88525 33.8893L2.76229 32.7828V30.3852L2.94672 28.4795L3.31557 26.2049L4.17623 22.0861L4.54508 19.9959L4.60656 19.4426V18.3361L4.36066 17.0451L3.93033 15.7541L3.2541 14.2172L2.20902 12.0656L1.34836 9.97541L1.04098 8.80738L0.979508 8.37705V7.33197L1.22541 6.10246L1.65574 5.05738L2.14754 4.2582L2.70082 3.64344L3.06967 3.21311H3.19262L3.31557 2.96721L4.05328 2.35246L5.15984 1.67623L6.26639 1.2459L7.12705 1.06148L7.68033 1H9.89344L11.1844 1.18443L13.1516 1.67623L14.873 2.35246L15.8566 2.84426L16.9016 3.45902L17.6393 3.95082L18.623 4.68852L19.9139 5.97951L20.7746 7.14754L21.5123 8.37705L22.0656 9.54508L22.4959 10.8361L22.8033 12.4959L22.8648 13.1107V15.3852L22.6803 16.9836L22.4344 18.5205L21.7582 21.3484L21.1434 23.623L20.6516 25.7131L20.5287 26.5738V28.1107L20.7131 29.2172L21.082 30.2008L21.4508 30.9385L21.9426 31.6762L22.4959 32.4139L22.9877 33.0287L23.541 33.7049L24.3402 34.6885L25.3238 36.1639L25.7541 37.1475L26 38.377Z"
          style={rectStyle}
          stroke={color}
          className="icon squiggle-icon"
        />
      </g>
    </svg>
  );
};
