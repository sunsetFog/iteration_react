import React from 'react';

//react-router-dom路由:npm install react-router-dom --save-dev
//BrowserRouter路由容器  单标签Route路由    Redirect重定向  双标签Switch路由容器
import {BrowserRouter, Route, Redirect, Switch} from 'react-router-dom';

//能让修改的部分自动刷新
import {hot} from 'react-hot-loader';

//全局数据状态管理工具  npm install --save react-redux
import {Provider} from 'react-redux';
import Store from '../redux';

//React Devtools调试工具
import DevTools from '../redux/DevTools';

//路由component的路径值
import App from '../pages/app';
import Login from '../pages/login';
import Main from '../pages/main';
import NotFound from '../pages/notfound';
import List from '../pages/list';
import Img from '../pages/img';
import Svg from '../pages/svg';
import Icon from '../pages/icon';
import User from '../pages/user';

//为了传递嵌套路由到子组件
const Router = ({component: Component, children, ...rest}) => (
  <Route
    {...rest}
    render={props => (
      <Component {...props} ><Switch>{children}</Switch></Component>
    )}
  />
);

const Root = () => (
  <BrowserRouter>
    <Provider store={Store}>
      <div className="router-content">
        {__DEVELOPMENT__ && <DevTools />}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Router path="/" component={Main} >
            <Router exact path="/home" component={App} />
            <Router path="/list" component={List} >
              <Router exact path="/list/img" component={Img} />
              <Router exact path="/list/svg" component={Svg} />
              <Router exact path="/list/icon" component={Icon} />
              <Redirect to="/list/img" />
            </Router>
            <Router exact path="/user" component={User} />
            <Route path="*" component={NotFound} />
          </Router>
        </Switch>
      </div>
    </Provider>
  </BrowserRouter>
);
// console.error(hot(module)(Root));
export default hot(module)(Root);
