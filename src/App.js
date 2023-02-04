import React from "react";
import "./App.css";
import { useState, useEffect, useRef } from "react";

function App() {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState(1500);
    const [isRunning, setIsRunning] = useState(false);
    const [isSession, setIsSession] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
        let intervalId;
        if (isRunning) {
          intervalId = setInterval(() => {
            setTimeLeft(timeLeft - 1);
          }, 1000);
          if (timeLeft === 0) {
            audioRef.current.play();
            setTimeLeft(isSession ? breakLength * 60 : sessionLength * 60);
            setIsSession(!isSession);
          }
        }
        return () => clearInterval(intervalId);
      }, [isRunning, timeLeft, breakLength, sessionLength, isSession]);

    const handleReset = () => {
        setBreakLength(5);
        setSessionLength(25);
        setTimeLeft(1500);
        setIsRunning(false);
        setIsSession(true);
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
    }

    const handleBreakIncrement = () => {
        if (breakLength < 60 && !isRunning) {
            setBreakLength(breakLength + 1);
        }
    }

    const handleBreakDecrement = () => {
        if (breakLength > 1 && !isRunning) {
            setBreakLength(breakLength - 1);
        }
    }

    const handleSessionIncrement = () => {
        if (sessionLength < 60 && !isRunning) {
            setSessionLength(sessionLength + 1);
            setTimeLeft((sessionLength + 1) * 60);
        }
    }

    const handleSessionDecrement = () => {
        if (sessionLength > 1 && !isRunning) {
            setSessionLength(sessionLength - 1);
            setTimeLeft((sessionLength - 1) * 60);
        }
    }

    const handleStartStop = () => {
        setIsRunning(!isRunning);
    }

    const getFormattedTime = time => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? "0" + minutes : minutes}:${
          seconds < 10 ? "0" + seconds : seconds
        }`;
      };

    return (
        <div id="application">
            <div id="timer">
                <div id="header">Timer</div>
                <div id="length-wrappers">
                    <div id="session-wrapper">
                        <div id="session-label">Session Length</div>
                        <div id="session-counter-wrapper">
                            <button id="session-decrement" onClick={handleSessionDecrement}>
                                <i class="fa-solid fa-arrow-down fa-2x"></i>
                            </button>
                            <div id="session-length">{sessionLength}</div>
                            <button id="session-increment" onClick={handleSessionIncrement}>
                                <i class="fa-solid fa-arrow-up fa-2x"></i>
                            </button>
                        </div>
                    </div>
                    <div id="gap"></div>
                    <div id="break-wrapper">
                        <div id="break-label">Break Length</div>
                        <div id="break-counter-wrapper">
                            <button id="break-decrement" onClick={handleBreakDecrement}>
                                <i class="fa-solid fa-arrow-down fa-2x"></i>
                            </button>
                            <div id="break-length">{breakLength}</div>
                            <button id="break-increment" onClick={handleBreakIncrement}>
                                <i class="fa-solid fa-arrow-up fa-2x"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div id="time-wrapper">
                    <div id="timer-label">{isSession ? 'Session' : 'Break'}</div>
                    <div id="time-left">{getFormattedTime(timeLeft)}</div>
                </div>
                <div id="settings-wrapper">
                    <button id="start_stop" onClick={handleStartStop}>
                        <i class="fa-solid fa-play fa-2x"></i>
                        <i class="fa-solid fa-pause fa-2x"></i>
                    </button>
                    <button id="reset" onClick={handleReset}>
                        <i class="fa-solid fa-rotate fa-2x"></i>
                    </button>
                </div>
            </div>
            <audio id="beep" ref={audioRef} src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"></audio>
        </div>
    )
}

export default App;