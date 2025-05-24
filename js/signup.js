const encryptPassword = (password) => {
  let encrypted = '';
  for (let i = 0; i < password.length; i++) {
    encrypted += String.fromCharCode(password.charCodeAt(i) + 3);
  }
  return encrypted;
}


document.getElementById('signup-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  let appData = JSON.parse(localStorage.getItem('friendsConnect'));

  if (!appData) {
    appData = {
      users: [],
      groupChat: {
        name: "Global Room",
        participants: [],
        messages: []
      }
    };
  }

  // Ensure groupChat structure is complete
  if (!appData.groupChat) {
    appData.groupChat = {
      name: "Global Room",
      participants: [],
      messages: []
    };
  } else {
    appData.groupChat.name = appData.groupChat.name || "Global Room";
    appData.groupChat.messages = appData.groupChat.messages || [];
    appData.groupChat.participants = appData.groupChat.participants || [];
  }

  const userExists = appData.users.some(
    user =>
      user.email.toLowerCase() === email.toLowerCase() ||
      user.username.toLowerCase() === username.toLowerCase()
  );

  if (userExists) {
    alert('User already exists with that email or username');
    return;
  }

  // Generate new user ID
  const newId = appData.users.length
    ? appData.users[appData.users.length - 1].id + 1
    : 1;

  const newUser = {
    id: newId,
    username,
    email,
    password: encryptPassword(password),
    online: true,
    chats: {
      private: [],
      group: []
    }
  };

  // Add user to users list
  appData.users.push(newUser);

  if (!appData.groupChat.participants.includes(newId)) {
    appData.groupChat.participants.push(newId);
  }

  //Pull latest messages to avoid overwriting them
  const latestData = JSON.parse(localStorage.getItem('friendsConnect'));
  if (latestData && latestData.groupChat && latestData.groupChat.messages) {
    appData.groupChat.messages = latestData.groupChat.messages;
  }

  localStorage.setItem('friendsConnect', JSON.stringify(appData));

  sessionStorage.setItem('currentUser', JSON.stringify(newUser));

  alert('Account created successfully!');
  window.location.href = 'chats.html';
});
