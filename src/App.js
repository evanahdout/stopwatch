import React from "react";
import "./App.css";
import { useState } from "react";

function App() {
    const [breakLength, setBreakLength] = useState(5);
    const [sessionLength, setSessionLength] = useState(25);
    const [timeLeft, setTimeLeft] = useState("25:00");
    const [running, setRunning] = useState(false);

    while (running) {
        
    };



    return (
        <div id="application">
            <div id="break-label">Break Length</div>
            <div id="break-length">{breakLength}</div>
            <button id="break-increment">+</button>
            <button id="break-decrement">-</button>
            <div id="session-label">Session Length</div>
            <div id="session-length">{sessionLength}</div>
            <button id="session-increment">+</button>
            <button id="session-decrement">-</button>
            <div id="timer-label">Session</div>
            <div id="time-left">{timeLeft}</div>
            <button id="start_stop">||</button>
            <button id="reset">Reset</button>
        </div>
    )
}

export default App;

