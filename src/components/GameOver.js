import "./GameOver.css";

const GaveOver = ({ retry, score }) => {
  return (
    <div>
      <h1 className="game-over__title">Fim do jogo</h1>
      <p> A sua pontuação foi: {score}</p>
      <button className="app-btn" onClick={retry}>
        Retry
      </button>
    </div>
  );
};

export default GaveOver;
