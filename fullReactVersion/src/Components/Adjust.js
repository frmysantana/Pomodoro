import React from 'react';

export default class Adjust extends React.Component {
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
        <div id="Adjust">
          <label htmlFor="minutes">Minutes</label>
          <input type="radio" name="unit"
            id="min" onClick = {this.changeUnit}
          />
        
          <label htmlFor="seconds">Seconds</label>
          <input type="radio" name="unit" 
            id="sec" onClick = {this.changeUnit}
          />
          
          <button onClick={this.props.handleAdd} className="js-adjust-time">+</button>
          <button onClick={this.props.handleSub} className="js-adjust-time">-</button>
        </div>
      );
    }
}
