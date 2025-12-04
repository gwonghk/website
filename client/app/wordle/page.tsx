"use client";

import { useEffect, useState } from "react";

const API_URL = "/api/wordle";

type SixNullableStrings = [
  string | null,
  string | null,
  string | null,
  string | null,
  string | null
];

export default function Wordle() {
  const [solution, setSolution] = useState<string>("");
  const [guesses, setGuesses] = useState<SixNullableStrings>([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [currentGuess, setCurrentGuess] = useState<string>("");
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(API_URL);
      const words = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)];
      setSolution(randomWord);
    };

    fetchWord();
  }, []);

  useEffect(() => {
    const handleType = (e: KeyboardEvent) => {
      const key = e.key;

      if (isGameOver) return;
      if (key === "Backspace") {
        setCurrentGuess((oldGuess) => oldGuess.slice(0, -1));
        return;
      }

      if (currentGuess.length >= 5) return;
      if (key === "Enter") {
        if (currentGuess.length !== 5) {
          console.log("Guess must be 5 letters");
          return;
        }

        const newGuesses = [...guesses];
        newGuesses[guesses.findIndex((val) => val === null)] = currentGuess;

        const isCorrect = currentGuess === solution;
        if (isCorrect) {
          setIsGameOver(true);
        }
      }

      setCurrentGuess((oldGuess) => oldGuess + key);
    };

    window.addEventListener("keydown", handleType);

    return () => window.removeEventListener("keydown", handleType);
  }, [currentGuess, isGameOver, solution]);

  return (
    <div className="board flex flex-col items-center">
      {guesses.map((guess, i) => {
        const isCurrentGuess = i === guesses.findIndex((val) => val === null);

        return (
          <Line
            key={`${guess} + ${i}`}
            guess={isCurrentGuess ? currentGuess : guess ?? ""}
            isFinal={!isCurrentGuess && guess !== null}
            solution={solution}
          />
        );
      })}
      <div>
        <span>solution: {solution}</span>
        <br />
        <span>current guess: {currentGuess}</span>
      </div>
    </div>
  );
}

const WORD_LENGTH = 5;

const Line = ({
  guess,
  isFinal,
  solution,
}: {
  guess: string;
  isFinal: boolean;
  solution: string;
}) => {
  const tiles = [];

  for (let i = 0; i < WORD_LENGTH; i++) {
    const char = guess[i];

    let className = "tile";

    if (isFinal) {
      if (char === solution[i]) {
        className += " success";
      } else if (solution.includes(char)) {
        className += " warn";
      } else {
        className += " fail";
      }
    }

    tiles.push(<div key={i}>{char}</div>);
  }

  return (
    <div className="line flex flex-row">
      {tiles.map((tile, i) => (
        <div
          className="tile flex items-center justify-center text-4xl bg-gray-400 m-2 p-2 min-w-20 min-h-20 uppercase"
          key={i}
        >
          {tile}
        </div>
      ))}
    </div>
  );
};
