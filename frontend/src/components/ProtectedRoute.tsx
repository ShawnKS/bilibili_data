import React, { ComponentType, useContext } from 'react';
import { Route, RouteProps, useLocation } from 'react-router';
import UserContext from '../store/user-context';
import { Link } from 'react-router-dom';
import feedbackImg from '../assets/avatar-sad.svg';

export interface ProtectedRouteProps<T> extends Omit<RouteProps, 'render'> {
  component: ComponentType<T>;
  promptClassName?: string;
}

/**
 * 受保护路由
 */
export const ProtectedRoute = <T extends any>(props: ProtectedRouteProps<T> & T) => {
  const {
    component: Component,
    promptClassName,
    location,
    path,
    exact,
    sensitive,
    strict,
    ...componentProps
  } = props;

  const routeProps = {
    location,
    path,
    exact,
    sensitive,
    strict,
  };

  const { state: { user, isLoading } } = useContext(UserContext);
  const { pathname } = useLocation();

  return (
    <Route {...routeProps} render={(routeChildrenProps) => {
      if (!user) {
        return (
          <div className={promptClassName}>
            <img src={feedbackImg} alt="权限不足" style={{ width: '90%', maxWidth: '12rem' }} />
            <h1 className="title mt-4">
              {isLoading ? '正在加载用户信息…' : '权限不足'}
            </h1>
            <p className="subtitle">
              {isLoading ? '请耐心等候' : '请登陆或注册后再查看此页面'}
            </p>
            {!isLoading && <div className="buttons is-inline-block">
              <Link to={`/login?register=1&redirect=${pathname}`}
                    className="button is-primary is-light">
                注册
              </Link>
              <Link to={`/login?redirect=${pathname}`}
                    className="button is-primary is-outlined">
                登陆
              </Link>
            </div>}
          </div>
        );
      }
      return <Component {...componentProps} {...routeChildrenProps} />;
    }}/>
  );
};
