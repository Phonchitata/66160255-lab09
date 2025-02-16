async function fetchUserDetail() {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('id');
    if (!userId) return;

    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();

        document.getElementById('user-detail').innerHTML = `
            <h2>${user.name}</h2>
            <p><strong>อีเมล:</strong> ${user.email}</p>
            <p><strong>ชื่อผู้ใช้:</strong> ${user.username}</p>
            <p><strong>เบอร์โทรศัพท์:</strong> ${user.phone}</p>
            <p><strong>เว็บไซต์:</strong> ${user.website}</p>
            <p><strong>ที่อยู่:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}, ${user.address.zipcode}</p>
            <p><strong>บริษัท:</strong> ${user.company.name}<br>${user.company.catchPhrase}</p>
        `;

        document.getElementById('view-posts').onclick = () => location.href = `user-posts.html?id=${userId}`;
    } catch (error) {
        console.error('Error fetching user details:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchUserDetail);
