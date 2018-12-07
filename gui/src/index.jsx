import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import { createStore, applyMiddleware } from 'redux';
// import reduxThunk from 'redux-thunk';

import App from './containers/App/App';

ReactDOM.render(
  <BrowserRouter>
    <App>
      <Route path="/" exact component={App} />
    </App>
  </BrowserRouter>,
  document.querySelector('#root'),
);
