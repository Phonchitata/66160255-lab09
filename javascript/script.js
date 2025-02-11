// script.js
async function fetchUsers() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        const userList = document.getElementById('user-list');
        userList.innerHTML = users.map(user => `
            <div class="user-item" onclick="location.href='user-detail.html?id=${user.id}'">
                <h3>${user.name}</h3>
                <p>${user.email}</p>
            </div>
        `).join('');
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
document.addEventListener('DOMContentLoaded', fetchUsers);