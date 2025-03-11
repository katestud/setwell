import { COLORS, SHADINGS, SHAPES } from "../types";
import type { IconColor, IconCount, Shading, Shape } from "../types";
import { cardFromId, idFromCard } from "./card";

export function completedSetCardId(card1Id: string, card2Id: string): string {
  const card1 = cardFromId(card1Id);
  const card2 = cardFromId(card2Id);

  let color;
  if (card1.color === card2.color) {
    color = card1.color;
  } else {
    color = Object.values(COLORS).find(
      (c) => c !== card1.color && c !== card2.color
    ) as IconColor;
  }

  let shading;
  if (card1.shading === card2.shading) {
    shading = card1.shading;
  } else {
    shading = Object.values(SHADINGS).find(
      (c) => c !== card1.shading && c !== card2.shading
    ) as Shading;
  }

  let shape;
  if (card1.shape === card2.shape) {
    shape = card1.shape;
  } else {
    shape = Object.values(SHAPES).find(
      (c) => c !== card1.shape && c !== card2.shape
    ) as Shape;
  }

  let count;
  if (card1.count === card2.count) {
    count = card1.count;
  } else {
    const possibleCounts: IconCount[] = [1, 2, 3];
    count = possibleCounts.find(
      (c) =>
        c !== (card1.count as IconCount) && c !== (card2.count as IconCount)
    ) as IconCount;
  }

  return idFromCard({ color, shading, shape, count });
}

export function possibleMatchingCards(arr: string[]): string[] {
  const combinations: [string, string][] = [];
  const results: string[] = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      combinations.push([arr[i], arr[j]]);
    }
  }

  for (const [card1Id, card2Id] of combinations) {
    const result = completedSetCardId(card1Id, card2Id);
    results.push(result);
  }

  return results;
}
