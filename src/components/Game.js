import { useState, useRef } from "react";

import "./Game.css";

const Game = ({
  verifyLetter,
  pickedCategory,
  letters,
  guessedLetters,
  wrongLetters,
  guesses,
  score,
}) => {
  const [letter, setLetter] = useState("");

  const letterInputRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyLetter(letter);
    setLetter("");

    letterInputRef.current.focus();
  };

  return (
    <div className="game">
      <p className="game__points">
        Pontos: <span className="game__points-value">{score}</span>
      </p>
      <h1>Adivinhe a palavra:</h1>
      <h3 className="game__tip">
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativa(s).</p>

      <div className="game__letter-container">
        <p>Tente adivinha uma letra da palavra:</p>
        <form onSubmit={handleSubmit}>
          <input
            ref={letterInputRef}
            value={letter}
            type="text"
            name="letter"
            placeholder="A"
            maxLength={1}
            autoFocus
            required
            onChange={(e) => {
              setLetter(e.target.value);
            }}
          />
          <button className="app-btn">ENVIAR</button>
        </form>
      </div>

      <div className="game__word-container">
        {letters.map((letter, index) => {
          return guessedLetters.includes(letter) ? (
            <div key={index} className="game__word-letter">
              {letter}
            </div>
          ) : (
            <div key={index} className="game__blank"></div>
          );
        })}
      </div>

      <div className="game__wrong-letters-container">
        <p>Letras já utilizadas: </p>
        {wrongLetters.map((letter, index) => {
          return <span key={index}>{letter}</span>;
        })}
      </div>
    </div>
  );
};

export default Game;
