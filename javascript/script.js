async function fetchUserList() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        const userListContainer = document.getElementById('user-list');
        userListContainer.innerHTML = ''; // เคลียร์ข้อมูลเก่า

        users.forEach(user => {
            const userItem = document.createElement('div');
            userItem.classList.add('user-item');
            userItem.innerHTML = `
                <a href="user-detail.html?id=${user.id}" class="user-link">
                    <p class="user-name">${user.name}</p>
                </a>
                <p class="user-email">${user.email}</p>
            `;
            userListContainer.appendChild(userItem);
        });
    } catch (error) {
        console.error('Error fetching user list:', error);
        document.getElementById('user-list').innerHTML = '<p>เกิดข้อผิดพลาดในการโหลดข้อมูล</p>';
    }
}

document.addEventListener('DOMContentLoaded', fetchUserList);
