window.addEventListener('DOMContentLoaded', () => {
    const appData = JSON.parse(localStorage.getItem('friendsConnect')) || { users: [], groupChats: [] };
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const groupContainer = document.getElementById('groups');
    groupContainer.innerHTML = '';

    if (!currentUser || !appData.groupChats) return;

    const userGroups = appData.groupChats.filter(group =>
      group.members.some(user => user.email === currentUser.email)
    );

    if (userGroups.length === 0) {
      groupContainer.innerHTML = '<div id="group">You are not in any groups yet.</div>';
      return;
    }

    userGroups.forEach(group => {
      const groupDiv = document.createElement('div');
      groupDiv.id = 'group';
      groupDiv.textContent = group.name;

      groupDiv.addEventListener('click', () => {
        loadGroupChat(group.name);
      });

      groupContainer.appendChild(groupDiv);
    });
  });

const loadGroupChat = (groupName) => {
    const appData = JSON.parse(localStorage.getItem('friendsConnect') || {user : [], groupChats: []});
    const group = appData.groupChats.find(group => group.name === groupName);
    const chatHeader = document.getElementById('chat-header');
    const chatMessages = document.getElementById('chat-messages');

    chatHeader.innerHTML = `<span>${group.name}</span>`;
    chatMessages.innerHTML = '';

    group.messages.forEach(message => {
        const div = document.createElement('div');
        div.className = 'message';
        div.innerHTML = `<p><strong>${message.sender}</strong>:<br> ${message.content}</p> <span class"timestamp">${message.time}</span>`;
        chatMessages.appendChild(div)
    })

    chatMessages.scrollTop = chatMessages.scrollHeight;
    sessionStorage.setItem('activeGroup', groupName);
}

const sendButton = document.getElementById('send-btn');
const input = document.getElementById('message-input');

const sendGroupMessage = () => {
    const text = input.value.trim();

    if(!text) return;

    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const groupName = sessionStorage.getItem('activeGroup');
    const appData = JSON.parse(localStorage.getItem('friendsConnect'));

    group = appData.groupChats.find(group => group.name === groupName)

    const timestamp = new Date();

    const message = {
        sender: currentUser.username,
        content: text,
        time: timestamp.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
        timestamp: timestamp.getTime()
    };

    group.messages.push(message);
    localStorage.setItem('friendsConnect', JSON.stringify(appData));

    input.value = '';
    loadGroupChat(groupName);
}

sendButton.addEventListener('click', sendGroupMessage)
input.addEventListener('keypress', event => {
    if (event.key === 'Enter') sendGroupMessage();
})

window.addEventListener('storage', (event) => {
  if (event.key === 'friendsConnect') {
    const updatedAppData = JSON.parse(event.newValue) || { users: [], groupChats: [] };
    const activeGroupName = sessionStorage.getItem('activeGroup');

    if (activeGroupName) {
      const updatedGroup = updatedAppData.groupChats.find(group => group.name === activeGroupName);
      if (updatedGroup) {
        loadGroupChat(activeGroupName);
      }
    }
  }
});
