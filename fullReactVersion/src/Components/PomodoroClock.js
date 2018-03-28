import React from 'react';
import {Howl, Howler} from 'howler';
import Options from './Options';
import Display from './Display';
import Adjust from './Adjust';
import changeTime from '../Functions/changeTime';

export default class PomodoroClock extends React.Component {
  state = {
    selected: 'session',
    unit: 'min',
    sessionLength: "30:00",
    breakLength: "5:00",
  };

  timer = { countDown: null };

  changeTime = (mode, limType, lim1, lim2, state, timer) => {
    let newState = changeTime(mode, limType, lim1, lim2, this.state, this.timer);
    if (this.state.selected === 'session') {
      this.setState(() => ( {sessionLength: newState.sessionLength} ));
    } else {
      this.setState(() => ( {breakLength: newState.breakLength} ));
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
