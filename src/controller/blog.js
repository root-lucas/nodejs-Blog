const getList = (author, keyword) => {
    // 先返回假数据 (保证格式是正确的)
    return [
        {
            id: 1,
            title: '标题A',
            content: '我是内容1',
            createTime: 1546461231456,
            author: 'zhangsan'
        },
        {
            id: 2,
            title: '标题B',
            content: '我是内容2',
            createTime: 1546461231456,
            author: 'lisi'
        }

    ]
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