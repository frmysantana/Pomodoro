import React from 'react';
import Options from './Options.js';
import Display from './Display.js';
import Adjust from './Adjust.js';

export default class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.timer = {};
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSub = this.handleSub.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.changeUnit = this.changeUnit.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.state = {
      selected: props.selected,
      unit: props.unit,
      sessionLength: props.sessionLength,
      breakLength: props.breakLength
    };
  }
    
  handleAdd() {
    let min, sec, sel = this.state.selected;
    
    if (sel === 'session') {
      min = this.state.sessionLength.split(':')[0];
      sec = this.state.sessionLength.split(':')[1];
      
      if (this.state.unit === "min") {
        min = parseInt(min) + 1;
      } else {
        if (parseInt(sec) === 59) {
          sec = 0;
          min = parseInt(min) + 1;
        } else {
          sec = parseInt(sec) + 1; 
        }
        
        sec = (sec < 10) ? '0' + sec : sec;
      }
    
      this.setState(() => ({sessionLength: min + ':' + sec}));
    } else {
      min = this.state.breakLength.split(':')[0];
      sec = this.state.breakLength.split(':')[1];
      
      if (this.state.unit === "min") {
        min = parseInt(min) + 1;
      } else {
        if (parseInt(sec) === 59) {
          sec = 0;
          min = parseInt(min) + 1;
        } else {
          sec = parseInt(sec) + 1; 
        }
        
        sec = (sec < 10) ? '0' + sec : sec;
      }
    
      this.setState(() => ({breakLength: min + ':' + sec}));
    }
  }
    
  handleSub() {
    let min, sec, sel = this.state.selected;
    
    if (sel === 'session') {
      min = this.state.sessionLength.split(':')[0];
      sec = this.state.sessionLength.split(':')[1];
      
      if (this.state.unit === "min") {
        min = parseInt(min) - 1;
      } else {
        if (parseInt(sec) === 0) {
          sec = 59;
          min = parseInt(min) - 1;
        } else {
          sec = parseInt(sec) - 1; 
        }
        
        sec = (sec < 10) ? '0' + sec : sec;
      }
    
      this.setState(() => ({sessionLength: min + ':' + sec}));
      
      if (this.timer.countDown && this.state.sessionLength === '0:00') {
        document.querySelectorAll('p')[0].style.display = 'none';
        document.querySelectorAll('p')[1].style.display = 'block';
        this.setState(() => ({
          selected: 'break',
          sessionLength: this.timer.defaultSession
        }));
        alert('Session is over! Take a break.');
      }
    } else {
      min = this.state.breakLength.split(':')[0];
      sec = this.state.breakLength.split(':')[1];
      
      if (this.state.unit === "min") {
        min = parseInt(min) - 1;
      } else {
        if (parseInt(sec) === 0) {
          sec = 59;
          min = parseInt(min) - 1;
        } else {
          sec = parseInt(sec) - 1; 
        }
        
        sec = (sec < 10) ? '0' + sec : sec;
      }
    
      this.setState(() => ({breakLength: min + ':' + sec}));
      
      if (this.timer.countDown && this.state.breakLength === '0:00') {
        document.querySelectorAll('p')[0].style.display = 'block';
        document.querySelectorAll('p')[1].style.display = 'none';
        this.setState(() => ({
          selected: 'session',
          breakLength: this.timer.defaultBreak
        }));
        alert('Break is over! Starting next session.');
      }
    }
  }
    
  changeSelected(newSel) {
    this.setState(() => ({ selected: newSel }));
  }
  
  changeUnit(newUnit) {
    this.setState(() => ({ unit: newUnit}));
  }
    
  startTimer() {
    if (!this.timer.countDown) {
      this.timer.defaultSession = this.state.sessionLength;
      this.timer.defaultBreak = this.state.breakLength;
      this.state.selected = 'session', this.state.unit = 'sec';
      this.timer.countDown = setInterval(this.handleSub, 1000);
    
      document.querySelectorAll("input[type='radio']").forEach(function(el) {
        el.disabled = true;
      });
      
      document.querySelectorAll(".js-adjust-time").forEach(function(el) {
        el.disabled = true;
      });
      document.querySelectorAll('p')[1].style.display = 'none';
    }
  }
    
  stopTimer() {
    clearInterval(this.timer.countDown);
    delete this.timer.countDown;
    
    document.querySelectorAll("input[type='radio']").forEach(function(el) {
      el.disabled = false;
    });
      
    document.querySelectorAll(".js-adjust-time").forEach(function(el) {
      el.disabled = false;
    });
    
    document.querySelectorAll('p').forEach(function(el) {
      el.style.display = 'block';
    });
    
    this.setState(() => ({
      sessionLength: this.timer.defaultSession,
      breakLength: this.timer.defaultBreak
    }));
  }
    
  render() {
    return (
      <div id="Clock">
        <Options 
          changeSelected = {this.changeSelected}
        />
        <Display
          sessionLength = {this.state.sessionLength}
          breakLength = {this.state.breakLength}
          startTimer = {this.startTimer}
          stopTimer = {this.stopTimer}
        />
        <Adjust
          unit = {this.state.unit}
          changeUnit = {this.changeUnit}
          handleAdd = {this.handleAdd}
          handleSub = {this.handleSub}
        />
      </div>
    );
  }
}
  
PomodoroClock.defaultProps = {
  selected: 'session',
  unit: 'min',
  sessionLength: "25:00",
  breakLength: "5:00",
  countDown: null
};
