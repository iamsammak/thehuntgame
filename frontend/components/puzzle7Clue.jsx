import React from 'react';

class Puzzle7Clue extends React.Component {
  render() {
    const { clue } = this.props;

    let clueText = '';
    switch (clue) {
    case 'clue0':
      clueText = 'Row 1 Column 1 should be off. Row 2 Column 3 should be off.'; break;
    case 'clue1':
      clueText = 'Row 2 Column 5 should be on. Row 2 Column 1 should be on.'; break;
    case 'clue2':
      clueText = 'Row 1 Column 5 should be off. Row 1 Column 3 should be on.'; break;
    case 'clue3':
      clueText = 'Row 1 Column 2 should be on. Row 2 Column 4 should be off.'; break;
    case 'clue4':
      clueText = 'Row 2 Column 2 should be on. Row 1 Column 4 should be off.'; break;
    }

    return (
      <div>
        {clueText}
      </div>
    );
  }
}

export default Puzzle7Clue;
