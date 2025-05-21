function logout() {
    sessionStorage.removeItem("currentUser");
    alert("You have been logged out.");
    window.location.href = "login.html";
}