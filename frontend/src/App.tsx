import React from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import UserContext, { useUser } from './store/user-context';
import { ProtectedRoute } from './components/ProtectedRoute';
import BackgroundEffect from './components/BackgroundEffect';
import Gender from './pages/Gender';
import Level from './pages/Level';
import Top10 from './pages/Top10';
import UserCenter from './pages/UserCenter';
import Search from './pages/Search';
import { FaCrown, FaDna, FaHome, FaHotjar, FaSearch, FaUserCircle } from 'react-icons/all';

export const protectedRoutes = [{
  path: '/',
  exact: true,
  component: Home,
  icon: FaHome,
  name: '主页',
}, {
  path: '/gender',
  component: Gender,
  icon: FaDna,
  name: '性别统计',
}, {
  path: '/level',
  component: Level,
  icon: FaCrown,
  name: '等级统计',
}, {
  path: '/top-10',
  component: Top10,
  icon: FaHotjar,
  name: 'Top 10',
}, {
  path: '/search',
  component: Search,
  icon: FaSearch,
  name: '搜索',
}, {
  path: '/user',
  component: UserCenter,
  icon: FaUserCircle,
  name: '用户中心',
}];

const App: React.FC = () => {
  const [userStore, dispatch] = useUser();
  const defaultPromptClassName = 'has-text-centered py-5';

  return (
    <UserContext.Provider value={{ state: userStore, dispatch }}>
      <BackgroundEffect/>
      <Navbar/>
      <div className="vertical-responsive">
        <Switch>
          {protectedRoutes.map(props =>
            <ProtectedRoute {...props} key={props.path} promptClassName={defaultPromptClassName}/>)}
          <Route path="/login" exact component={Login}/>
        </Switch>
      </div>
      <footer className="footer has-text-centered">
        &copy; Shawn Song 2019. All rights reserved.
      </footer>
    </UserContext.Provider>
  );
};

export default App;
