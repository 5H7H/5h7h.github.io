// src/components/BlogList.jsx
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function BlogList() {
  // 1. 设置一个状态(posts)用来存放文章列表，初始值为空数组
  const [posts, setPosts] = useState([]);
  const listRef = useRef(null);

  // 2. useEffect 会在页面加载时自动执行获取数据的操作
  useEffect(() => {
    fetch('/posts.json') // 获取存放在 public/ 下的 json
      .then(response => response.json())
      .then(data => {
        setPosts(data); // 把获取的数据塞给状态变量
      })
      .catch(error => console.error('获取文章列表失败:', error));
  }, []); // 后面的空数组表示只在组件初次出现时执行一次这部分代码

  // 3. 当 posts 数据发生变化（也就是从空变成了有数据），执行盘古之白排版
  useEffect(() => {
    if (posts.length > 0 && listRef.current) {
      if (window.pangu) {
        window.pangu.spacingElementById('blog-list');
      }
    }
  }, [posts]);

  return (
    // 4. 数据映射到 HTML：遍历 posts 数组，自动生成列表
    <div className="blog_list_container" id="blog-list" ref={listRef}>
      {posts.map((post, index) => (
        <div className="post-summary" key={index}>
          <Link to={`/post?file=${post.path}`}>{post.title}</Link><br />
          <span className="date">{post.date}</span>
          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogList;