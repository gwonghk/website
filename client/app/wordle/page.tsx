"use client";

import { useEffect, useState } from "react";

const API_URL = "/api/wordle";

type SixNullableStrings = [
  string | null,
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
    null,
  ]);

  useEffect(() => {
    const fetchWord = async () => {
      const response = await fetch(API_URL);
      const words = await response.json();
      const randomWord = words[Math.floor(Math.random() * words.length)];

      setSolution(randomWord);
    };

    fetchWord();
  }, []);

  return (
    <div>
      {guesses.map((guess, i) => (
        <Line key={`${guess} + ${i}`} />
      ))}
    </div>
  );
}

const Line = () => {
  const tiles = [];
  return <div></div>;
};
