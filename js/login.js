document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('login-form');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const appData = JSON.parse(localStorage.getItem('friendsConnect')) || { users: [] };

    const user = appData.users.find(user =>
      user.email === email || user.username.toLowerCase() === email.toLowerCase()
    );

    if (!user || user.password !== password) {
      alert('Invalid email or username or password');
      return;
    }

    user.online = true;

    sessionStorage.setItem('currentUser', JSON.stringify(user));

    // Update full user list with online status
    const updatedUsers = appData.users.map(u => u.id === user.id ? user : u);
    localStorage.setItem('friendsConnect', JSON.stringify({ users: updatedUsers }));

    alert('Login successful!');
    window.location.href = 'chats.html';
  });
});
