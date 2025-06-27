import React, { useEffect, useState } from 'react';
import './Clock.css';      // Styling for the clock
import '../../Layout.css'; // Ensure this file exists or adjust the path

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [is24Hr, setIs24Hr] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  // Analog clock hand degrees
  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = ((hours % 12) * 30) + (minutes / 2);

  // Digital time formatting
  const displayHours = is24Hr ? hours : (hours % 12 || 12);
  const formattedTime = `${String(displayHours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
  const ampm = is24Hr ? '' : hours >= 12 ? 'PM' : 'AM';
  const formattedDate = `${String(time.getDate()).padStart(2, '0')} / ${String(time.getMonth() + 1).padStart(2, '0')} / ${time.getFullYear()}`;

  const toggleFormat = () => {
    setIs24Hr(!is24Hr);
  };

  return (
    <div className="clock-layout">
      {/* Analog Clock */}
      <div className="analog-clock">
        <div className="hand hour" style={{ transform: `rotate(${hourDeg}deg)` }}></div>
        <div className="hand minute" style={{ transform: `rotate(${minuteDeg}deg)` }}></div>
        <div className="hand second" style={{ transform: `rotate(${secondDeg}deg)` }}></div>
        <div className="center-dot"></div>
        {[...Array(12)].map((_, i) => (
          <div key={i} className={`tick ${i % 3 === 0 ? 'large' : 'small'}`} style={{ transform: `rotate(${i * 30}deg)` }}></div>
        ))}
      </div>

      {/* Digital Time & Date */}
      <div className="digital-section">
        <div className="digital-time">
          {formattedTime}
          {!is24Hr && <span className="ampm"> {ampm}</span>}
        </div>

        <label className="switch">
          <input type="checkbox" checked={is24Hr} onChange={toggleFormat} />
          <span className="slider">
            <span className="slider-label">{is24Hr ? '24hrs' : '12hrs'}</span>
          </span>
        </label>

        <div className="date-display">{formattedDate}</div>
      </div>
    </div>
  );
};

export default Clock;
