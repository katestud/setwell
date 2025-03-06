import { COLORS, SHADINGS, SHAPES } from "../types";

import type { CardInfo } from "../types";

export function constructDeck(): {
  cardData: Record<string, CardInfo>;
  allCards: string[];
} {
  const cardData: Record<string, CardInfo> = {};
  const allCards: string[] = [];

  const colors = Object.values(COLORS);
  const shapes = Object.values(SHAPES);
  const counts = [1, 2, 3] as const;
  const shadings = Object.values(SHADINGS);

  for (const color of colors) {
    for (const shape of shapes) {
      for (const count of counts) {
        for (const shading of shadings) {
          const cardId = `${color}-${shape}-${count}-${shading}`;
          cardData[cardId] = { color, shape, count, shading };
          allCards.push(cardId);
        }
      }
    }
  }

  return { cardData, allCards };
}
