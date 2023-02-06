import "./StartScreen.css";

const StartScreen = ({ startGame }) => {
  return (
    <>
      <h2 className="start-game__title">
        Secret
        <br />
        <span style={{ paddingLeft: "32px", fontSize: "70px" }}>Word</span>
      </h2>

      <p className="start-game__subtitle">
        Clique no botão abaixo para começar a jogar
      </p>

      <button className="app-btn" onClick={startGame}>
        START
      </button>
    </>
  );
};

export default StartScreen;
