// http请求
import axios from 'axios';
//配置axios拦截功能
const tid = localStorage.getItem('tid');

axios.default.defaults.baseURL = ''; // 接口地址
axios.default.defaults.timeout = 0; // 响应时间
axios.default.defaults.crossDomain = true; // axios.defaults.withCredentials = true // 是否允许设置cookie
axios.default.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'; // 配置POST请求头
axios.defaults.headers.tid = tid || ''; // 设置headers参数


axios.interceptors.request.use(function (config) {
  return config;
}, function (err) {
  return Promise.reject(err);
});


axios.interceptors.response.use(function (res) {
        return res
    }, function (err) {
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

export default axios;