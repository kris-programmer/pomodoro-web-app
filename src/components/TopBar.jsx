import React, { useState, useEffect } from "react";

const TopBar = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount to prevent memory leak
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex justify-between p-1">
      <p className="font-extrabold">Pomodoro</p>
      <p className="order-last">{formattedTime}</p>
    </div>
  );
};

export default TopBar;
