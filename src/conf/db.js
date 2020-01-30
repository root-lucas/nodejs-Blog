const env = process.env.NODE_ENV;    // 环境参数

// 配置，根据工作运行环境进行相应的配置
let MYSQL_CONF;
let REDIS_CONF;

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password:'admin',
        port: '3306',
        database:'myBlog'
    };
    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password:'admin',
        port: '3306',
        database:'myBlog'
    };
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}