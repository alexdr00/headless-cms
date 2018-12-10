import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './styles.module.scss';
import { linkType } from './propTypes';

const Link = ({
  to, label, icon = 'link', iconType = 'fas',
}) => (
  <NavLink
    className={style.navLink}
    activeClassName={style.navLinkActive}
    exact
    to={to}
  >
    <li>
      <FontAwesomeIcon className={style.navIcon} icon={[iconType, icon]} />
      {label}
    </li>
  </NavLink>
);

Link.propTypes = { ...linkType };

export default Link;
