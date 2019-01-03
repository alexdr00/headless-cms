import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './styles/main.module.scss';
import { linkType } from './propTypes';

const NavigationLink = ({
  to, label, icon, iconType = 'fas',
}) => {
  const renderIcon = () => {
    if (icon) {
      return (
        <FontAwesomeIcon className={style.navIcon} icon={[iconType, icon]} />
      );
    }

    return null;
  };

  return (
    <NavLink
      className={style.navLink}
      activeClassName={style.navLinkActive}
      exact
      to={to}
    >
      <li className={style.navLinkContent}>
        {renderIcon()}
        <span className={style.navLinkLabel}>{label}</span>
      </li>
    </NavLink>
  );
};

NavigationLink.propTypes = { ...linkType };

export default NavigationLink;
