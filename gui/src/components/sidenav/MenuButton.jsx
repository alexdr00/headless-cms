import React from 'react';
import propTypes from 'prop-types';
import style from './styles.module.scss';

const MenuButton = ({ onClick, isCollapsed }) => {
  // The bars are rotated to show an X
  const firstBarRotated = !isCollapsed ? style.firstBarRotated : '';
  const secondBarRotated = !isCollapsed ? style.secondBarRotated : '';
  const thirdBarRotated = !isCollapsed ? style.thirdBarRotated : '';

  return (
    <button onClick={onClick} type="button" className={style.menuButton}>
      <div className={`${style.bar} ${firstBarRotated}`} />
      <div className={`${style.bar} ${secondBarRotated}`} />
      <div className={`${style.bar} ${thirdBarRotated}`} />
    </button>
  );
};

MenuButton.propTypes = {
  onClick: propTypes.func.isRequired,
  isCollapsed: propTypes.bool.isRequired,
};

export default MenuButton;
