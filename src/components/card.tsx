import type { IconColor, IconCount, Shading, Shape } from "../types";

import { DiamondIcon } from "./diamond";
import { PillIcon } from "./pill";
import { SquiggleIcon } from "./squiggle";

interface CardProps {
  color: IconColor;
  shape: Shape;
  count: IconCount;
  shading: Shading;
  onClick: () => void;
}

export function Card({ color, shape, count, shading, onClick }: CardProps) {
  // TODO: Extract this to a React hook that does "useIconShading hook" that returns the style

  let component = <></>;

  switch (shape) {
    case "diamond":
      component = <DiamondIcon color={color} shading={shading} />;
      break;
    case "pill":
      component = <PillIcon color={color} shading={shading} />;
      break;
    case "squiggle":
      component = <SquiggleIcon color={color} shading={shading} />;
      break;
  }

  // Generate an array of components based on the count
  const components = Array.from({ length: count }, (_, index) => (
    <div key={index} className="icon">
      {component}
    </div>
  ));

  return (
    <div className="card" onClick={onClick}>
      {components}
    </div>
  );
}
