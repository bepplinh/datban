import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ initialSeconds = 10 }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (seconds === 0) {
      clearInterval(interval);
      alert("Hết giờ!");
      setIsActive(false);
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  // Hàm định dạng thời gian
  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>{formatTime(seconds)}</h1>
      <button onClick={() => setIsActive(!isActive)}>
        {isActive ? 'Tạm dừng' : 'Bắt đầu'}
      </button>
      <button onClick={() => { setSeconds(initialSeconds); setIsActive(false); }}>
        Đặt lại
      </button>
    </div>
  );
};

export default CountdownTimer;