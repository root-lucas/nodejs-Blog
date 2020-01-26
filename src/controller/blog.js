const { exec } = require('../db/mysql');
const getList = (author, keyword) => {
    // 注意语句含有空格
    let sql = `select * from blogs where 1=1 `
    if (author) {
        sql += `an author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}' `  
    }
    sql += `order by createtime desc;` // 数据倒序返回

    // 返回 promise
    return exec(sql);
}

const getDetail = (id) => {
    // 先返回假数据
    return {
        id: 1,
        title: '标题A',
        content: '内容A',
        createTime: 1546461231457,
        author: 'lucas'
    }
}

const newBlog = (blogData = {}) => {
    // blogData 是一个博客对象, 包含 title content 属性
    console.log('newBlog blogData...', blogData);

    return {
        id: 3  // 表示新建博客，插入到数据表里面的 id
    }
}

const updateBlog = (id, blogData = {}) => {
    // id 就是要更新博客的 id
    // blogData 是一个博客对象, 包含 title content属性
    console.log('update blog', id, blogData);
    return true
}

const delBlog = (id)=> {
    // id就是要删除博客的 id
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}