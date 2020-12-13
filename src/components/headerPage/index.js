import React from 'react';
import { Link } from 'react-router-dom';
import { isUserAuthenticated, deleteCookie } from '../../utils/cookie';

const Header = () => {
  const listMenu = ['home', 'profile', 'contact', 'infoCorona'];
  const logoutClicked = () => {
    if (window.confirm('Anda yakin mau keluar?')) {
      deleteCookie('userData');
      deleteCookie('token');
      window.location.replace('/');
    }
  };
  const menuUserAuthenticated = () => {
    console.log(isUserAuthenticated());
    if (isUserAuthenticated()) {
      return (
        <>
          <Link to="/product">
            <div className="menu">product</div>
          </Link>
          <div
            className="menu"
            style={{ cursor: 'pointer', color: '#000000aa' }}
            onClick={() => {
              logoutClicked();
            }}
          >
            logout
          </div>
        </>
      );
    }
    return '';
  };
  return (
    <div className="header">
      {listMenu.map((name) => {
        return (
          <Link to={`/${name}`} key={name}>
            <div className="menu">{name}</div>
          </Link>
        );
      })}
      {menuUserAuthenticated()}
    </div>
  );
};
export default Header;
