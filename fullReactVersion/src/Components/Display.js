import React from 'react';

class Display extends React.Component {
  constructor() {
    super();
    this.highlightSelected = this.highlightSelected.bind(this);
  }

  highlightSelected(props) {
    /* Manages which paragraph has the selected and unselected classes
       based on which one corresponds to the selected state value in the
       root component.

       Input: props - this component's props property, which includes the
              state property 'selected' in the root component.

       Output: None.
     */
    let selected = props.selected;
    const paragraphs = document.querySelectorAll('p');

    if (selected === 'session') {
      paragraphs[0].classList.add('selected');
      paragraphs[0].classList.remove('unselected');
      paragraphs[1].classList.add('unselected');
      paragraphs[1].classList.remove('selected');
    } else {
      paragraphs[0].classList.remove('selected');
      paragraphs[0].classList.add('unselected');
      paragraphs[1].classList.remove('unselected');
      paragraphs[1].classList.add('selected');
    }
  }  
  
  // To let the user know which paragraph is selected by default.
  componentDidMount() {
    this.highlightSelected(this.props);
  }

  // Updates which paragraph is selected if the state value changes.
  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) { 
      this.highlightSelected(this.props);
    }
  }

  render() {
    return (
      <div id="Display">
        <h2>Pomodoro Timer</h2>
        <p>Session Length: <span>{this.props.sessionLength}</span></p>
        <p>Break Length: <span>{this.props.breakLength}</span></p>
        <div>
          <button onClick={this.props.startTimer} className="start-stop">Start</button>
          <button onClick={this.props.stopTimer} className="start-stop">Stop</button>
        </div>
      </div>
    );
  }
}

export default Display;
