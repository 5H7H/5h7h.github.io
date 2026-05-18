import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { marked } from 'marked';

// 一个用来获取 URL 参数的辅助工具
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Post() {
  const query = useQuery();
  const filePath = query.get('file'); // 获取网址里的 ?file=xxx 参数
  const [content, setContent] = useState('<p>文章加载中...</p>');
  const articleRef = useRef(null);

  useEffect(() => {
    if (filePath) {
      // 从 public/post/ 目录下获取 markdown 文件
      fetch(`/post/${filePath}.md`)
        .then(response => {
          if (!response.ok) throw new Error('无法读取 Markdown 文件');
          return response.text();
        })
        .then(text => {
          // 使用 marked 把 markdown 文本转成 HTML
          setContent(marked.parse(text));
        })
        .catch(error => {
          setContent('<p>抱歉，文章内容加载失败。</p>');
        });
    } else {
      setContent('<p>未找到该文章。</p>');
    }
  }, [filePath]);

  // 当内容渲染完毕后，执行盘古之白
  useEffect(() => {
    if (articleRef.current && window.pangu) {
      window.pangu.spacingElementById('article-content');
    }
  }, [content]);

  return (
    // dangerouslySetInnerHTML 是 React 中渲染 HTML 字符串的规范写法
    <main 
      className="markdown-body" 
      id="article-content" 
      ref={articleRef}
      dangerouslySetInnerHTML={{ __html: content }} 
    />
  );
}

export default Post;