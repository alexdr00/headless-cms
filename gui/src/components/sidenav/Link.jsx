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
    <li className={style.navLinkContent}>
      <FontAwesomeIcon className={style.navIcon} icon={[iconType, icon]} />
      <span className={style.navLinkLabel}>{label}</span>
    </li>
  </NavLink>
);

Link.propTypes = { ...linkType };

export default Link;
