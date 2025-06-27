import React, { useEffect, useState } from "react";
import './Stopwatch.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag, faClipboard } from '@fortawesome/free-regular-svg-icons';

function Stopwatch() {
  const [isStarted, setIsStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [countdownList, setCountdownList] = useState([]);
  
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);

  const handleStart = () => {
    if (!isStarted) {
      setIsStarted(true);
      setIsReset(true);
    } else {
      setIsPaused(prev => !prev);
    }
  };

  const handleReset = () => {
    setIsReset(true);
    setIsPaused(false);
    setIsStarted(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
    setMilliseconds(0);
    setCountdownList([]);
  };

  const displayCurrent = () => {
    const currentTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
    setCountdownList(prev => [currentTime, ...prev]);
  };

  useEffect(() => {
    let interval = null;

    const timerElements = document.querySelectorAll('#timer');
    timerElements.forEach(el => el.classList.remove('fading'));

    if (isStarted && !isPaused) {
      interval = setInterval(() => {
        setMilliseconds(prev => {
          if (prev >= 99) {
            setSeconds(sec => {
              if (sec >= 59) {
                setMinutes(min => {
                  if (min >= 59) {
                    setHours(hr => hr + 1);
                    return 0;
                  }
                  return min + 1;
                });
                return 0;
              }
              return sec + 1;
            });
            return 0;
          }
          return prev + 1;
        });
      }, 10);
    } else if (isStarted && isPaused) {
      timerElements.forEach(el => el.classList.add('fading'));
    }

    return () => clearInterval(interval);
  }, [isStarted, isPaused]);

  return (
    <div className="container">
      <div className="stopwatchcontainer">
        <div className="timer">
          <h1 id="timer">
            {String(hours).padStart(2, '0')} : {String(minutes).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
          </h1>
          <p className="milliseconds" id="timer">: {String(milliseconds).padStart(2, '0')}</p>
        </div>

        {countdownList.length > 0 && (
          <div className="countdownbox">
            <div className="countdownlist">
              {countdownList.map((time, index) => (
                <div className="timerstyle" key={index}>
                  <FontAwesomeIcon icon={faFlag} /> 
                  <li className="timers">{String(countdownList.length - index).padStart(2, '0')}</li>
                  <li>. {time}</li>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="buttons">
          <button onClick={handleStart} className="play-icon">
  ▶
          </button>


          {isStarted && (
            <button className="flag" onClick={displayCurrent}>
              <FontAwesomeIcon icon={faClipboard} />
            </button>
          )}

          {isReset && (
            <button onClick={handleReset} className="restart">Restart</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;
