# FriendsConnect

A simple web-based chat application built with vanilla JavaScript, HTML, and CSS. Users can sign up, log in, and send messages in private or group chats. The app leverages `localStorage` to manage user data and messages.

 Project Link: https://kmdcode.github.io/chat-application/

## 🚀 Features

- 🔐 User authentication (Signup/Login)
- 📬 Private chat support
- 🧑‍💻 Basic profile management
- 🧠 Data persisted using localStorage

## 📁 Project Structure

## 📁 Wireframes

- Landing:https://www.figma.com/design/9JgWlojYuTVexMKLWmtFP7/friendsconnect?node-id=0-1&t=0o23IbRD7JDOyDXg-1
- Login:https://www.figma.com/design/9JgWlojYuTVexMKLWmtFP7/friendsconnect?node-id=78-82&t=0o23IbRD7JDOyDXg-1
- Signup:https://www.figma.com/design/9JgWlojYuTVexMKLWmtFP7/friendsconnect?node-id=2-161&t=0o23IbRD7JDOyDXg-1
- Chats:https://www.figma.com/design/9JgWlojYuTVexMKLWmtFP7/friendsconnect?node-id=2-289&t=0o23IbRD7JDOyDXg-1

```
📦 FriendsConnect
├── 📁 js
│   ├── login.js
│   ├── signup.js
│   ├── charts.js
│   ├── logout.js
│   └── sendMessage.js
├── 📁 styles
│   ├── login.css
│   ├── sign-up.css
│   └── chats.css
├── 📄 login.html
├── 📄 sign-up.html
├── 📄 chat.html
└── 📄 profile.html
```

##  JSON Data Structure (localStorage)

```json
{
  "version": "1.0",
  "users": [
    {
      "id": "1",
      "username": "john_doe",
      "email": "john@example.com",
      "password": "hashedPassword",
      "online": true,
      "chats": {
        "private": [
          {
            "with": "Modise",
            "online": false,
            "messages": [
              {
                "sender": "Karabo",
                "text": "Hey!",
                "timestamp": "2024-05-21T10:00:00Z"
              }
            ]
          }
        ],
        "group": [
          {
            "name": "Friends Group",
            "participants": ["Stones", "Smith"],
            "messages": [
              {
                "sender": "Dias",
                "text": "Hello everyone!",
                "timestamp": "2024-05-21T09:30:00Z"
              }
            ]
          }
        ]
      }
    }
  ]
}
```

## 🛠 Tech Stack

- HTML5
- CSS3 (with Flexbox & Grid)
- Vanilla JavaScript
- localStorage