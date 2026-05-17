document.addEventListener('DOMContentLoaded', () => {
    fetch('/posts.json')
        .then(response => response.json())
        .then(posts => {
            const blogListContainer = document.getElementById('blog-list');
            posts.forEach(post => {
                const postSummary = document.createElement('div');
                postSummary.className = 'post-summary';
                
                postSummary.innerHTML = `
                    <a href="post.html?file=${post.path}">${post.title}</a><br>
                    <span class="date">${post.date}</span>
                    <p>${post.description}</p>
                `;
                
                blogListContainer.appendChild(postSummary);
            });
            
            // 数据插入完毕后，执行盘古之白，自动在中英文之间加空格
            if (typeof pangu !== 'undefined') {
                pangu.spacingElementById('blog-list');
            }
        })
        .catch(error => console.error('Error loading posts:', error));
});
