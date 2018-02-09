class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSub = this.handleSub.bind(this);
    this.changeSelected = this.changeSelected.bind(this);
    this.changeUnit = this.changeUnit.bind(this);
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
    }
  }
  
  changeSelected(newSel) {
    this.setState(() => ({ selected: newSel }));
  }
  
  changeUnit(newUnit) {
    this.setState(() => ({ unit: newUnit}));
  }
  
  handleStart() {
    this.setState(() => (
      
    ));
  }
  
  handleStop() {
    
  }
  
  render() {
    return(
      <div>
          <Options 
            changeSelected = {this.changeSelected}
          />
          <Display
            sessionLength = {this.state.sessionLength}
            breakLength = {this.state.breakLength}
            handleStart = {this.state.handleStart}
            handleStop = {this.state.handleStop}
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
  breakLength: "5:00"
};

class Options extends React.Component {
  constructor() {
    super();
    this.changeSelected = this.changeSelected.bind(this);
    this.state = {};
  }
  
  changeSelected(e) {
    this.props.changeSelected(e.target.id);
  }
  
  render() {
    return (
      <div>
        <label for="session">Session Length</label>
        <input 
          type="radio" name="portion"
          id="session" onClick={this.changeSelected}
        />
        
        <label for="break">Break Length</label>
        <input type="radio" name="portion" id="break" 
          onClick={this.changeSelected}
        />
      </div>
    );
  }
}

const Display = (props) => {
  return (
    <div>
      <h2>Pomodoro Timer</h2>
      <p>Session Length: {props.sessionLength}</p>
      <p>Break Length: {props.breakLength}</p>
      <button onClick={this.props.handleStart}>Start</button>
      <button onClick={this.props.handleStop}>Stop</button>
    </div>
  );
}

class Adjust extends React.Component {
  constructor() {
    super();
    this.changeUnit = this.changeUnit.bind(this);
    this.state={};
  }
  
  changeUnit(e) {
    this.props.changeUnit(e.target.id);
  }
  
  render() {
    return (
      <div>
        <label for="minutes">Minutes</label>
        <input type="radio" name="unit"
          id="min" onClick = {this.changeUnit}
        />
      
        <label for="seconds">Seconds</label>
        <input type="radio" name="unit" 
          id="sec" onClick = {this.changeUnit}
        />
        
        <button onClick={this.props.handleAdd}>+</button>
        <button onClick={this.props.handleSub}>-</button>
      </div>
    );
  }
}

ReactDOM.render(<PomodoroClock />, document.getElementById('container'));
