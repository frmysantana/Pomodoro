import React from 'react';

export default class Adjust extends React.Component {
    constructor() {
      super();
      this.changeUnit = this.changeUnit.bind(this);
    }
    
    changeUnit(e) {
      this.props.changeUnit(e.target.id);
    }
    
    // So user knows that by default, they would alter the minutes portion of a 
    // timer
    componentDidMount() {
      document.querySelector('#min').checked = true;
    }

    render() {
      return (
        <div id="Adjust">
          <div className="choice">
            <label htmlFor="minutes">Minutes</label>
            <input type="radio" name="unit"
              id="min" onClick = {this.changeUnit}
            />
          </div>

          <div className="choice">
            <label htmlFor="seconds">Seconds</label>
            <input type="radio" name="unit" 
              id="sec" onClick = {this.changeUnit}
            />
          </div>
          
          <div id="buttons">
            <button onClick={this.props.changeTime} className="js-adjust-time" id="add">+</button>
            <button onClick={this.props.changeTime} className="js-adjust-time" id="sub">-</button>
          </div>
        </div>
      );
    }
}
