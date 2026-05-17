// 获取 URL 中的 file 参数
const urlParams = new URLSearchParams(window.location.search);
const filePath = urlParams.get('file'); 

// 如果有 file 参数，则发起请求 
if(filePath) {
    // 假设 markdown 文件都统一放在 post 目录下
    fetch('/post/' + filePath + '.md')
        .then(response => {
            if(!response.ok) throw new Error("无法读取 Markdown 文件");
            return response.text();
        })
        .then(text => {
            document.getElementById('article-content').innerHTML = marked.parse(text);
            
            // Markdown 解析完毕后，执行盘古之白，为正文排版（中英文加空格）
            if (typeof pangu !== 'undefined') {
                pangu.spacingElementById('article-content');
            }
        })
        .catch(error => {
            document.getElementById('article-content').innerHTML = "<p>抱歉，文章内容加载失败。</p>";
        });
} else {
    document.getElementById('article-content').innerHTML = "<p>未找到该文章。</p>";
}