import React from 'react';

class Lobby extends React.Component {
  render() {

    return (
      <div>
        <h1>Confirmation Page</h1>
        <form id="confirmation-form">
          <p>Before you embark on the hunt...Sheldon come up with a blurb</p>
          <br />
          <p>You have selected table</p>
          <div id="table-selection" className="selection-container"></div>
          <div>
            <button type="submit">is this correct?</button>
            <button type="button" className="back-btn">nope</button>
          </div>
          <br />
        </form>
      </div>
    );
  }
};

export default Lobby;
