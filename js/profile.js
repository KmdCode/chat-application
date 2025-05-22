const user = JSON.parse(sessionStorage.getItem("currentUser"));
const appData = JSON.parse(localStorage.getItem("friendsConnect"));

// Populate fields
document.getElementById("profile-username").value = user.username;
document.getElementById("profile-email").value = user.email;

document.getElementById("save-btn").addEventListener("click", () => {
  const updatedUsername = document.getElementById("profile-username").value.trim();
  const updatedEmail = document.getElementById("profile-email").value.trim();

  // Validation: prevent duplicate usernames or emails
  const duplicateUser = appData.users.find(u =>
    (u.username.toLowerCase() === updatedUsername.toLowerCase() || u.email.toLowerCase() === updatedEmail.toLowerCase()) &&
    u.id !== user.id
  );

  if (duplicateUser) {
    alert("Username or email already in use.");
    return;
  }

  // Update user
  user.username = updatedUsername;
  user.email = updatedEmail;

  // Update user in localStorage
  const updatedUsers = appData.users.map(u => u.id === user.id ? user : u);
  appData.users = updatedUsers;

  localStorage.setItem("friendsConnect", JSON.stringify(appData));
  sessionStorage.setItem("currentUser", JSON.stringify(user));

  alert("Profile updated successfully!");
});
