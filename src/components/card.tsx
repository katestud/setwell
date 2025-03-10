import {
  SHAPES,
  type IconColor,
  type IconCount,
  type Shading,
  type Shape,
} from "../types";

import { DiamondIcon } from "./diamond";
import { PillIcon } from "./pill";
import { SquiggleIcon } from "./squiggle";

interface CardProps {
  color: IconColor;
  shape: Shape;
  count: IconCount;
  shading: Shading;
  onClick: () => void;
  selected?: boolean;
}

export function Card({
  color,
  shape,
  count,
  shading,
  onClick,
  selected,
}: CardProps) {
  // TODO: Extract this to a React hook that does "useIconShading hook" that returns the style

  let component = <></>;

  switch (shape) {
    case SHAPES.DIAMOND:
      component = <DiamondIcon color={color} shading={shading} />;
      break;
    case SHAPES.PILL:
      component = <PillIcon color={color} shading={shading} />;
      break;
    case SHAPES.SQUIGGLE:
      component = <SquiggleIcon color={color} shading={shading} />;
      break;
  }

  const components = Array.from({ length: count }, (_, index) => (
    <div key={index} className="icon">
      {component}
    </div>
  ));

  return (
    <div className={`card ${selected ? "selected" : ""}`} onClick={onClick}>
      {components}
    </div>
  );
}
