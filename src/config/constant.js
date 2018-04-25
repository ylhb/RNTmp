import GlobalConfig from './GlobalConfig'

//ips
export const IPS = ['extranetIP', 'internalIP']
export const IPS_ALIAS = {'extranetIP': '外网IP', 'internalIP': '内网IP'}

//basicConfig
export const MAX_LOGIN_USER_CACHE_LIST_LENGTH = 5;
let basicUrl = '/abc';

//login
export const login = '/login.htm'  //登录

export const getURL = (url) => 'http://' + GlobalConfig[GlobalConfig.IPInUseKey] + basicUrl + url;
