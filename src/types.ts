export type Shape = "diamond" | "squiggle" | "pill";
export type Shading = "solid" | "empty" | "shaded";
export type IconColor = "#ff0001" | "#028100" | "#330481";
export type IconCount = 1 | 2 | 3;

export interface CardInfo {
  color: IconColor;
  shape: Shape;
  count: 1 | 2 | 3;
  shading: Shading;
}
