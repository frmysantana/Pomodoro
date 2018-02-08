class PomodoroClock extends React.Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleSub = this.handleSub.bind(this);
    this.state = {
      selected: props.selected,
      unit: props.unit,
      sessionLength: props.sessionLength,
      breakLength: props.breakLength
    };
  }
  
  handleAdd() {
    let min = this.state.sessionLength.split(':')[0];
    const sec = this.state.sessionLength.split(':')[1];
    min = parseInt(min) + 1;
    this.setState(() => ({sessionLength: min + ':' + sec}));
  }
  
  handleSub() {
    let min = this.state.sessionLength.split(':')[0];
    const sec = this.state.sessionLength.split(':')[1];
    min = parseInt(min) - 1;
    this.setState(()=> ({ sessionLength: min + ':' + sec}));
  }
  
  changeSelected(newSel) {
    this.setState(()=> ({ selected: newSel }));
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log(this.state);
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
          />
          <Adjust
            unit = {this.state.unit}
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
    console.log(e.target.id);
    this.props.changeSelected(e.target.id);
  }
  
  render() {
    return (
      <div>
        <label for="session">Session Length</label>
        <input 
          type="radio" name="portion" checked  
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
      <button>Start</button>
      <button>Stop</button>
    </div>
  );
}

class Adjust extends React.Component {
  constructor() {
    super();
    this.state={};
  }
  
  render() {
    return (
      <div>
        <label for="minutes">Minutes</label>
        <input type="radio" name="unit" checked/>
      
        <label for="seconds">Seconds</label>
        <input type="radio" name="unit" />
        
        <button onClick={this.props.handleAdd}>+</button>
        <button onClick={this.props.handleSub}>-</button>
      </div>
    );
  }
}

ReactDOM.render(<PomodoroClock />, document.getElementById('container'));
