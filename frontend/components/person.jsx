import React from 'react';

class Person extends React.Component {
  componentDidMount() {
    const { send, name } = this.props;
    send('person_visit', { name: name });
  }

  render() {
    const { component: Component } = this.props;
    return <Component {...this.props} />;
  }
}

export default Person;
