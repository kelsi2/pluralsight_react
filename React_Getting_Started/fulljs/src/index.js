import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

// Hydrate is used for server side rendered components instead of render
ReactDOM.hydrate(
  <App />,
  document.getElementById('mountNode'),
);