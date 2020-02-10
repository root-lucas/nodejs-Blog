const xss = require('xss');
const { exec } = require('../db/mysql');

const getList = (author, keyword) => {
    // 注意语句含有空格
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}' `  
    }
    sql += `order by createtime desc;` // 数据倒序返回

    // 返回 promise
    return exec(sql);
}

const getDetail = (id) => {
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows => {
        return rows[0];
    })
}

const newBlog = (blogData = {}) => {
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
    return exec(sql).then(insertData => {
        console.log('insertData is ', insertData);
        return {
            id: insertData.insertId
        }
    })
    return {
        id: 3  // 表示新建博客，插入到数据表里面的 id
    }
}

const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象, 包含 title content属性
    const title = blogData.title;
    const content = blogData.content;

    const sql = `
        update blogs set title='${title}', content='${content}' where id=${id};
    `

    return exec(sql).then(updateData => {
        console.log('updateData is ', updateData); // 输出的是对象,属于mysql协议的OK包解析
        if (updateData.affectedRows > 0) {
            return true;
        } 
        return false;
    })
}

const delBlog = (id, author)=> {
    // id就是要删除博客的 id
    const sql = `delete from blogs where id='${id}' and author='${author}';`
    return exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true;
        } 
        return false;
    })
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}