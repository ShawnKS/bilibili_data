import React, { FC, useCallback, useContext, useState } from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import UserContext, { UserActionTypes } from '../store/user-context';
import { protectedRoutes } from '../App';

const Navbar: FC = () => {
  const [expanded, setExpanded] = useState(false);
  const toggleExpanded = useCallback(() => setExpanded(s => !s), []);

  const { state: { user }, dispatch: dispatchUser } = useContext(UserContext);
  const location = useLocation();

  const handleLogout = useCallback(() => dispatchUser({
    type: UserActionTypes.SignOut,
  }), [dispatchUser]);

  const isActive = useCallback((url: string, curr: string, exact = true) => {
    const pathname = curr.split('?')[0];
    if (exact) {
      return pathname === url;
    }
    return pathname.indexOf(url) >= 0;
  }, []);

  return (
    <nav className="navbar is-white is-spaced">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src={logo} width="111" height="28" alt="Logo"/>
        </Link>

        <button className={classNames('navbar-burger burger', { 'is-active': expanded })}
                onClick={toggleExpanded}>
          <span/><span/><span/>
        </button>
      </div>

      <div className={classNames('navbar-menu', { 'is-active': expanded })}>
        <div className="navbar-start">
          {user?.username && protectedRoutes.map(({ name, path, exact, icon: Icon }) => {
            const className = classNames('navbar-item', { 'is-active': isActive(path, location.pathname, exact) });
            return <Link className={className} to={path} key={path}>
              <span className="icon is-small mr-1"><Icon/></span>{name}
            </Link>;
          })}
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            {user?.username ? <button className="button is-danger is-light" onClick={handleLogout}>
              退出 {user.username}
            </button> : <div className="buttons">
              <Link to={`/login?register=1&redirect=${location.pathname}`}
                    className="button is-primary is-light">
                注册
              </Link>
              <Link to={`/login?redirect=${location.pathname}`}
                    className="button is-primary is-outlined">
                登陆
              </Link>
            </div>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
