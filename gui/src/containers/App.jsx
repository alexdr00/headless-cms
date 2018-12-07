import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../components/sidebar/Sidebar';

const App = ({ children }) => (
  <div>
    <Sidebar />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
