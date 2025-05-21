const user = JSON.parse(sessionStorage.getItem("currentUser"));
document.getElementById("profile-username").textContent = user.username;
document.getElementById("profile-email").textContent = user.email;
window.location.href='profile.html';