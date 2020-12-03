import Axios, { AxiosError } from 'axios';

/**
 * Axios 实例（HTTP 客户端）
 */
const client = Axios.create({
  baseURL: '/api',
  timeout: 2000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 在请求头添加 JWT
 */
export const setApiTokenHeader = (token?: string): void => {
  const headers = token ? { token } : {};
  client.defaults.headers = {
    ...client.defaults.headers,
    ...headers,
  };
};

// 注册全剧请求错误处理器
client.interceptors.response.use(
  resp => Promise.resolve(resp),
  (err: AxiosError) => {
    const errMsg = err.response?.data?.msg || '发生了未知错误';
    alert(errMsg);
    return Promise.reject(err);
  },
);

export default client;
