import { createContext, Dispatch, Reducer, useEffect, useReducer } from 'react';
import { setApiTokenHeader } from '../services/client';
import AuthApi from '../services/auth';

/**
 * 性别
 */
enum Gender {
  Female,
  Male,
}

/**
 * 用户信息
 */
export interface User {
  username: string;
  name?: string;
  gender?: Gender;
  sign?: string;
  email?: string;
}

/**
 * 用户信息（类 Redux）
 */
export interface UserStoreState {
  user?: User,
  token?: string,
  isLoading: boolean,
}

export interface UserContextShape {
  state: UserStoreState;
  dispatch: Dispatch<UserAction>;
}

const defaultUserStoreState: UserStoreState = {
  isLoading: false,
};

/**
 * 用户上下文
 */
const UserContext = createContext<UserContextShape>({
  state: defaultUserStoreState,
  dispatch: _ => {
  },
});

export enum UserActionTypes {
  CommitUser,
  SignOut,
  CommitToken,
  SetLoading,
}

interface UserAction {
  type: UserActionTypes;
  payload?: any;
}

const userReducer: Reducer<UserStoreState, UserAction> = (prevState, action) => {
  const { type, payload } = action;
  switch (type) {
    case UserActionTypes.CommitToken:
      window.localStorage.setItem('token', payload);
      setApiTokenHeader(payload);
      return {
        ...prevState,
        user: undefined,
        token: payload,
      };
    case UserActionTypes.CommitUser:
      return {
        ...prevState,
        user: payload,
      };
    case UserActionTypes.SetLoading:
      return {
        ...prevState,
        isLoading: payload,
      };
    case UserActionTypes.SignOut:
      window.localStorage.removeItem('token');
      setApiTokenHeader();
      return {
        ...prevState,
        user: undefined,
        token: undefined,
      };
    default:
      return prevState;
  }
};

/**
 * 用户 HOOKs
 */
export const useUser = (): [UserStoreState, Dispatch<UserAction>] => {
  const [user, dispatch] = useReducer(userReducer, defaultUserStoreState);

  useEffect(() => {
    // 从 localStorage 读取 JWT
    const savedToken = window.localStorage.getItem('token');
    if (!savedToken) return;
    setApiTokenHeader(savedToken);

    // 获取用户数据
    dispatch({
      type: UserActionTypes.SetLoading,
      payload: true,
    });
    AuthApi.getUserInfo()
      .then(({ data }) => dispatch({
        type: UserActionTypes.CommitUser,
        payload: data,
      }))
      // 失败了的话清除 token
      .catch(() => dispatch({
        type: UserActionTypes.SignOut,
      }))
      .finally(() => dispatch({
        type: UserActionTypes.SetLoading,
        payload: false,
      }));
  }, []);

  return [user, dispatch];
};

export default UserContext;
