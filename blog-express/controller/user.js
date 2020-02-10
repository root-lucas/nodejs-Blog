const { exec, escape } = require('../db/mysql');
const { genPassword } = require('../utils/crypto');

const login = (username, password) => {
    // 防御 SQL 注入注释攻击函数
    username = escape(username);
    

    // 生成加密密码
    password = genPassword(password);
    password = escape(password);

    // 去除单引号(使用了escape 函数后的SQL语句就不要含有单引号了)
    const sql = `select username, realname from users where username=${username} and password=${password}`
    
    // console.log('sql is ', sql); // 打印sql语句
    return exec(sql).then(rows => {
        return rows[0] || {};
    })
}

module.exports = {
    login
}