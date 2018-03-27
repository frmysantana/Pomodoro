import didTimeEnd from './didTimeEnd.js';

// incOrDec and lessOrGreat are used to generalize changeTime so it works 
// for both + and - buttons/
let incOrDec = [
  function(num) {return num + 1;},
  function(num) {return num - 1;}
];

let lessOrGreat = [
  function(var1, var2) {return var1 < var2;},
  function(var1, var2) {return var1 > var2;}
];  

let changeTime = (mode = 'sub', limType, lim1 = 0, lim2 = 0, state, timer) => {
    /* Increases or decreases the selected timer (from state.selected) based 
    on which button was clicked (either '+' or '-' in Adjust.js component). Also
    used to decrement the active timer when the 'start' button is clicked and
    calls didTimeEnd() at the end in this case.

    Inputs: 
        mode: Either 'add' or 'sub', depending on which button was clicked.
            Affects whether the selected time will be increased or decreased, 
            respectively. Default value is for using this function in the setInterval
            function.
        limType: Either 'maximum' or 'minimum', depending on which button was clicked.
            Ensures the alert message for when the limit is enforced is correct.
        lim1: Number corresponding to the limit for the '+' button. Depends on the 
            values for state.selected and mode.
        lim2: Number corresponding to the limit for the '-' button Depends on the 
            values for state.selected and mode.

    Outputs: If the time change is within the limits for the operation, will return
        the state with the corresponding timer length changed.
    */

    let min, sec;
    const sel = state.selected;
    const timeLimit = (sel === 'session') ? lim1 : lim2;
    // Set up correct alert message.
    const message = `The ${limType} ${sel} time is ${timeLimit}.`.replace(/\.(?=\d)/, ':');
    const timeLength = (sel === 'session') ? state.sessionLength :
        state.breakLength;
    const i = (mode === 'add') ? 0 : 1;

    min = parseInt(timeLength.split(':')[0]);
    sec = parseInt(timeLength.split(':')[1]);
    
    // Changing minutes
    if (state.unit === "min") {
        // Enforcing time limit
        if (lessOrGreat[i](min, Math.floor(timeLimit))) {
            min = incOrDec[i](min);
            sec = (sec < 10) ? '0' + sec : sec;
        } 
        else {
            if (!timer.countDown) {
                alert(message); sec = (sec < 10) ? '0' + sec : sec;
            }
        }
    } 
    // Changing seconds
    else {
        // Enforcing time limit
        if (sec === Math.round((timeLimit % 1)*100) && 
        lessOrGreat[i](min, Math.floor(timeLimit))) {
            sec = (mode === 'add') ? 0 : 59; 
            min = incOrDec[i](min);
            sec = (sec < 10) ? '0' + sec : sec;
        } else if (lessOrGreat[i](min + (sec/100), timeLimit)) {
            sec = incOrDec[i](sec);
            sec = (sec < 10) ? '0' + sec : sec;
        } else {
            if (!timer.countDown) {
                alert(message); sec = (sec === 0) ? '0' + sec : sec;
            }
        }
    }

    // Update corresponding state
    if (sel === 'session') {
        state.sessionLength = min + ':' + sec;
    } else {
        state.breakLength = min + ':' + sec;
    }
    // Call didTimeEnd() when changeTime is being used as a timer.
    if (timer.countDown) {didTimeEnd(state, timer);}
    
    return state;
}

export default changeTime;