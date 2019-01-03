import React from 'react';
import style from './styles/main.module.scss';
import NavLink from './NavLink';
import { linksStructureType } from './propTypes';

const NavLinksSection = ({ links }) => {
  const renderLinks = () => {
    const linkComponents = links.map(link => (
      <NavLink key={link.to} {...link} />
    ));

    return linkComponents;
  };

  return <ul className={style.navLinksSection}>{renderLinks()}</ul>;
};

NavLinksSection.propTypes = { ...linksStructureType };

export default NavLinksSection;
