document.getElementById('signup-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;


  const appData = JSON.parse(localStorage.getItem('friendsConnect')) || { users: [] };

  const userExists = appData.users.some(
    user => user.email === email || user.username.toLowerCase() === username.toLowerCase()
  );

  if (userExists) {
    alert('User already exists with that email or username');
    return;
  }

  // Generate new user ID (simple increment)
  const newId = appData.users.length ? appData.users[appData.users.length - 1].id + 1 : 1;

  const newUser = {
    id: newId,
    username: username,
    email: email,
    password: password,
    online: false,
    chats: {
      private: [],
      group: []
    }
  };

  appData.users.push(newUser);

  // Save updated data to localStorage
  localStorage.setItem('friendsConnect', JSON.stringify(appData));

  alert('Account created');
  window.location.href = 'chats.html';
});
