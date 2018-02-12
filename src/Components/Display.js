import React from 'react';

const Display = (props) => {
    return (
      <div>
        <h2>Pomodoro Timer</h2>
        <p>Session Length: {props.sessionLength}</p>
        <p>Break Length: {props.breakLength}</p>
        <button onClick={props.startTimer}>Start</button>
        <button onClick={props.stopTimer}>Stop</button>
      </div>
    );
}

export default Display;