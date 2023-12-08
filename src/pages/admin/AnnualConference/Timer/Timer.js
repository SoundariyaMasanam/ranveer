import React from 'react'
import { useState, useEffect } from 'react';
import "assets/css/AnnualConference/Timer.css"
// import moment from 'moment';

const Timer = ({ start_on }) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  // let deadline = '2023-06-29 08:49:00';

  const getTime = (deadline) => {
    if (new Date(deadline).getTime() > Date.now()) {
      var delta = Math.abs(new Date(deadline).getTime() - Date.now()) / 1000;
      setDays(Math.floor(delta / 86400));
      delta -= days * 86400;
      setHours(Math.floor(delta / 3600) % 24);
      delta -= hours * 3600;
      setMinutes(Math.floor(delta / 60) % 60);
      delta -= minutes * 60;
      setSeconds(Math.floor(delta % 60));
    }else{
      setDays(0)
      setHours(0)
      setMinutes(0)
      setSeconds(0)
    }
  };
  useEffect(() => {
    const interval = setInterval(() => getTime(start_on), 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="timer" role="timer" style={{ background: '#000' }}>
      <div className="col-4 date_time">
        <div className="boxes">
          <p id="day">{days < 10 ? "0" + days : days}</p>
          <span className="text">Days</span>
        </div>
      </div>
      <div className="col-4 date_time">
        <div className="boxes">
          <p id="hour">{hours < 10 ? "0" + hours : hours}</p>
          <span className="text">Hours</span>
        </div>
      </div>
      <div className="col-4 date_time">
        <div className="boxes">
          <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
          <span className="text">Minutes</span>
        </div>
      </div>
      <div className="col-4 date_time">
        <div className="boxes">
          <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
          <span className="text">Seconds</span>
        </div>
      </div>
    </div>
  )
}

export default Timer