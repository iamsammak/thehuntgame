import React from 'react';

import PuzzleHeader from './puzzleHeader';

// Answer: getaway (caesar ciphered)

class Puzzle1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit() {
    const { value } = this.state;
    const { send } = this.props;

    send("submit", { puzzle: "1", answer: value });
  }

  render() {
    const { value } = this.state;

    return (
      <div>
        <PuzzleHeader title="Puzzle One" />
        <form id="puzzle1-form" onSubmit={this.handleSubmit}>
          <div id="cipher-container">
          </div>
          <p>
            <input type="text" value={value} onChange={this.handleChange} autoComplete="off" placeholder="Type here" />
          </p>

          <div>
            <button type="submit">submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Puzzle1;
