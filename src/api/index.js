import ajax from './ajax'

const BASE_URL ='http://127.0.0.1:1688'

export const getHomeCasual = ()=> ajax(BASE_URL +'/api/homecasual')

export const getHomeNav = ()=> ajax(BASE_URL +'/api/homenav')

export const getHomeShopList = ()=> ajax(BASE_URL + '/api/homeshoplist');

export const getRecommendShopList = ()=> ajax(BASE_URL + '/api/recommendshoplist');

export const getSearchGoods =() => ajax(BASE_URL + '/api/searchgoods');

// 5. 获取短信验证码
export const getPhoneCode = (phone) => ajax(BASE_URL + '/api/send_code', {phone});

// 6. 手机验证码登录
export const phoneCodeLogin = (phone, code) => ajax(BASE_URL + '/api/login_code', {phone, code}, 'POST');

// 7. 用户名和密码登录
export const pwdLogin = (name, pwd, captcha)=> ajax(BASE_URL + '/api/login_pwd', {name, pwd, captcha}, 'POST');

// 8. 自动登录
export const getUserInfo = () => ajax(BASE_URL + '/api/userinfo');

// 9. 退出登录
export const getLogOut = () => ajax(BASE_URL + '/api/logout');