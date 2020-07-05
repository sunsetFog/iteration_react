import React from 'react';

//UI框架Ant-design:npm install --save antd
import {message} from 'antd';

//虚拟DOM
import ReactDOM from 'react-dom';

import browserHistory from 'react-router';

//npm install --save axios
import axios from 'axios';

//管理react路由的history对象  cnpm install history --save
import createHistory from 'history/createBrowserHistory';

//路由配置
import Root from './router';

//react-redux
import store from './redux';

// 加载全局css
import './style/index.styl';
// iconfont
import './assets/iconfont.css';
import './assets/iconfont.js';

const history = createHistory();//创建历史对象
export default history;
// window object
window.store = store;
window.axios = axios;
//配置axios拦截功能
const tid = localStorage.getItem('tid');
axios.defaults.headers.tid = tid || ''; // axios headers token
axios.interceptors.response.use(
  res => res,
  err => {
    const {data: {err: errnum, error}} = (err || {}).response;
    if (errnum === 200 && error) {
      message.success(error);
    } else {
      message.error(error);
    }
    if (err.response.status === 401) {
      message.info('您的登录已过期，请重新登录');
      setTimeout(() => {
        history.replace('/login');
        localStorage.removeItem('tid');
        window.location.reload();
      }, 600);
    }
  }
);
ReactDOM.render(<Root />, document.getElementById('app'));
