import React, { FC } from 'react';
import Container from '../components/Container';
import { FaDna, FaCrown, FaHotjar, FaSearch, FaUserCircle, FaArrowCircleRight } from 'react-icons/fa';
import './Home.sass';
import { Link } from 'react-router-dom';

const Home: FC = () => {
  return (
    <Container className="py-5 home-page">
      <div className="tile is-ancestor">
        <div className="tile is-vertical is-8">
          <div className="tile">
            <div className="tile is-parent is-vertical">
              <article className="tile is-child notification is-primary">
                <p className="title"><span className="icon is-medium"><FaDna/></span></p>
                <p className="subtitle">用户性别</p>
                <Link className="button is-light is-fullwidth mt-4" to="/gender">
                  查看
                  <span className="icon ml-2"><FaArrowCircleRight/></span>
                </Link>
              </article>
              <article className="tile is-child notification is-warning">
                <p className="title"><span className="icon is-medium"><FaCrown/></span></p>
                <p className="subtitle">等级分布</p>
                <Link className="button is-light is-fullwidth mt-4" to="/level">
                  查看
                  <span className="icon ml-2"><FaArrowCircleRight/></span>
                </Link>
              </article>
            </div>
            <div className="tile is-parent">
              <article className="tile is-child notification is-info">
                <p className="title"><span className="icon is-medium"><FaHotjar/></span></p>
                <p className="subtitle">Top 10</p>
                <Link className="button is-light is-fullwidth mt-4" to="/top-10">
                  查看
                  <span className="icon ml-2"><FaArrowCircleRight/></span>
                </Link>
              </article>
            </div>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child notification is-danger">
              <p className="title"><span className="icon is-medium"><FaSearch/></span></p>
              <p className="subtitle">搜索数据</p>
              <Link className="button is-light is-fullwidth mt-4" to="/search">
                查看
                <span className="icon ml-2"><FaArrowCircleRight/></span>
              </Link>
            </article>
          </div>
        </div>
        <div className="tile is-parent">
          <article className="tile is-child notification is-success">
            <p className="title"><span className="icon is-medium"><FaUserCircle/></span></p>
            <p className="subtitle">个人中心</p>
            <Link className="button is-light is-fullwidth mt-4" to="/user">
              查看
              <span className="icon ml-2"><FaArrowCircleRight/></span>
            </Link>
          </article>
        </div>
      </div>
    </Container>
  );
};

export default Home;
