import React from 'react';

class Person extends React.Component {
  componentDidMount() {
    const { send, personId } = this.props;
    send('person_visit', { personId: personId });
  }

  render() {
    const { component: Component } = this.props;
    return <Component {...this.props} />;
  }
}

export default Person;
