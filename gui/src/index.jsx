import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import reduxThunk from 'redux-thunk';

import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.scss';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import App from './containers/App';

library.add(fas, fab, far);

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route exact path="" />
    </App>
  </BrowserRouter>,
  document.querySelector('#root'),
);
