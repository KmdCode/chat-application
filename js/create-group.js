document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('create-group-form');
    const checkboxContainer = document.getElementById('checkbox-container');

    
    const appData = JSON.parse(localStorage.getItem('friendsConnect') || {users:[]});
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    const selectableMembers = appData.users.filter(user => user.username !== currentUser.username );

    let checkboxHTML = '<p>Select Group Members</p>';

    selectableMembers.forEach( user => {
        checkboxHTML+= `<input type="checkbox" name="members" id=${user.username} value=${user.username}>
        <label for=${user.username}>${user.username}</label><br>`;
    })

    checkboxContainer.innerHTML = checkboxHTML;


    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const groupName = document.getElementById('group-name').value;

        const inputs = form.querySelectorAll('input[name="members"]:checked');
        const selectedMembers = [];

        for (let i = 0; i < inputs.length; i++) {
        selectedMembers.push(inputs[i].value);
        }

        selectedMembers.push(currentUser.username);

        const groupMembers = appData.users.filter(user => selectedMembers.includes(user.username))
        .map(user => ({
            id: user.id,
            name: user.username,
            email: user.email
        }))
        console.log("members")
        console.log(groupMembers)

        const newGroup = {
            name: groupName,
            members: groupMembers,
            messages:[]
        }

        if(!appData.groupChats){
            appData.groupChats = [];
        }

        appData.groupChats.push(newGroup);

        localStorage.setItem('friendsConnect', JSON.stringify(appData));
        
        window.location.href = ('groups.html');

    })
})