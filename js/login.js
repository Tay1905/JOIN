let currentUser;


async function createmsg() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');

    if (msg) {
        document.getElementById('msgBox').innerHTML = msg;
    }
    else {
        //document.getElementById('msgBox').classList.add(d-none);
    }
    await loadUsers();
}

/**
 * Gets the values from login inputs and checks if the user exists.
 * If the user exists, sets the current user, saves it to local storage, and redirects to the summary page.
 * If the user does not exist, shows a user not found or wrong password message.
 */
async function login() {
    // Load users from storage.
    await loadUsers();

    // Get values from login inputs.
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    // Find user based on email and password.
    let user = users.find(u => u.email == email && u.password == password);

    if (user) {
        // Set current user and redirect to summary page.
        currentUser = user['firstname'] + ' ' + user['lastname'];
        await setItem('currentUser', JSON.stringify(currentUser));
        window.location.href = '../html/summary.html';
    } else if (users.every(u => u.email !== email)) {
        // Show user not found message.
        userNotFound();
    } else {
        // Show wrong password message.
        wrongPassword();
    }
}

/**
 * Opens the summary page with a guest account.
 */
async function guestLogin() {
    currentUser = '';
    await setItem('currentUser', JSON.stringify(currentUser));
    window.location.href = '../html/summary.html';
}

/**
 * Toggles the done sign in the remember me checkbox.
 */
function rememberMe() {
    let checkBox = document.getElementById('remember-me-btn');
    if (checkBox.src.includes('checkbox')) {
        checkBox.src = '../img/Group 19.png';
    } else {
        checkBox.src = '../img/checkbox.png';
    }
}


/**
 * Changes the background image in the password field from lock to eye-slash.
 */
function bgImgEye() {
    let passwordInput = document.getElementById('password');
    if (passwordInput.value === '') {
        passwordInput.style.backgroundImage = "url(/img/lock.png)";
    } else {
        passwordInput.style.backgroundImage = "url(/img/eye-slash.svg)";
    }
}

/**
 * Changes the closed eye to open eye.
 */
function changeEye() {
    let passwordInput = document.getElementById('password');
    if (passwordInput.style.backgroundImage.includes('/img/eye-slash.svg')) {
        passwordInput.style.backgroundImage = "url(/img/eye.svg)";
    } else if (passwordInput.style.backgroundImage.includes('/img/eye.svg')) {
        passwordInput.style.backgroundImage = "url(/img/eye-slash.svg)";
    }
    showPassword(passwordInput);
    setTimeout(function () { setAutoFocusAtTheEnd(passwordInput); }, 0);
}

/**
 * Shows or hides the password in the password field.
 * @param {HTMLInputElement} passwordInput - The password input element.
 */
function showPassword(passwordInput) {
    if (passwordInput.style.backgroundImage.includes('/img/eye.svg')) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}

/**
 * Sets the autofocus at the end of the word in the inputs.
 * @param {HTMLInputElement} passwordInput - The password input element.
 */
function setAutoFocusAtTheEnd(passwordInput) {
    let inputValue = passwordInput.value;
    passwordInput.focus();
    passwordInput.setSelectionRange(inputValue.length, inputValue.length);
}


/**
 * Checks if the login inputs are filled and performs further validation.
 */
function checkLoginInputs() {
    if (loginInputsEmpty() == false) {
        checkEmailInput();
        checkPasswordInput();
    } else {
        reloadLogin();
        login();
    }
}

/**
 * Sets the login inputs and warning texts back to their default state.
 */
function reloadLogin() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let userNotFound = document.getElementById('user-not-found');
    let wrongPassword = document.getElementById('wrong-password');
    userNotFound.innerHTML = '';
    wrongPassword.innerHTML = '';
    removeWarningTxt(email);
    removeWarningTxt(password);
}

/**
 * Checks if the login inputs are empty.
 * @returns {boolean} True if any of the login inputs are empty, otherwise false.
 */
function loginInputsEmpty() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    return email.value !== '' && password.value !== '';
}

/**
 * Checks if the email input is filled and displays a warning if it is empty.
 */
function checkEmailInput() {
    let email = document.getElementById('email');
    if (email.value == '') {
        renderWarningTxt(email);
    } else {
        removeWarningTxt(email);
    }
}

/**
 * Checks if the password input is filled and displays a warning if it is empty.
 */
function checkPasswordInput() {
    let password = document.getElementById('password');
    if (password.value == '') {
        renderWarningTxt(password);
    } else {
        removeWarningTxt(password);
    }
}

/**
 * Sets a red border to the input field to indicate a warning.
 * @param {HTMLElement} input - The input element to render the warning for.
 */
function renderWarningTxt(input) {
    input.classList.add('red-border');
}

/**
 * Removes the red border from the input field to clear the warning.
 * @param {HTMLElement} input - The input element to remove the warning for.
 */
function removeWarningTxt(input) {
    input.classList.remove('red-border');
}

/**
 * Renders a warning when the user is not found.
 */
function userNotFound() {
    let email = document.getElementById('email');
    renderWarningTxt(email);
    let warningTxt = document.getElementById('user-not-found');
    warningTxt.innerHTML = /*html*/`
        <span class="warning-text-subtask">User not found, please try another email!</span>
    `;
}

/**
 * Renders a warning text for the password input when the password is incorrect.
 */
function wrongPassword() {
    let password = document.getElementById('password');
    renderWarningTxt(password);
    let warningTxt = document.getElementById('wrong-password');
    warningTxt.innerHTML = /*html*/`
        <span class="warning-text-subtask">Wrong password. Oops. Try again!</span>
    `;
}


