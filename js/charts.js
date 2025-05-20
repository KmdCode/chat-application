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
    chatHeader.innerHTML = `<span>${withUsername}</span>`;
    chatMessages.innerHTML = '';
    chatInput.dataset.with = withUsername;

    const privateChat = currentUser.chats?.private?.find(chat => chat.with === withUsername);
    if (!privateChat) return;

    privateChat.messages.forEach(msg => {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message', msg.sender === currentUser.username ? 'sent' : 'received');

      const p = document.createElement('p');
      p.textContent = msg.content;

      const timeSpan = document.createElement('span');
      timeSpan.classList.add('timestamp');
      timeSpan.textContent = msg.time;

      messageDiv.appendChild(p);
      messageDiv.appendChild(timeSpan);
      chatMessages.appendChild(messageDiv);
    });
  }

  window.loadChat = loadChat;
});
