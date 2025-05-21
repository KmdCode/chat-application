const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const messagesContainer = document.getElementById('chat-messages');
const usersList = document.getElementById('charts');

// Get current user from sessionStorage
const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
if (!currentUser) {
  alert("You're not logged in.");
  window.location.href = "login.html";
}

let appData = JSON.parse(localStorage.getItem("friendsConnect")) || { users: [] };

// Initialize global groupChat if it doesn't exist
if (!appData.groupChat) {
  appData.groupChat = {
    name: "Global Room",
    participants: appData.users.map(u => u.id),
    messages: []
  };
  localStorage.setItem("friendsConnect", JSON.stringify(appData));
}

let groupChat = appData.groupChat;

function displayUsers() {
  usersList.innerHTML = "";
  appData.users.forEach(user => {
    const userDiv = document.createElement("div");
    userDiv.className = "contact";
    userDiv.innerHTML = `
      <span>${user.username}</span>
    `;
    usersList.appendChild(userDiv);
  });
}

function loadMessages() {
  messagesContainer.innerHTML = "";

  groupChat.messages.forEach(msg => {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message");

    const isCurrentUser = msg.senderId === currentUser.id;
    msgDiv.classList.add(isCurrentUser ? "me" : "them");

    const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    msgDiv.innerHTML = `
      <p><strong>${msg.sender}</strong></p>
      <p>${msg.text}</p>
      <span class="timestamp">${time}</span>
    `;

    messagesContainer.appendChild(msgDiv);
  });

  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

sendBtn.addEventListener('click', () => {
  const text = messageInput.value.trim();
  if (!text) return;

  const newMessage = {
    sender: currentUser.username,
    senderId: currentUser.id,
    text,
    timestamp: new Date().toISOString()
  };

  // Push to global chat
  groupChat.messages.push(newMessage);
  appData.groupChat = groupChat;
  localStorage.setItem("friendsConnect", JSON.stringify(appData));

  messageInput.value = "";
  loadMessages();
});

// Optional: Send message with Enter key
messageInput.addEventListener('keypress', e => {
  if (e.key === "Enter") sendBtn.click();
});

// Listen for changes from other tabs (multi-tab sync)
window.addEventListener('storage', (event) => {
  if (event.key === "friendsConnect") {
    appData = JSON.parse(localStorage.getItem("friendsConnect")) || { users: [] };
    groupChat = appData.groupChat || { messages: [] };
    loadMessages();
    displayUsers();
  }
});

displayUsers();
loadMessages();
