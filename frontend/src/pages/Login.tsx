import React, { FC, useContext, useEffect, useState } from 'react';
import useForm from 'react-hook-form';
import Input from '../components/Input';
import Card from '../components/Card';
import './Login.sass';
import { Redirect, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import UserContext, { UserActionTypes } from '../store/user-context';
import AuthApi from '../services/auth';
import classNames from 'classnames';

interface LoginFrom {
  username: string;
  password: string;
  passwordConfirm: string;
}

const Login: FC = () => {
  const form = useForm<LoginFrom>();
  const { handleSubmit, errors } = form;

  const search = useLocation().search;
  const params = new URLSearchParams(search);
  const registerParam = params.get('register');
  const redirectParam = params.get('redirect') || '/';

  const { state: { user, isLoading }, dispatch: dispatchUser } = useContext(UserContext);
  const [isLogin, setIsLogin] = useState(!registerParam);

  useEffect(() => setIsLogin(!registerParam), [registerParam]);

  useEffect(() => {
    // 好像这个实现有点不够优雅…
    const verticalResponsive: HTMLDivElement | null = document.querySelector('.vertical-responsive');
    if (!verticalResponsive) { return; }
    verticalResponsive.classList.add('is-flex');
    return () => {
      verticalResponsive.classList.remove('is-flex');
    };
  }, []);

  const onSubmit = handleSubmit(async (values) => {
    if (isLoading) {
      return;
    }
    if (!isLogin && values.password !== values.passwordConfirm) {
      alert('两次输入的密码不一致');
      return;
    }

    try {
      const api = isLogin ? AuthApi.login : AuthApi.register;
      dispatchUser({
        type: UserActionTypes.SetLoading,
        payload: true,
      });
      const { data: { token } } = await api(values.username, values.password);
      dispatchUser({
        type: UserActionTypes.CommitToken,
        payload: token,
      });
      const { data: user } = await AuthApi.getUserInfo();
      dispatchUser({
        type: UserActionTypes.CommitUser,
        payload: user,
      });
    } catch (e) {
      dispatchUser({
        type: UserActionTypes.SignOut,
      });
    } finally {
      dispatchUser({
        type: UserActionTypes.SetLoading,
        payload: false,
      });
    }
  });

  if (user?.username) {
    return <Redirect to={redirectParam === '/login' ? '/' : redirectParam}/>;
  }

  return (
    <div className="login-page">
      <div className="columns is-vcentered is-centered py-4">
        <div className="column is-full-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd p-4">
          <Card className="p-2">
            <form onSubmit={onSubmit}>
              <h1 className="title has-text-centered">用户{isLogin ? '登录' : '注册'}</h1>
              <p className="subtitle has-text-centered">欢迎{isLogin ? '回来' : '新朋友'}</p>
              <hr/>
              <Input fieldName="username"
                     label="用户名"
                     disabled={isLoading}
                     form={form}
                     required
                     max={16}
                     min={6}
                     pattern={/^[A-Za-z0-9_-]+$/}
                     patternMessage="用户名仅能包含字母、数字、下划线和中划线"/>
              <Input fieldName="password"
                     label="密码"
                     disabled={isLoading}
                     type="password"
                     max={255}
                     min={6}
                     form={form}
                     required
                     pattern={/^[A-Za-z0-9 !"#$%&'()*+,\-./:;<=>?@\[\]^_`{|}~]+$/}
                     patternMessage={'密码仅能包含字母、数字、空格和以下特殊符号： !"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~'}/>
              {!isLogin && <>
                <Input fieldName="passwordConfirm"
                       label="密码确认"
                       disabled={isLoading}
                       type="password"
                       form={form}
                       required
                       pattern={/^[A-Za-z0-9 !"#$%&'()*+,\-./:;<=>?@\[\]^_`{|}~]+$/}
                       patternMessage={'密码仅能包含字母、数字、空格和以下特殊符号： !"#$%&\'()*+,-./:;<=>?@[\]^_`{|}~'}/>
              </>}
              <button type="submit"
                      className={classNames('button is-primary is-light is-fullwidth mt-4', { 'is-loading': isLoading })}
                      disabled={isLoading || !!errors.username || !!errors.password}>
                立即{isLogin ? '登录' : '注册'}
              </button>
              <p className="mt-2 has-text-centered">
                {isLogin ? '没有账号？' : '已有账号？'}
                <Link to={isLogin ? '/login?register=1' : '/login'}>
                  {isLogin ? '立即注册' : '立即登陆'}
                </Link>
              </p>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
