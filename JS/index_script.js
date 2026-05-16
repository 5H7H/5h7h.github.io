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
        })
        .catch(error => console.error('Error loading posts:', error));
});
