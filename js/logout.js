const logout = () => {
    const appData = JSON.parse(localStorage.getItem("friendsConnect")) || { users: [] };
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (currentUser) {
        const updatedUsers = appData.users.map(user =>
            user.id === currentUser.id ? { ...user, online: false } : user
        );
        localStorage.setItem("friendsConnect", JSON.stringify({ ...appData, users: updatedUsers }));
    }

    sessionStorage.removeItem("currentUser");
    alert("You have been logged out.");
    window.location.href = "login.html";
}
