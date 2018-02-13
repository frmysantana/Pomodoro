import React from 'react';

const Display = (props) => {
    return (
      <div id="Display">
        <h2>Pomodoro Timer</h2>
        <p>Session Length: {props.sessionLength}</p>
        <p>Break Length: {props.breakLength}</p>
        <button onClick={props.startTimer} className="start-stop">Start</button>
        <button onClick={props.stopTimer} className="start-stop">Stop</button>
      </div>
    );
}

export default Display;
