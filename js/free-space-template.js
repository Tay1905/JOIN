async function initHeader() {
    await loadUsers();
    await loadCurrentUser();
    initialsHeader();
}

 
async function loadCurrentUser() {
    currentUser = await getItem('currentUser');
}


function getInitialsHeader() {
    let names = currentUser.split(" ");
    let initials = names[0].charAt(0) + names[1].charAt(0);
    return initials;
}


function initialsHeader() {
    let initialsCircle = document.getElementById('header-initials');
    
    if (currentUser == '') {
        initialsCircle.innerHTML = 'G';
    } else {
        initialsCircle.innerHTML = getInitialsHeader();
    }
}


function openInitialMenu() {
    let initialDiv = document.getElementById('header-initials-menu');
    initialDiv.classList.remove('d-none');
}

