import type { CardInfo, IconColor, IconCount, Shading, Shape } from "../types";

export function idFromCard(card: CardInfo): string {
  return `${card.color}-${card.shape}-${card.count}-${card.shading}`;
}

export function cardFromId(cardId: string): CardInfo {
  var parts = cardId.split("-"),
    color = parts[0] as IconColor,
    shape = parts[1] as Shape,
    count = parseInt(parts[2], 10) as IconCount,
    shading = parts[3] as Shading;
  return { color, shape, count, shading };
}
