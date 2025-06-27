import React, { useState, useEffect, useRef } from "react";
import './Timer.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faCaretDown, faPlay } from '@fortawesome/free-solid-svg-icons';
import NewTimer from "./NewTimer";

function SetTime() {
  const [seconds, setseconds] = useState(0);
  const [minutes, setminutes] = useState(0);
  const [hours, sethours] = useState(0);
  const [days, setdays] = useState(0);

  const childRef = useRef(null);
  const [isstarted, setisstarted] = useState(false);
  const [ispaused, setispaused] = useState(false);
  const [isReset, setisReset] = useState(false);
  const [iscompleted, setiscompleted] = useState(false);

  const handleStart = () => {
    if (!isstarted) {
      setisstarted(true);
      setisReset(true);
    } else {
      setispaused(prev => !prev);
    }
  };

  const handleReset = () => {
    setisReset(true);
    setispaused(false);
    setisstarted(false);
    setiscompleted(false);
  };

  const handleRestart = () => {
    setiscompleted(false);
    childRef.current.assignvalues();
  };

  const increasedays = () => setdays((days + 1) % 100);
  const decreasedays = () => setdays(days - 1 >= 0 ? days - 1 : 99 - days);

  const increasehours = () => sethours((hours + 1) % 24);
  const decreasehours = () => sethours(hours - 1 >= 0 ? hours - 1 : 23 - hours);

  const increaseminutes = () => setminutes((minutes + 1) % 60);
  const decreaseminutes = () => setminutes(minutes - 1 >= 0 ? minutes - 1 : 59 - minutes);

  const increaseseconds = () => setseconds((seconds + 1) % 60);
  const decreaseseconds = () => setseconds(seconds - 1 >= 0 ? seconds - 1 : 59 - seconds);

  useEffect(() => {
    const handlers = [
      { id: 'days', handler: e => (e.deltaY > 0 ? increasedays() : decreasedays()) },
      { id: 'hours', handler: e => (e.deltaY > 0 ? increasehours() : decreasehours()) },
      { id: 'minutes', handler: e => (e.deltaY > 0 ? increaseminutes() : decreaseminutes()) },
      { id: 'seconds', handler: e => (e.deltaY > 0 ? increaseseconds() : decreaseseconds()) },
    ];

    handlers.forEach(({ id, handler }) => {
      const el = document.getElementById(id);
      el?.addEventListener('wheel', handler);
    });

    return () => {
      handlers.forEach(({ id, handler }) => {
        const el = document.getElementById(id);
        el?.removeEventListener('wheel', handler);
      });
    };
  }, [days, hours, minutes, seconds]);

  return (
    <div className="maincontainer">
      {isstarted ? (
        <NewTimer
          seconds={seconds}
          minutes={minutes}
          hours={hours}
          days={days}
          isstarted={isstarted}
          ispaused={ispaused}
          iscompleted={iscompleted}
          setiscompleted={setiscompleted}
          handleRestart={handleRestart}
          ref={childRef}
        />
      ) : (
        <div className="timesetter">
          {[
            { label: "Days", value: days, inc: increasedays, dec: decreasedays, max: 100 },
            { label: "Hours", value: hours, inc: increasehours, dec: decreasehours, max: 24 },
            { label: "Minutes", value: minutes, inc: increaseminutes, dec: decreaseminutes, max: 60 },
            { label: "Seconds", value: seconds, inc: increaseseconds, dec: decreaseseconds, max: 60 },
          ].map(({ label, value, inc, dec, max }) => (
            <div key={label} className={`${label.toLowerCase()} layout`}>
              <h2 className="headings">{label}</h2>
              <FontAwesomeIcon icon={faCaretUp} className="icon" onClick={inc} />
              <div className="numbers" id={label.toLowerCase()}>
                <h1 className="numberfirst">{String('0' + (value - 2 + max) % max).slice(-2)}</h1>
                <h1 className="numberup">{String('0' + (value - 1 + max) % max).slice(-2)}</h1>
                <h1 className="numbermiddle">{String('0' + value).slice(-2)}</h1>
                <h1 className="numberdown">{String('0' + (value + 1) % max).slice(-2)}</h1>
                <h1 className="numberlast">{String('0' + (value + 2) % max).slice(-2)}</h1>
              </div>
              <FontAwesomeIcon icon={faCaretDown} className="icon" onClick={dec} />
            </div>
          ))}
        </div>
      )}

      <div className="starticon">
        {isstarted ? (
          <div className="startedbuttons">
            <button className="playbutton reset" onClick={handleReset}>Stop</button>
            {iscompleted ? (
              <button className="playbutton reset" onClick={handleRestart}>Reset</button>
            ) : (
              <button className="playbutton reset" onClick={handleStart}>
                {ispaused ? 'Resume' : 'Pause'}
              </button>
            )}
          </div>
        ) : (
          <button className="play-icon" onClick={handleStart}>
            <FontAwesomeIcon icon={faPlay} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SetTime;
