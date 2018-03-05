import React from 'react';
import {Howl, Howler} from 'howler';
import Options from './Options.js';
import Display from './Display.js';
import Adjust from './Adjust.js';

export default class PomodoroClock extends React.Component {
  state = {
    selected: this.props.selected,
    unit: this.props.unit,
    sessionLength: this.props.sessionLength,
    breakLength: this.props.breakLength
  };

  // incOrDec and lessOrGreat are used to generalize changeTime so it works 
  // for both + and - buttons/
  incOrDec = [
    function(num) {return num + 1;},
    function(num) {return num - 1;}
  ];

  lessOrGreat = [
    function(var1, var2) {return var1 < var2;},
    function(var1, var2) {return var1 > var2;}
  ];  

  timer = {};

  // Default values set changeTime up to decrement the timer once 'start' has 
  // been clicked
  changeTime = (mode = 'sub', limType, lim1 = 0, lim2 = 0) => {
    /* Increases or decreases the selected timer (from this.selected) based 
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
            values for this.state.selected and mode.
      lim2: Number corresponding to the limit for the '-' button Depends on the 
            values for this.state.selected and mode.

    Outputs: None.
     */

    let min, sec;
    const sel = this.state.selected;
    const timeLimit = (sel === 'session') ? lim1 : lim2;
    // Set up correct alert message.
    const message = `The ${limType} ${sel} time is ${timeLimit}.`;
    const timeLength = (sel === 'session') ? this.state.sessionLength :
      this.state.breakLength;
    const i = (mode === 'add') ? 0 : 1;

    min = parseInt(timeLength.split(':')[0]);
    sec = parseInt(timeLength.split(':')[1]);

    // Changing minutes
    if (this.state.unit === "min") {
        // Enforcing time limit
        if (this.lessOrGreat[i](min, Math.floor(timeLimit))) {
            min = this.incOrDec[i](min);
            sec = (sec < 10) ? '0' + sec : sec;
        } 
        else {alert(message); sec = (sec < 10) ? '0' + sec : sec;}
    } 
    // Changing seconds
    else {
        // Enforcing time limit
        if (sec === Math.round((timeLimit % 1)*100) && 
        this.lessOrGreat[i](min, Math.floor(timeLimit))) {
            sec = (mode === 'add') ? 0 : 59; 
            min = this.incOrDec[i](min);
            sec = (sec < 10) ? '0' + sec : sec;
        } else if (this.lessOrGreat[i](min + (sec/100), timeLimit)) {
            sec = this.incOrDec[i](sec);
            sec = (sec < 10) ? '0' + sec : sec;
        } else {
            alert(message); sec = (sec === 0) ? '0' + sec : sec;
        }
    }

    // Update corresponding state
    if (sel === 'session') {
        this.setState(() => ({sessionLength: min + ':' + sec}));
    } else {
        this.setState(() => ({breakLength: min + ':' + sec}));
    }

    // Call didTimeEnd() when changeTime is being used as a timer.
    if (this.timer.countDown) {this.didTimeEnd();}
  }

  didTimeEnd = () => {
    /* Checks if the current active timer has run out. If it has, it is hidden
    from the user and reset to its starting time while the other timer is 
    revealed and the user is alerted to the changing timers.

    Inputs: None.
    Outputs: None.
    */
    let message, i;
    const activePar = document.querySelector('.active');
    const switchObj = {
        0: 1, 
        1: 0
      };
  
    // Switch timer and alert user
    if (activePar.children[0].innerHTML === '0:00') {
  
      // Find index of timer that just ended
      const pars = document.querySelectorAll('p');
      pars.forEach(function (el, index) {
        if (el === activePar) {
          i = index;
        }
      });
  
      // Show paragraph of timer that is about to start
      document.querySelectorAll('p')[switchObj[i]].classList.add('active');
      document.querySelectorAll('p')[switchObj[i]].classList.remove('hide');
  
      // Hide paragraph of timer that just finished
      document.querySelectorAll('p')[i].classList.add('hide');
      document.querySelectorAll('p')[i].classList.remove('active');
  
      // Return the ended timer to its initial time and switch this.state.selected
      // so that changeTime will work with the new displayed timer.
      if (this.state.selected === 'session') {
        this.setState(() => ({
          selected: 'break',
          sessionLength: this.timer.defaultSession
        }));
        message = 'Session is over! Take a break.';
      } else {
        this.setState(() => ({
          selected: 'session',
          breakLength: this.timer.defaultBreak
        }));
        message = 'Break is over! Starting next session.';
      }
  
      // Sound an alarm and alert the user to the change in timers.
      setTimeout(function() {
        const sound = new Howl({
          src: ['./assets/Alarm.mp3', './assets/Alarm.ogg'],
          onplay: function() {
                  alert(message);
                  this.stop();
              },
        });
        sound.play();
      }, 1);
    }
  }
    
  changeSelected = (newSel) => { this.setState(() => ({ selected: newSel })); }
  
  changeUnit = (newUnit) => { this.setState(() => ({ unit: newUnit})); }
    
  startTimer = () => {
    /* Begins the timer by initiating the needed parameters in this.timer,
    disabling the radio inputs and '+' and '-' buttons, ensuring the needed
    state properties and showing only the session timer.

    Inputs and Outputs: None.
     */

    if (!this.timer.countDown) {
      this.timer.defaultSession = this.state.sessionLength;
      this.timer.defaultBreak = this.state.breakLength;
      this.timer.defaultUnit = this.state.unit;
      this.state.selected = 'session', this.state.unit = 'sec';
      this.timer.countDown = setInterval(this.changeTime, 1000);
    
      document.querySelectorAll("input[type='radio']").forEach(function(el) {
        el.disabled = true;
      });
      
      document.querySelectorAll(".js-adjust-time").forEach(function(el) {
        el.disabled = true;
      });

      document.querySelectorAll('p')[0].classList.add('active');
      document.querySelectorAll('p')[1].classList.add('hide');
    }
  }
    
  stopTimer = () => {
    /* Removes the setInterval function on this.timer, thereby stoping the timer.
    Also enables the radio and '+' and '-' buttons, displays both of the timers
    and ensures correct state properties.

    Inputs and Outputs: None.
     */
    
    if (!!this.timer.countDown) {
      clearInterval(this.timer.countDown);
      delete this.timer.countDown;
      
      document.querySelectorAll("input[type='radio']").forEach(function(el) {
        el.disabled = false;
      });
        
      document.querySelectorAll(".js-adjust-time").forEach(function(el) {
        el.disabled = false;
      });
      
      document.querySelectorAll('p').forEach(function(el) {
        el.classList.remove('active');
        el.classList.remove('hide');
      });
      
      this.setState(() => ({
        selected: 'session', unit: this.timer.defaultUnit,
        sessionLength: this.timer.defaultSession || this.props.sessionLength,
        breakLength: this.timer.defaultBreak || this.props.breakLength
      }));
    }
  }
    
  render() {
    return (
      <div id="Clock">
        <Options 
          changeSelected = {this.changeSelected}
        />
        <Display
          selected = {this.state.selected}
          sessionLength = {this.state.sessionLength}
          breakLength = {this.state.breakLength}
          startTimer = {this.startTimer}
          stopTimer = {this.stopTimer}
        />
        <Adjust
          unit = {this.state.unit}
          changeUnit = {this.changeUnit}
          changeTime = {this.changeTime}
        />
      </div>
    );
  }
}
  
PomodoroClock.defaultProps = {
  selected: 'session',
  unit: 'min',
  sessionLength: "0:05",
  breakLength: "0:05",
  countDown: null
};
