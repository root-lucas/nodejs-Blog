const env = process.env.NODE_ENV;    // 环境参数

// 配置，根据工作运行环境进行相应的配置

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password:'admin',
        port: '3306',
        database:'myBlog'
    };
}

if (evn === 'production') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password:'admin',
        port: '3306',
        database:'myBlog'
    };
}

module.exports = {
    MYSQL_CONF
}