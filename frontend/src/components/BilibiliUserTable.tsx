import React, { FC } from 'react';
import { BilliUserData } from '../services/data';
import { FaExternalLinkAlt, FaMars, FaQuestion, FaVenus } from 'react-icons/all';
import Loading from './Loading';
import feedbackImg from '../assets/avatar-sad.svg';

const VipTag = ({ type = '' }) => {
  switch (type) {
    case '年度大会员':
      return <span className="tag is-danger">年度大会员</span>;
    case '大会员':
      return <span className="tag is-primary">大会员</span>;
    default:
      return <span className="tag is-light">普通用户</span>;
  }
};

const GenderIcon = ({ gender = '' }) => {
  switch (gender) {
    case '男':
      return <><span className="icon is-small has-text-primary mr-2"><FaMars/></span>男</>;
    case '女':
      return <><span className="icon is-small has-text-danger mr-2"><FaVenus/></span>女</>;
    default:
      return <><span className="icon is-small mr-2"><FaQuestion/></span>保密</>;
  }
};

const formatNumber = (number = 0) => {
  if (number < 1e3) {
    return number.toString();
  } else if (number < 1e6) {
    return `${(number / 1e3).toFixed(2)}k`;
  } else if (number < 1e9) {
    return `${(number / 1e6).toFixed(2)}M`;
  } else {
    return `${(number / 1e9).toFixed(2)}b`;
  }
};

export interface BilibiliUserTableProps {
  data?: BilliUserData[];
  loading?: boolean;
}

const BilibiliUserTable: FC<BilibiliUserTableProps> = ({ data, loading }) => {
  return (
    <div className="table-container">
      <table className="table is-striped is-hoverable is-vcentered">
        <thead>
        <tr>
          <th>ID</th>
          <th>用户名</th>
          <th>性别</th>
          <th>签名</th>
          <th>用户等级</th>
          <th>大会员</th>
          <th>关注</th>
          <th>粉丝</th>
        </tr>
        </thead>
        <tbody>
        {data?.length ? data.map((user) => <tr key={user.id}>
          <td>
            <a href={`https://space.bilibili.com/${user.id}`}
               target="_blank"
               rel="noopener noreferrer">
              {user.id}<span className="icon ml-2 is-small"><FaExternalLinkAlt/></span>
            </a>
          </td>
          <td>{user.username}</td>
          <td><GenderIcon gender={user.gender}/></td>
          <td>{user.sign}</td>
          <td>{user.level}</td>
          <td><VipTag type={user.vip}/></td>
          <td>{formatNumber(user.following)}</td>
          <td>{formatNumber(user.fans)}</td>
        </tr>) : <tr>
          <td colSpan={8} className="has-text-centered">
            {loading ? <Loading title="加载中…" subtitle="请耐心等候" /> : <>
              <img className="mt-4" src={feedbackImg} alt="权限不足" style={{ width: '90%', maxWidth: '8rem' }} />
              <p className="mt-4 title">空空如也</p>
              <p className="subtitle">数据加载时可能出现了错误，稍后再来看看吧</p>
            </>}
          </td>
        </tr>}
        </tbody>
      </table>
    </div>
  );
};

export default BilibiliUserTable;
