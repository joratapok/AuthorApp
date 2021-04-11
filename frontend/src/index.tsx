import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const renderAllDOM = () => {
  ReactDOM.render(
      <App />, document.getElementById('root')
  );
}

renderAllDOM()


reportWebVitals();
