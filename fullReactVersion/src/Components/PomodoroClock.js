import React from 'react';
import {Howl, Howler} from 'howler';
import Options from './Options.js';
import Display from './Display.js';
import Adjust from './Adjust.js';

export default class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.incOrDec = [
      function(num) {return num + 1;},
      function(num) {return num - 1;}
    ];
    this.lessOrGreat = [
      function(var1, var2) {return var1 < var2;},
      function(var1, var2) {return var1 > var2;}
    ];  
    this.timer = {};
    this.changeTime = this.changeTime.bind(this);
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

  changeTime(mode = 'sub', limType, lim1 = 0, lim2 = 0) {
    let min, sec;
    const sel = this.state.selected;
    const timeLimit = (sel === 'session') ? lim1 : lim2;
    const message = `The ${limType} ${sel} time is ${timeLimit}.`;
    const timeLength = (sel === 'session') ? this.state.sessionLength :
      this.state.breakLength;
    const i = (mode === 'add') ? 0 : 1;

    // console.log()
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
  }

  handleAdd() {
    let min, sec, sel = this.state.selected, timerLimit;
    timerLimit = (sel = 'session') ? timerLimit = 59: timerLimit= 29;

    let {selected} = this.state;
    console.log(selected);

    if (sel === 'session') {
      min = parseInt(this.state.sessionLength.split(':')[0]);
      sec = parseInt(this.state.sessionLength.split(':')[1]);

      
      if (this.state.unit === "min") {
        if (min < 59) {
          min = min + 1;
        } else {
          alert('The maximum session time is 59:59.');
        }
      } else {
        if (sec === 59 && min < 59) {
          sec = 0;
          min = min + 1;
          sec = (sec < 10) ? '0' + sec : sec;
        } else if (min + (sec/100) < 59.59) {
          sec = sec + 1;
          sec = (sec < 10) ? '0' + sec : sec;
        } else {
          alert('The maximum session time is 59:59.');
        }
      }
    
      this.setState(() => ({sessionLength: min + ':' + sec}));
    } else {
      min = parseInt(this.state.breakLength.split(':')[0]);
      sec = parseInt(this.state.breakLength.split(':')[1]);
      timerLimit = 29;
      
      if (this.state.unit === "min") {
        if (min < 29) {
          min = min + 1;
        } else {
          alert('The maximum break time is 29:59.');
        }
      } else {
        if (sec === 59 && min < 29) {
          sec = 0;
          min = min + 1;
          sec = (sec < 10) ? '0' + sec : sec;
        } else if (min + (sec/100) < 29.59) {
          sec = sec + 1;
          sec = (sec < 10) ? '0' + sec : sec;
        } else {
          alert('The maximum break time is 29:59')
        }
      }
    
      this.setState(() => ({breakLength: min + ':' + sec}));
    }
  }
    
  handleSub() {
    let min, sec, sel = this.state.selected;
    
    if (sel === 'session') {
      min = parseInt(this.state.sessionLength.split(':')[0]);
      sec = parseInt(this.state.sessionLength.split(':')[1]);
      
      if (this.state.unit === "min") {
        if (min > 0) {
          min = min - 1;
        } else {
          alert('The minimum session time is 5:00.');
        }
      } else {
        if (sec === 0 && min > 0) {
          sec = 59;
          min = min - 1;
          sec = (sec < 10) ? '0' + sec : sec;
        } else if (min + (sec/100) > 0.00) {
          sec = sec - 1;
          sec = (sec < 10) ? '0' + sec : sec; 
        } else {
          alert('The minimum session time is 5:00.');
          sec = (sec === 0) ? '0' + sec: sec;
        }
      }
    
      this.setState(() => ({sessionLength: min + ':' + sec}));
      
      if (this.timer.countDown && document.querySelectorAll('span')[0].innerHTML === '0:00') {
        document.querySelectorAll('p')[0].classList.add('hide');
        document.querySelectorAll('p')[0].classList.remove('active');

        document.querySelectorAll('p')[1].classList.add('active');
        document.querySelectorAll('p')[1].classList.remove('hide');

        this.setState(() => ({
          selected: 'break',
          sessionLength: this.timer.defaultSession
        }));

        setTimeout(function() {
          const sound = new Howl({
            src: ['./assets/Alarm.mp3', './assets/Alarm.ogg'],
            onplay: function() {
              alert('Session is over! Take a break.');
              this.stop();
            },
          });
          sound.play();
        }, 1);
      }
    } else {
      min = parseInt(this.state.breakLength.split(':')[0]);
      sec = parseInt(this.state.breakLength.split(':')[1]);
      
      if (this.state.unit === "min") {
        if (min > 0) {
          min = min - 1;
        } else {
          alert('The minimum break time is 1:00.');
        }
      } else {
        if (sec === 0 && min > 0) {
          sec = 59;
          min = min - 1;
          sec = (sec < 10) ? '0' + sec : sec;
        } else if (min + (sec/100) > 0.00) {
          sec = sec - 1;
          sec = (sec < 10) ? '0' + sec : sec;
        } else {
          alert('The minimum break time is 1:00.');
          sec = (sec === 0) ? '0' + sec : sec;
        }
      }
    
      this.setState(() => ({breakLength: min + ':' + sec}));
      
      if (this.timer.countDown && document.querySelectorAll('span')[1].innerHTML === '0:00') {
        document.querySelectorAll('p')[0].classList.remove('hide');
        document.querySelectorAll('p')[0].classList.add('active');

        document.querySelectorAll('p')[1].classList.add('hide');
        document.querySelectorAll('p')[1].classList.remove('active');
        
        this.setState(() => ({
          selected: 'session',
          breakLength: this.timer.defaultBreak
        }));

        setTimeout(function() {
          const sound = new Howl({
            src: ['./assets/Alarm.mp3', './assets/Alarm.ogg'],
            onplay: function() {
              alert('Break is over! Starting next session.');
              this.stop();
            },
          });
          sound.play();
        }, 1);
      }
    }
  }
    
  changeSelected(newSel) { this.setState(() => ({ selected: newSel })); }
  
  changeUnit(newUnit) { this.setState(() => ({ unit: newUnit})); }
    
  startTimer() {
    if (!this.timer.countDown) {
      this.timer.defaultSession = this.state.sessionLength;
      this.timer.defaultBreak = this.state.breakLength;
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
      el.classList.remove('active');
      el.classList.remove('hide');
    });
    
    this.setState(() => ({
      selected: 'session',
      sessionLength: this.timer.defaultSession || this.props.sessionLength,
      breakLength: this.timer.defaultBreak || this.props.breakLength
    }));
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
  sessionLength: "6:05",
  breakLength: "0:05",
  countDown: null
};
