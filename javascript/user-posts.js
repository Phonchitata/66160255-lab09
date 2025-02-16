// user-posts.js

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    if (!userId) return;

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();
        document.getElementById('user-name').textContent = user.name;

        const postsResponse = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await postsResponse.json();

        const postsList = document.getElementById('posts-list');

        for (const post of posts) {
            const postDiv = document.createElement('div');
            postDiv.className = 'post-card';
            postDiv.innerHTML = `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <button class="comment-btn" onclick="fetchComments(${post.id}, this)">ดูความคิดเห็น</button>
                <div class="comments" style="display: none; margin-top: 15px;"></div>
            `;
            postsList.appendChild(postDiv);
        }
    } catch (error) {
        console.error('Error fetching user details or posts:', error);
    }
});

async function fetchComments(postId, button) {
    const commentsDiv = button.nextElementSibling;
    if (commentsDiv.innerHTML) {
        commentsDiv.style.display = commentsDiv.style.display === 'none' ? 'block' : 'none';
        button.textContent = commentsDiv.style.display === 'none' ? 'ดูความคิดเห็น' : 'ซ่อนความคิดเห็น';
        return;
    }

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        const comments = await response.json();

        commentsDiv.innerHTML = comments.map(comment => `
            <div class="comment-card">
                <strong>${comment.email}</strong>
                <p>${comment.body}</p>
            </div>
        `).join('');

        commentsDiv.style.display = 'block';
        button.textContent = 'ซ่อนความคิดเห็น';
    } catch (error) {
        console.error('Error fetching comments:', error);
    }
} 
