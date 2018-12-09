import React from 'react';
import ReactDOM from 'react-dom';

//webpacking css - haven't gotten this to work in new webpack/babel release
// require("../css/main.scss")
import Root from './components/root';

document.addEventListener('DOMContentLoaded', () => {
  console.log("sam says DOM Content Loaded");
  
  const root = document.getElementById('root');
  ReactDOM.render(<Root />, root);
});
