import React from 'react';
import style from './styles.module.scss';
import Link from './Link';
import { linksStructureType } from './propTypes';

const NavLinksSection = ({ links }) => {
  const renderLinks = () => {
    const linkComponents = links.map(link => <Link key={link.to} {...link} />);

    return linkComponents;
  };

  return <ul className={style.navLinksSection}>{renderLinks()}</ul>;
};

NavLinksSection.propTypes = { ...linksStructureType };

export default NavLinksSection;
