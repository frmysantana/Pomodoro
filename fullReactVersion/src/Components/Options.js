import React from 'react';

export default class Options extends React.Component {
    constructor() {
      super();
      this.changeSelected = this.changeSelected.bind(this);
    }
    
    changeSelected(e) {
      this.props.changeSelected(e.target.id);
    }

    // So the user knows that the session timer is selected by default.
    componentDidMount() {
      document.querySelector('#session').checked = true;
    }
    
    render() {
      return (
        <div id="Options">
          <div>
            <label htmlFor="session">Session <br /> Timer</label>
            <input 
              type="radio" name="portion"
              id="session" onClick={this.changeSelected}
            />
          </div>
          
          <div>
            <label htmlFor="break">Break <br /> Timer</label>
            <input type="radio" name="portion" id="break" 
              onClick={this.changeSelected}
            />
          </div>
        </div>
      );
    }
  }
