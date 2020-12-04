import React from 'react';
//常用UI框架Ant-design
import {message} from 'antd';
//虚拟DOM
import ReactDOM from 'react-dom';
// import browserHistory from 'react-router';

//路由history对象，用于跳转
import createHistory from 'history/createBrowserHistory';
//路由配置
import Router from './router';
//react-redux相当于vuex
import store from './redux';
// 加载全局css
import './style/index.styl';
// iconfont
import './assets/iconfont.css';
import './assets/iconfont.js';

const history = createHistory();//创建历史对象
export default history; // 暴露history
// window object
window.store = store;
// http请求
import http from './api/http'
window.axios = http;

ReactDOM.render(<Router />, document.getElementById('app'));
