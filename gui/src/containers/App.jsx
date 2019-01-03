import React from 'react';
import propTypes from 'prop-types';
import Sidenav from '../components/sidenav/Sidenav';
import { links } from '../config/links';

const App = ({ children }) => (
  <div>
    <Sidenav links={links} />
    {children}
  </div>
);

App.propTypes = {
  children: propTypes.element.isRequired,
};

export default App;
