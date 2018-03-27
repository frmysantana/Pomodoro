import React from 'react';

//Used class component for the life-cycle method
export default class Adjust extends React.Component {
    changeTime = (e) => {
      /* Invokes the root components' changeTime function with the correct
        parameters needed for the specific click event that activated it.

        Inputs: the click event from either the '+' or '-' buttons.
        Outputs: None.
       */
      if (e.target.id === 'add') {
        console.log()
        this.props.changeTime('add', 'maximum', 59.59, 29.59);
      } else {
        this.props.changeTime('sub', 'minimum', 5.00, 1.00);
      }
    }

    changeUnit = (e) => {
      this.props.changeUnit(e.target.id);
    }
    
    // So user knows that by default, they would alter the minutes portion of a 
    // timer
    componentDidMount() {
      // So that this lifecycle method doesn't interfere with the test files.
      if (document.querySelector('#min')) {
        document.querySelector('#min').checked = true;
      }
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
            <button onClick={this.changeTime} className="js-adjust-time" id="add">+</button>
            <button onClick={this.changeTime} className="js-adjust-time" id="sub">-</button>
          </div>
        </div>
      );
    }
}
