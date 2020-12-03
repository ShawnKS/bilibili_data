import { AxiosResponse } from 'axios';
import client from './client';
import { User } from '../store/user-context';

export interface TokenResp {
  token: string;
}

/**
 * 用户相关 API
 */
export default class AuthApi {
  /**
   * 登陆
   */
  static async login(username: string, password: string): Promise<AxiosResponse<TokenResp>> {
    return client.post('login/', { username, password });
  }

  /**
   * 注册
   */
  static async register(username: string, password: string): Promise<AxiosResponse<TokenResp>> {
    return client.post('regist/', { username, password });
  }

  /**
   * 获取用户信息
   */
  static async getUserInfo(): Promise<AxiosResponse<User>> {
    return client.get('getuserinfo/');
  }

  /**
   * 更新用户信息
   */
  static async updateUser(userInfo: Partial<User>): Promise<AxiosResponse<User>> {
    return client.post('setuserinfo/', userInfo);
  }
}
