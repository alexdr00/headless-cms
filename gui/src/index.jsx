import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './shared/globalStyles.scss';

// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import reduxThunk from 'redux-thunk';

import App from './containers/App';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route exact path="" />
    </App>
  </BrowserRouter>,
  document.querySelector('#root'),
);
