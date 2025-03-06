import "./App.css";

import type { CardInfo, IconColor, IconCount, Shading, Shape } from "./types";
import { useEffect, useMemo, useState } from "react";

import { Card } from "./components/card";
import Confetti from "react-confetti";

function App() {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [setsFound, setSetsFound] = useState(0);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const { cards, cardData } = useMemo(() => {
    const cardData: Record<string, CardInfo> = {};
    const allCards: string[] = [];

    const colors: IconColor[] = ["#ff0001", "#028100", "#330481"];
    const shapes: Shape[] = ["diamond", "squiggle", "pill"];
    const counts: IconCount[] = [1, 2, 3];
    const shadings: Shading[] = ["solid", "empty", "shaded"];

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

    const shuffledCards = shuffle([...allCards]).slice(0, 16);

    return { cards: shuffledCards, cardData };
  }, []);

  const handleCardClick = (id: string) => {
    setSelectedCards((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((cardId) => cardId !== id);
      }

      if (prevSelected.length >= 3) {
        return prevSelected;
      }

      return [...prevSelected, id];
    });

    console.log("Selected cards:", selectedCards);
    console.log("Card Clicked:", id);
    console.log("Card Data:", cardData[id]);
  };

  useEffect(() => {
    if (selectedCards.length === 3) {
      const colorsCount = [
        ...new Set(selectedCards.map((a) => cardData[a].color)),
      ];
      const shapesCount = [
        ...new Set(selectedCards.map((a) => cardData[a].shape)),
      ];
      const countsCount = [
        ...new Set(selectedCards.map((a) => cardData[a].count)),
      ];
      const shadingsCount = [
        ...new Set(selectedCards.map((a) => cardData[a].shading)),
      ];

      let success = true;
      let badProps = [];

      if (colorsCount.length === 2) {
        success = false;
        badProps.push("color");
      }
      if (shapesCount.length === 2) {
        success = false;
        badProps.push("shape");
      }
      if (countsCount.length === 2) {
        success = false;
        badProps.push("count");
      }
      if (shadingsCount.length === 2) {
        success = false;
        badProps.push("shading");
      }

      if (success) {
        console.log("You win! That's a set!");
        setSetsFound((prevSetsFound) => prevSetsFound + 1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000); // Hide confetti after 3 seconds
      } else {
        const message = `Try again! The cards didn't have the right combination for ${badProps.join(
          ", "
        )}`;
        setModalMessage(message);
        setSelectedCards([]);
      }
    }
  }, [selectedCards]);

  function shuffle(array: any[]) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  return (
    <>
      <h1>Setwell</h1>
      <div className="card-container">
        {cards.map((cardId) => {
          const data = cardData[cardId];
          return (
            <Card
              key={cardId}
              onClick={() => handleCardClick(cardId)}
              color={data.color}
              shape={data.shape}
              count={data.count}
              shading={data.shading}
              selected={selectedCards.includes(cardId)}
            />
          );
        })}
      </div>
      <div className="found-set-count">Sets found: {setsFound}</div>
      {modalMessage && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalMessage(null)}>
              &times;
            </span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
      {showConfetti && <Confetti />}
    </>
  );
}

export default App;
