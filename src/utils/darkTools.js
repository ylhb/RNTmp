/**
 * author: NitMoon
 * description: Make coding faster and happier!
 */

/**
* 根据obj在arr中的键，返回一个新的对象
*
* @param  {object} obj  操作的对象
* @param  {array}  arr  需要的key
* @return {object}      返回一个新对象，key是arr的值，value是obj对应的value
*/
export function _gets(obj, arr) {
    let _obj = {};
    for (let elem of arr) {
        obj[elem] !== undefined && (_obj[elem] = obj[elem]);
    }
    return _obj;
}

/**
 * 根据arr中的值，将obj对应的key的value变成字符串
 * @param  {object} obj  操作的对象
 * @param  {array}  arr  需要变为字符串的key
 * @return {object}      将操作的对象返回
 */

export function _setValueString(obj, arr) {
    for (let elem of arr) {
        obj[elem] !== undefined && (obj[elem] += '');
    }
    return obj;
}