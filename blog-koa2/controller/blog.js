const xss = require('xss');
let { exec } = require('../db/mysql');

const getList = async (author, keyword) => {
    // 注意语句含有空格
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `  
    }
    sql += `order by createtime desc;` // 数据倒序返回

    // 返回 promise
    return await exec(sql);
}

const getDetail = async (id) => {
    const sql = `select * from blogs where id='${id}'`
    const rows = await exec(sql);
    return rows[0]
    // return exec(sql).then(rows => {
    //     return rows[0];
    // })
}

const newBlog = async (blogData = {}) => {
    // blogData 是一个博客对象, 包含 title content 属性
    const title = xss(blogData.title);  // 使用 xss 模块防御xss攻击
    // console.log('title is ', title);
    const content = blogData.content;
    const author = blogData.author;
    const createTime = Date.now();

    const sql = `
        insert into blogs (title, content, createTime, author) 
        values ('${title}', '${content}', ${createTime}, '${author}');
    `
    const insertData = await exec(sql);
    return {
        id: insertData.insertId
    }
    // return exec(sql).then(insertData => {
    //     console.log('insertData is ', insertData);
    //     return {
    //         id: insertData.insertId
    //     }
    // })
}

const updateBlog = async (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象, 包含 title content属性
    // 注意! 这里传入的 req.body 是 x-www.form-urlencoded 格式
    const title = blogData.title;
    const content = blogData.content;

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id};
    `
    const updateData = await exec(sql);
    if (updateData.affectedRows > 0) {
        return true;
    }
    return false;
    // return exec(sql).then(updateData => {
    //     console.log('updateData is ', updateData); // 输出的是对象,属于mysql协议的OK包解析
    //     if (updateData.affectedRows > 0) {
    //         return true;
    //     } 
    //     return false;
    // })
}

const delBlog = async (id, author)=> {
    // id就是要删除博客的 id    
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    const delData = await exec(sql);
    if (delData.affectedRows > 0) {
        return true;
    } 
    return false;
    // return exec(sql).then(delData => {
    //     if (delData.affectedRows > 0) {
    //         return true;
    //     } 
    //     return false;
    // })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}