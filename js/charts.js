document.addEventListener('DOMContentLoaded', () => {
  const appData = JSON.parse(localStorage.getItem('friendsConnect')) || { users: [] };
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  if (!currentUser) {
    alert('You must be logged in.');
    window.location.href = 'login.html';
    return;
  }

  window.appData = appData;
  window.currentUser = currentUser;

  const contactsContainer = document.getElementById('charts');
  const chatHeader = document.getElementById('chat-header');
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.querySelector('#chat-input input');

  const otherUsers = appData.users.filter(user => user.username !== currentUser.username);

  otherUsers.forEach(user => {
    const contactDiv = document.createElement('div');
    contactDiv.classList.add('contact');
    contactDiv.dataset.username = user.username;

    const nameSpan = document.createElement('span');
    nameSpan.textContent = user.username;

    const statusDot = document.createElement('span');
    statusDot.classList.add('status-dot', user.online ? 'status-online' : 'status-offline');

    contactDiv.appendChild(nameSpan);
    contactDiv.appendChild(statusDot);
    contactsContainer.appendChild(contactDiv);

    contactDiv.addEventListener('click', () => loadChat(user.username));
  });

    function loadChat(withUsername) {
    const freshAppData = JSON.parse(localStorage.getItem('friendsConnect')) || { users: [] };
    const freshCurrentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    const chatHeader = document.getElementById('chat-header');
    const chatMessages = document.getElementById('chat-messages');
    const chatInput = document.querySelector('#chat-input input');

    chatHeader.innerHTML = `<span>${withUsername}</span>`;
    chatMessages.innerHTML = '';
    chatInput.dataset.with = withUsername;

    const user = freshAppData.users.find(u => u.username === freshCurrentUser.username);
    const privateChat = user?.chats?.private?.find(chat => chat.with === withUsername);
    if (!privateChat) return;

    privateChat.messages
        .sort((a, b) => a.timestamp - b.timestamp)
        .forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', msg.sender === user.username ? 'sent' : 'received');

        const p = document.createElement('p');
        p.textContent = msg.content;

        const timeSpan = document.createElement('span');
        timeSpan.classList.add('timestamp');
        timeSpan.textContent = msg.time;

        messageDiv.appendChild(p);
        messageDiv.appendChild(timeSpan);
        chatMessages.appendChild(messageDiv);
        });

    chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    window.loadChat = loadChat;

    window.addEventListener('storage', (event) => {
    if (event.key === 'friendsConnect') {
        const updatedAppData = JSON.parse(event.newValue) || { users: [] };
        
        const newCurrentUser = updatedAppData.users.find(user => user.username === currentUser.username);
        if (!newCurrentUser) return;

        // Update the global user and app data
        window.currentUser = newCurrentUser;
        window.appData = updatedAppData;

        // Check if a chat is open and reload it
        const receiverUsername = document.querySelector('#chat-input input')?.dataset.with;
        if (receiverUsername) {
        loadChat(receiverUsername);
        }
    }
    });

});