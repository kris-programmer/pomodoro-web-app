import React, { useState, useEffect } from "react";

const Timer = ({ minutes = 0, seconds = 0 }) => {
  const [timeLeft, setTimeLeft] = useState(1500); // Time is in seconds (25 mins)
  const [isRunning, setIsRunning] = useState(false);
  const [labelMode, setLabelMode] = useState("Work");

  // Input validation and zero padding
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return {
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(seconds).padStart(2, "0"),
    };
  };

  const { minutes: formattedMinutes, seconds: formattedSeconds } =
    formatTime(timeLeft);

  // Timer effect
  useEffect(() => {
    let intervalId;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, timeLeft]);

  function startTimer() {
    setIsRunning(true);
  }
  function pauseTimer() {
    setIsRunning(false);
  }
  function resetTimer() {
    setIsRunning(false);
    setTimeLeft(25 * 60); // Default pomodoro is 25 mins
    setLabelMode("Work");
  }

  return (
    <div
      className="flex flex-col w-full min-h-full items-center justify-center bg-gray-800 border border-white rounded-md gap-1"
      role="timer"
      aria-live="polite"
      aria-label={`${formattedMinutes} minutes and ${formattedSeconds} seconds remaining`}
    >
      <label className="current-job font-normal text-5xl">{labelMode}</label>
      <time dateTime={`PT${minutes}M${seconds}S`} className="text-9xl">
        {formattedMinutes}:{formattedSeconds}
      </time>

      <div className="btns flex gap-1 m-5">
        {isRunning === false ? (
          <button
            onClick={startTimer}
            className="p-1 border bg-gray-600 border-white m-2 hover:bg-gray-400"
          >
            Start Timer
          </button>
        ) : (
          <button
            onClick={pauseTimer}
            className="p-1 border bg-gray-600 border-white m-2 hover:bg-gray-400"
          >
            Pause Timer
          </button>
        )}

        <button
          onClick={resetTimer}
          className="p-1 border bg-gray-600 border-white m-2 hover:bg-gray-400"
        >
          Reset Timer
        </button>
      </div>

      <div className="quick-add-buttons flex gap-2 mt-4">
        <button
          onClick={() => setTimeLeft((prev) => prev + 300)}
          className="p-2 border bg-blue-600 border-white hover:bg-blue-400 m-1"
        >
          +5 min
        </button>
        <button
          onClick={() => setTimeLeft((prev) => Math.max(0, prev - 300))}
          className="p-2 border bg-blue-600 border-white hover:bg-blue-400 m-1"
        >
          -5 min
        </button>
        <button
          onClick={() => {
            setTimeLeft(15 * 60);
            setLabelMode("Long Break");
          }}
          className="p-2 border bg-purple-600 border-white hover:bg-purple-400 m-1"
        >
          Long Break
        </button>
        <button
          onClick={() => {
            setTimeLeft(5 * 60);
            setLabelMode("Short Break");
          }}
          className="p-2 border bg-purple-600 border-white hover:bg-purple-400 m-1"
        >
          Short Break
        </button>
      </div>
    </div>
  );
};

export default Timer;
