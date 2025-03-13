import "./App.css";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { type CardInfo } from "./types";
import { useEffect, useRef, useState } from "react";

import { Card } from "./components/card";
import Confetti from "react-confetti";
import React from "react";
import { constructDeck } from "./utils/deck";
import {
  completedSetCardId,
  possibleMatchingCards,
} from "./utils/match-analysis";

function App() {
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [setsFound, setSetsFound] = useState(0);
  const [mistakesMade, setMistakesMade] = useState(0);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cards, setCards] = useState<string[]>([]);
  const [remainingCards, setRemainingCards] = useState<string[]>([]);
  const [cardData, setCardData] = useState<Record<string, CardInfo>>({});
  const nodeRefs = useRef<
    Record<string, React.RefObject<HTMLDivElement | null>>
  >({});

  useEffect(() => {
    const { cardData, allCards } = constructDeck();
    const shuffledCards = shuffle([...allCards]);
    setCards(shuffledCards.slice(0, 12));
    setRemainingCards(shuffledCards.slice(12));
    setCardData(cardData);
  }, []);

  const handleCardClick = (id: string, index: number) => {
    setSelectedCards((prevSelected) => {
      if (prevSelected.includes(id)) {
        setSelectedIndices((prevIndices) =>
          prevIndices.filter((i) => i !== index)
        );
        return prevSelected.filter((cardId) => cardId !== id);
      }

      if (prevSelected.length >= 3) {
        return prevSelected;
      }

      setSelectedIndices((prevIndices) => [...prevIndices, index]);
      return [...prevSelected, id];
    });
  };

  const dealMoreCards = () => {
    const possibleMatches = possibleMatchingCards(cards);

    const matchingCards = cards.filter((cardId) =>
      possibleMatches.includes(cardId)
    );

    if (matchingCards.length > 0) {
      console.log(
        "There are possible matches in the current cards:",
        matchingCards
      );
    } else {
      console.log("No possible matches in the current cards.");
    }

    setCards((prevCards) => [...prevCards, ...remainingCards.slice(0, 3)]);
    completedSetCardId(cards[0], cards[1]);
    setRemainingCards((prevRemaining) => prevRemaining.slice(3));
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
        setSetsFound((prevSetsFound) => prevSetsFound + 1);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 4000);

        setTimeout(() => {
          const newRemainingCards = [...remainingCards];
          let newCards;
          if (cards.length > 12) {
            newCards = cards.filter(
              (_, index) => !selectedIndices.includes(index)
            );
          } else {
            newCards = cards.map((card, idx) => {
              if (selectedIndices.includes(idx)) {
                return newRemainingCards.pop() || ""; // Return empty string if no more cards
              }
              return card;
            });
          }

          setCards(newCards);
          setRemainingCards(newRemainingCards);
          setSelectedCards([]);
          setSelectedIndices([]);
        }, 300);
      } else {
        setMistakesMade((prevMistakesMade) => prevMistakesMade + 1);
        const message = `Try again! The cards didn't have the right combination for ${badProps.join(
          ", "
        )}`;
        setModalMessage(message);
        setSelectedCards([]);
        setSelectedIndices([]);
      }
    }

    if (selectedCards.length === 2) {
      const idealCard = completedSetCardId(selectedCards[0], selectedCards[1]);
      const cardPresentText = cards.includes(idealCard)
        ? "on the board"
        : "not present";
      console.log(
        "To complete the set, you need",
        idealCard,
        "and it is",
        cardPresentText
      );
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
        <TransitionGroup component={null}>
          {cards.map((cardId, index) => {
            const data = cardData[cardId];
            if (!nodeRefs.current[cardId]) {
              nodeRefs.current[cardId] = React.createRef();
            }
            return (
              <CSSTransition
                key={cardId}
                timeout={300}
                classNames="fade"
                nodeRef={nodeRefs.current[cardId]}
              >
                <div ref={nodeRefs.current[cardId]}>
                  {cardId && (
                    <Card
                      key={cardId}
                      onClick={() => handleCardClick(cardId, index)}
                      color={data.color}
                      shape={data.shape}
                      count={data.count}
                      shading={data.shading}
                      selected={selectedCards.includes(cardId)}
                    />
                  )}
                </div>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
      <button onClick={dealMoreCards} disabled={remainingCards.length < 3}>
        More Cards
      </button>
      <div className="game-stats">
        <div className="game-stats-text">
          <p>Sets found: {setsFound}</p>
          <p>Penalty: {mistakesMade}</p>
        </div>
        <div className="remaining-cards-count">
          Cards remaining: {remainingCards.length}
        </div>
      </div>
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
