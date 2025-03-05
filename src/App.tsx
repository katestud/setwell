import "./App.css";

import type { CardInfo, IconColor, IconCount, Shading, Shape } from "./types";

import { Card } from "./components/card";

function App() {
  const cards = [];
  const cardData: Record<string, CardInfo> = {};

  const colors: IconColor[] = ["#ff0001", "#028100", "#330481"];
  const shapes: Shape[] = ["diamond", "squiggle", "pill"];
  const counts: IconCount[] = [1, 2, 3];
  const shadings: Shading[] = ["solid", "empty", "shaded"];
  const handleCardClick = (id: string) => {
    console.log("Card Clicked:", id);
    console.log("Card Data:", cardData[id]);
  };

  for (const color of colors) {
    for (const shape of shapes) {
      for (const count of counts) {
        for (const shading of shadings) {
          const cardId = `${color}-${shape}-${count}-${shading}`;

          // Store the card data
          cardData[cardId] = { color, shape, count, shading };

          cards.push(
            <Card
              onClick={() => handleCardClick(cardId)}
              key={cardId}
              color={color}
              shape={shape}
              count={count}
              shading={shading}
            />
          );
        }
      }
    }
  }

  function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const randomCards = shuffle(cards).slice(0, 12);

  return (
    <>
      <h1>Lot</h1>
      <div className="card-container">{randomCards}</div>
    </>
  );
}

export default App;
