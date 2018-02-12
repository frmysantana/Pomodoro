import React from 'react';

export default class Options extends React.Component {
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
          <label htmlFor="session">Session Length</label>
          <input 
            type="radio" name="portion"
            id="session" onClick={this.changeSelected}
          />
          
          <label htmlFor="break">Break Length</label>
          <input type="radio" name="portion" id="break" 
            onClick={this.changeSelected}
          />
        </div>
      );
    }
  }