import "./App.css";

import { useCallback, useEffect, useState } from "react";

import { wordsList } from "./data/words";

import { slugify } from "./utils";

// Components
import StartScreen from "./components/StartScreen";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  {
    id: 1,
    title: "Start",
    name: "start",
  },
  {
    id: 2,
    title: "Game",
    name: "game",
  },
  {
    id: 3,
    title: "End",
    name: "end",
  },
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0]);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setletters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guessedWords, setGuessedWords] = useState([]);

  const [wrongLetters, setWrongLetters] = useState([]);

  const defaultGuesses = 6;
  const [guesses, setGuesses] = useState(defaultGuesses);

  const [score, setScore] = useState(0);

  const pickRandomWord = useCallback(() => {
    console.log("Pegando palavra aleatória");
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random() * categories.length)];
    const word =
      words[category][Math.floor(Math.random() * words[category].length)];
    const wordLetters = slugify(word, " ").split("");

    if (guessedWords.includes(word)) {
      return pickRandomWord();
    } else {
      return { word, wordLetters, category };
    }
  }, [words]);

  const startGame = useCallback(() => {
    console.log("Iniciando jogo");
    const { word, category, wordLetters } = pickRandomWord();

    setPickedWord(word);
    setPickedCategory(category);
    setletters(wordLetters);

    setGameStage(stages[1]);
  }, [pickRandomWord]);

  const verifyLetter = (letter) => {
    console.log("Verificando letra: ", letter);
    const normalizedLetter = letter.toLowerCase();

    if (
      guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    // Push letter to guessedLetters or wrongLetters
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((prev) => [...prev, normalizedLetter]);
    } else {
      setWrongLetters((prev) => [...prev, normalizedLetter]);
      setGuesses((prev) => prev - 1);
    }
  };

  function clearStates() {
    console.log("Limpando estados");
    setPickedWord("");
    setPickedCategory("");
    setletters([]);
    setWrongLetters([]);
    setGuessedLetters([]);
    setGuesses(defaultGuesses);
  }

  // Check if the game is over
  useEffect(() => {
    console.log("Verificando se o jogo acabou");
    if (guesses <= 0) {
      // Reset all states
      clearStates();

      setGameStage(stages[2]);
    }
  }, [guesses]);

  // Check Win Condition
  useEffect(() => {
    console.log("Verificando se o jogador ganhou");
    const uniqueLetters = [...new Set(letters)];

    // Win Condition
    if (
      guessedLetters.length === uniqueLetters.length &&
      gameStage.name === stages[1].name
    ) {
      setScore((actualScore) => (actualScore += 100));
      setGuessedWords((prev) => [...prev, pickedWord]);

      // Reset all states
      clearStates();

      // Restart game with new words
      startGame();
    }
  }, [guessedLetters]);

  const retry = () => {
    setScore(0);
    setGuesses(defaultGuesses);
    setGameStage(stages[0]);
  };

  return (
    <div className="app">
      {gameStage.name === "start" && <StartScreen startGame={startGame} />}
      {gameStage.name === "game" && (
        <Game
          verifyLetter={verifyLetter}
          pickedWord={pickedWord}
          pickedCategory={pickedCategory}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />
      )}
      {gameStage.name === "end" && <GameOver retry={retry} score={score} />}
    </div>
  );
}

export default App;
