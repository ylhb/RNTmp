import { ToastAndroid } from 'react-native';

//错误提示
const STATUS_TEXT = {
    403: '您没有权限，请联系管理员！'
}

function buildParams(obj) {
    if (!obj) {
        return ''
    }
    const params = []
    for (const key of Object.keys(obj)) {
        const value = obj[key] === undefined ? '' : obj[key]
        params.push(`${key}=${encodeURIComponent(value)}`)
    }
    const arg = params.join('&')
    return arg
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    ToastAndroid.show(`请求错误 ${response.status}: ${response.url}`, ToastAndroid.SHORT);
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
    console.log(options);
    const defaultOptions = {
        credentials: 'include',
    };
    const newOptions = { ...defaultOptions, ...options, method: options.method || 'POST' };
    if (newOptions.method === 'POST' || newOptions.method === 'GET') {
        newOptions.headers = {
            Accept: 'application/json',
            // 'Content-Type': 'application/json; charset=utf-8',
            'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
            ...newOptions.headers,
        };
        newOptions.body = buildParams(newOptions.body);
    }

    return fetch(url, newOptions)
        .then(checkStatus)
        .then(response => response.json())
        .catch((error) => {
            if (error.code) {
                ToastAndroid.show(`${error.name}: ${error.message}`, ToastAndroid.SHORT);
            }
            if ('stack' in error && 'message' in error) {
                ToastAndroid.show(`请求错误: ${url}, error.message`, ToastAndroid.SHORT);
            }
            return error;
        }
        );
}