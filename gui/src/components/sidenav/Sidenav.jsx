import React, { Component } from 'react';

import { linksStructureType } from './propTypes';
import style from './styles/main.module.scss';
import NavLinksSection from './NavLinksSection';
import MenuButton from './MenuButton';
import Logo from './Logo';

class Sidenav extends Component {
  state = {
    isCollapsed: false,
  };

  handleMenuButtonClick = () => {
    const { isCollapsed } = this.state;

    this.setState({ isCollapsed: !isCollapsed });
  };

  render() {
    const { links, className: layout } = this.props;
    const { isCollapsed } = this.state;
    const sidenavCollapsed = isCollapsed ? style.sidenavCollapsed : '';

    return (
      <div className={`${style.sidenav} ${layout.sidenav} ${sidenavCollapsed}`}>
        <Logo />
        <MenuButton
          onClick={this.handleMenuButtonClick}
          isCollapsed={isCollapsed}
        />
        <NavLinksSection links={links} />
      </div>
    );
  }
}

Sidenav.propTypes = { ...linksStructureType };

export default Sidenav;
