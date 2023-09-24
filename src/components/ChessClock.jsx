import React, { useState, useEffect } from 'react';

function ChessClock() {
  const [minutes, setMinutes] = useState(15);
  const [player1Time, setPlayer1Time] = useState(minutes * 60);
  const [player2Time, setPlayer2Time] = useState(minutes * 60);
  const [activePlayer, setActivePlayer] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [extraSeconds, setExtraSeconds] = useState(0);

  useEffect(() => {
    let interval;

    if (!isPaused) {
      if (activePlayer === 1 && player1Time > 0) {
        interval = setInterval(() => {
          setPlayer1Time(player1Time - 1);
        }, 1000);
      } else if (activePlayer === 2 && player2Time > 0) {
        interval = setInterval(() => {
          setPlayer2Time(player2Time - 1);
        }, 1000);
      }
    }

    return () => clearInterval(interval);
  }, [activePlayer, player1Time, player2Time, isPaused]);

  const handleMinutesChange = (e) => {
    const newMinutes = parseInt(e.target.value);
    if (!isNaN(newMinutes) && newMinutes > 0) {
      setMinutes(newMinutes);
      setPlayer1Time(newMinutes * 60);
      setPlayer2Time(newMinutes * 60);
    }
  };

  const handleTimeClick = () => {
    if (activePlayer === null) {
      setActivePlayer(1);
      setIsPaused(false);
    } else {
      setActivePlayer(activePlayer === 1 ? 2 : 1);
      setIsPaused(false);
      if (activePlayer === 1) {
        setPlayer2Time(player2Time + extraSeconds);
      } else {
        setPlayer1Time(player1Time + extraSeconds);
      }
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const resetClock = () => {
    clearInterval(player1Time);
    clearInterval(player2Time);
    setPlayer1Time(minutes * 60);
    setPlayer2Time(minutes * 60);
    setActivePlayer(null);
    setIsPaused(false);
  };

  return (
    <div className="chess-clock">

      <div className={`player ${player1Time <= 20 ? 'red' : ''} ${activePlayer === 1 ? 'active' : ''}`}>
        <h2>Jugador 1</h2>
        <div
          className={`time ${player1Time <= 20 ? 'red' : ''}`}
          onClick={handleTimeClick}
        >
          <h1>{Math.floor(player1Time / 60)}:{player1Time % 60}</h1>
        </div>
      </div>

      <div className="controls">
        <button onClick={togglePause}>
          {isPaused ? 'Reanudar' : 'Pausa'}
        </button>
        <button onClick={resetClock}>Reiniciar</button>
      </div>

      <div className={`player ${player2Time <= 20 ? 'red' : ''} ${activePlayer === 2 ? 'active' : ''}`}>
        <h2>Jugador 2</h2>
        <div
          className={`time ${player2Time <= 20 ? 'red' : ''}`}
          onClick={handleTimeClick}
        >
          <h1>{Math.floor(player2Time / 60)}:{player2Time % 60}</h1>
        </div>
      </div>

      <div className="minutes-input">
        <label htmlFor="minutes">Minutos:</label>
        <input
          type="number"
          id="minutes"
          value={minutes}
          onChange={handleMinutesChange}
        />
      </div>

      <div className="minutes-input">
        <label htmlFor="extraSeconds">Incremento (segundos):</label>
        <input
          type="number"
          id="extraSeconds"
          value={extraSeconds}
          onChange={(e) => setExtraSeconds(parseInt(e.target.value))}
        />
      </div>
      
    </div>
  );
}

export default ChessClock;