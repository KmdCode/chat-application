document.addEventListener('DOMContentLoaded', () => {
  const chatInput = document.querySelector('#chat-input input');
  const sendBtn = document.getElementById('send-btn');

  const sendMessage = () => {
    const message = chatInput.value.trim();
    const receiverUsername = chatInput.dataset.with;

    if (!message || !receiverUsername) return;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    let appData = JSON.parse(localStorage.getItem('friendsConnect')) || { users: [] };
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    const sender = appData.users.find(user => user.username === currentUser.username);
    const receiver = appData.users.find(user => user.username === receiverUsername);

    if (!sender || !receiver) return;

    if (!sender.chats) sender.chats = { private: [], group: [] };
    if (!receiver.chats) receiver.chats = { private: [], group: [] };

    let senderChat = sender.chats.private.find(chat => chat.with === receiverUsername);
    if (!senderChat) {
      senderChat = { with: receiverUsername, online: receiver.online, messages: [] };
      sender.chats.private.push(senderChat);
    }

    let receiverChat = receiver.chats.private.find(chat => chat.with === sender.username);
    if (!receiverChat) {
      receiverChat = { with: sender.username, online: sender.online, messages: [] };
      receiver.chats.private.push(receiverChat);
    }

    const msgObject = {
      sender: sender.username,
      content: message,
      time,
      timestamp: Date.now()
    };

    senderChat.messages.push(msgObject);
    receiverChat.messages.push(msgObject);

    const senderIndex = appData.users.findIndex(user => user.username === sender.username);
    const receiverIndex = appData.users.findIndex(user => user.username === receiver.username);

    appData.users[senderIndex] = sender;
    appData.users[receiverIndex] = receiver;

    localStorage.setItem('friendsConnect', JSON.stringify(appData));
    sessionStorage.setItem('currentUser', JSON.stringify(sender));
    window.currentUser = sender;

    chatInput.value = '';

    if (window.loadChat) {
      window.loadChat(receiverUsername);
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') sendMessage();
  });
});
