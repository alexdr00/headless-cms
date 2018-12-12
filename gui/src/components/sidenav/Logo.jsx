import React from 'react';
import { Link } from 'react-router-dom';
import style from './styles/main.module.scss';

const Logo = () => (
  <Link className={style.logo} to="/">
    <div>
      <h1 className={style.logoText}>minimCms</h1>
    </div>
  </Link>
);

export default Logo;
