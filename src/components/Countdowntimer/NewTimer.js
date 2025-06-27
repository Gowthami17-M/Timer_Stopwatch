/* This cleanup involves:
  1. Removing unused variables/imports
  2. Fixing useEffect dependencies
  3. General improvements for clarity */

// --- Updated NewTimer.js ---

import React, { useState, useEffect, useImperativeHandle, forwardRef } from "react";
import './NewTimer.css';

const NewTimer = forwardRef(({ seconds: initSec, minutes: initMin, hours: initHr, days: initDay, isstarted, ispaused, iscompleted, setiscompleted }, ref) => {
  const [seconds, setSeconds] = useState(initSec);
  const [minutes, setMinutes] = useState(initMin);
  const [hours, setHours] = useState(initHr);
  const [days, setDays] = useState(initDay);
  const [progressbarwidth, setprogressbarWidth] = useState(100);
  const [color, setcolor] = useState(['blue', 'rgb(170, 0, 255)']);
  const totalSeconds = initDay * 86400 + initHr * 3600 + initMin * 60 + initSec;
  const [timeleft, settimeleft] = useState(totalSeconds);

  useImperativeHandle(ref, () => ({
    assignvalues() {
      setSeconds(initSec);
      setMinutes(initMin);
      setHours(initHr);
      setDays(initDay);
      setprogressbarWidth(100);
      settimeleft(totalSeconds);
      setcolor(['blue', 'rgb(170, 0, 255)']);
    }
  }));

  useEffect(() => {
    let interval = null;
    if (isstarted && !ispaused) {
      interval = setInterval(() => {
        settimeleft((prevTimeleft) => {
          if (prevTimeleft <= 0) return 0;
          return prevTimeleft - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isstarted, ispaused]);

  useEffect(() => {
    if (timeleft <= 0) {
      setiscompleted(true);
      setprogressbarWidth(0);
      return;
    }
    const newSeconds = timeleft % 60;
    const totalMins = Math.floor(timeleft / 60);
    const newMinutes = totalMins % 60;
    const totalHrs = Math.floor(totalMins / 60);
    const newHours = totalHrs % 24;
    const newDays = Math.floor(totalHrs / 24);

    setSeconds(newSeconds);
    setMinutes(newMinutes);
    setHours(newHours);
    setDays(newDays);

    setprogressbarWidth((timeleft / totalSeconds) * 100);
    if (timeleft <= totalSeconds / 4) setcolor(['red', color[1]]);
    else if (timeleft <= totalSeconds / 2) setcolor(['orange', color[1]]);
  }, [timeleft]);

  return (
    <div className="startingtimer">
      <h1 className="newtimer">
        {[{ label: "Day", value: days }, { label: "Hour", value: hours }, { label: "Minute", value: minutes }, { label: "Second", value: seconds }].map(({ label, value }, index) => (
          <div className="countdownlabels" key={label}>
            <p>{value === 1 ? label : label + 's'}</p>
            <p className="countdownnumbers" style={{ color: color[0] }}>
              {String("0" + value).slice(-2)}
            </p>
            {label !== "Second" && <h1 className={`colon colon${index + 1}`} style={{ color: color[0] }}>:</h1>}
          </div>
        ))}
      </h1>
      <div className="progressbar">
        <span
          className="progressbarindicator"
          id="progressbar"
          style={{ width: `${progressbarwidth}%`, backgroundImage: `linear-gradient(to right, ${color[0]}, ${color[1]})` }}
        ></span>
      </div>
    </div>
  );
});

export default NewTimer;


// NOTE: Your Timer.js is mostly good; no unused vars. Just remove unused icon imports if you don't use them in JSX.
// Remove in Timer.js:
// import {faPlay, faSquare, faPause, faRotateForward}  <- if not used in JSX

// In Stopwatch.js, remove 'displaycountdown' if unused.
