import React from 'react';
import ReactDOM from 'react-dom';

import Admin from './components/admin';

document.addEventListener('DOMContentLoaded', () => {
  const admin = document.getElementById('admin');
  ReactDOM.render(<Admin />, admin);
});
