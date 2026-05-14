// 自动获取当前 html 的文件名，并替换为 .md
// 比如当前是 first_post.html，请求的就是 first_post.md
const pathParts = window.location.pathname.split('/');
const currentFile = pathParts[pathParts.length - 1] || 'index.html';
const mdFileName = currentFile.replace('.html', '.md');

fetch('./' + mdFileName)
    .then(response => {
        if(!response.ok) throw new Error("无法读取 Markdown 文件");
        return response.text();
    })
    .then(text => {
        // 将 Markdown 文本转换成 HTML 并塞入容器
        document.getElementById('article-content').innerHTML = marked.parse(text);
    })
    .catch(error => {
        console.error(error);
        document.getElementById('article-content').innerHTML = "<p>抱歉，文章内容加载失败。</p>";
    });