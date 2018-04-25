/**
 * this only works for android
 */


/**
* 字段说明--如需字段扩充请及时完善文档说明
*
* IPInUseKey: 当前使用的IP的Key
* extranetIP: 外网IP
* internalIP: 内网IP
*/

import SQLite from 'react-native-sqlite-storage';
import { ToastAndroid } from 'react-native';

const DATABASE_NAME = 'luna.db';  //数据库文件
const DATABASE_VERSION = "1.0";  //版本号  
const DATABASE_DISPLAYNAME = "Luna";
const DATABASE_SIZE = -1;  //-1应该是表示无限制  

function openOk() {
    console.log('open db ok!');
}

function openErr(err) {
    console.log("open db error:::" + err);
}

export function insertParam(obj) {
    let db = SQLite.openDatabase(DATABASE_NAME, DATABASE_VERSION, DATABASE_DISPLAYNAME, DATABASE_SIZE, openOk, openErr);
    db.executeSql("create table if not exists easyTable (id INTEGER PRIMARY KEY ASC,name VARCHAR(255),value VARCHAR(255))");
    for (let field in obj) {
        let value = obj[field];
        db.executeSql("insert into easyTable (name,value) values ('" + field + "','" + value + "')", [], (results) => {
            console.log('insert-successful', `${field}-${value}`);
        });
    }
}

export function queryParam(callback) {
    let db = SQLite.openDatabase(DATABASE_NAME, DATABASE_VERSION, DATABASE_DISPLAYNAME, DATABASE_SIZE, openOk, openErr);
    db.executeSql("create table if not exists easyTable (id INTEGER PRIMARY KEY ASC,name VARCHAR(255),value VARCHAR(255))");
    db.executeSql("select * from easyTable", [], (results) => {
        let obj = {};
        if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
                let row = results.rows.item(i);
                obj[row.name] = row.value;
            }
        }
        console.log('query-successful', obj);
        if (callback != null) {
            callback(obj);
        }
    });
}

export function deleteParam(name, callback) {
    let db = SQLite.openDatabase(DATABASE_NAME, DATABASE_VERSION, DATABASE_DISPLAYNAME, DATABASE_SIZE, openOk, openErr);
    db.executeSql("create table if not exists easyTable (id INTEGER PRIMARY KEY ASC,name VARCHAR(255),value VARCHAR(255))");
    db.executeSql("delete  from easyTable where name='" + name + "'", [], (results) => {
        console.log('delete-successful', name);
        if (callback != null)
            callback();
    });
}

export function clearParam() {
    let db = SQLite.openDatabase(DATABASE_NAME, DATABASE_VERSION, DATABASE_DISPLAYNAME, DATABASE_SIZE, openOk, openErr);
    db.executeSql("create table if not exists easyTable (id INTEGER PRIMARY KEY ASC,name VARCHAR(255),value VARCHAR(255))");
    db.executeSql("delete from easyTable ", [], (results) => {
         console.log('clear-successful');
    });
}
