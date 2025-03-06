export const COLORS = {
  RED: "#ff0001",
  GREEN: "#028100",
  PURPLE: "#330481",
} as const;
export type IconColor = (typeof COLORS)[keyof typeof COLORS];

export const SHAPES = {
  DIAMOND: "diamond",
  SQUIGGLE: "squiggle",
  PILL: "pill",
} as const;
export type Shape = (typeof SHAPES)[keyof typeof SHAPES];

export const SHADINGS = {
  SOLID: "solid",
  EMPTY: "empty",
  SHADED: "shaded",
} as const;
export type Shading = (typeof SHADINGS)[keyof typeof SHADINGS];

export type IconCount = 1 | 2 | 3;

export interface CardInfo {
  color: IconColor;
  shape: Shape;
  count: IconCount;
  shading: Shading;
}
