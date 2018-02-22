import React from 'react';

class Display extends React.Component {
  constructor() {
    super();
    this.highlightSelected = this.highlightSelected.bind(this);
  }

  highlightSelected(props) {
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
  
  componentDidMount() {
    this.highlightSelected(this.props);
  }

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
