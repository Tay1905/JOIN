let users = [];


async function init() {
    loadUsers();
}

/**
 * Gets the full name from the input and performs validations before splitting it.
 */
function registerValues() {
    let fullNameInput = document.getElementById('fullname-input').value;

    // Check for existence of '@' sign and full name length.
    existEmailSign();
    checkFullnameLength();

    // If both conditions are met, split the full name.
    if (checkFullnameLength() == true && existEmailSign() == true) {
        splitName(fullNameInput);
    } else {
        disableSignupBtn();
    }
}

/**
 * Splits the full name into first name and last name and registers the user.
 * @param {string} fullName - The full name to be split.
 */
function splitName(fullName) {
    let nameParts = fullName.split(" ");

    // Check if the full name has exactly two parts (first name and last name).
    if (nameParts.length === 2) {
        let firstname = nameParts[0];
        let lastname = nameParts[1];
        register(firstname, lastname);
    }
}

function existEmailSign() {
    let emailInput = document.getElementById('email');
    if (emailInput.value.includes('@')) {
        removeWarningMail(emailInput);
        return true;
    } else {
        disableSignupBtn();
        renderWarningTxtEmail(emailInput);
    }
}


function checkFullnameLength() {
    let fullNameInput = document.getElementById('fullname-input').value;
    if (fullNameInput && fullNameInput.split(' ').length === 2) {
        removeWarningName(fullNameInput);
        return true;
    } else {
        renderWarningTxtFullname();
        return false;
    }
}


function renderWarningTxtFullname() {
    let fullNameInput = document.getElementById('fullname-input');
    let warningTxt = document.getElementById('warningtxt-fullname');

    fullNameInput.style.border = "1px solid red";
    warningTxt.innerHTML = /*html*/`
        <span class="warning-text-subtask">Please fill in first- AND lastname</span>`;
}


function renderWarningTxtEmail(emailInput) {
    let warningTxt = document.getElementById('warningTxt-email');

    emailInput.style.border = "1px solid red";
    warningTxt.innerHTML = /*html*/`
        <span class="warning-text-subtask">Your email needs an @-sign!</span>`;
}


function removeWarningName() {
    let warningTxt = document.getElementById('warningtxt-fullname');
    let nameInput = document.getElementById('fullname-input');
    warningTxt.innerHTML = '';
    removeRedBorder(nameInput);
}


function removeWarningMail(emailInput) {
    let warningTxt = document.getElementById('warningTxt-email');
    warningTxt.innerHTML = '';
    removeRedBorder(emailInput);
}


function removeRedBorder(Input) {
    let warningTxt = Input;
    warningTxt.innerHTML = '';
    Input.style.border = '1px solid #D1D1D1';
}

/**
 * Pushes and saves the input values from the user in the 'users' array.
 * @param {string} firstname - The first name of the user.
 * @param {string} lastname - The last name of the user.
 */
async function register(firstname, lastname) {
    users.push({
        firstname: firstname,
        lastname: lastname,
        email: email.value,
        password: password.value,
    })

    await setItem('users', JSON.stringify(users));
    playSuccessAnimation();
}

/**
 * Loads the 'users' array from storage.
 */
async function loadUsers() {
    users = JSON.parse(await getItem('users'));
}

/**
 * Checks if the password is confirmed.
 */
function checkConfirmedPassword() {
    let password = document.getElementById('password');
    let confirmedPassword = document.getElementById('confirm-password');
    if (password.value == confirmedPassword.value) {
        passwordConfirmed();
    } else {
        warningConfirmPassword();
    }
}

/**
 * Removes the warning text and renders a green border when the password is confirmed.
 */
function passwordConfirmed() {
    let confirmPswdInput = document.getElementById('confirm-password');
    if (confirmPswdInput.value !== '') {
        confirmPswdInput.style.border = "3px solid green";
        let warningTxt = document.getElementById('warning-txt-confirm-password');
        warningTxt.innerHTML = /*html*/`
            <span class="warning-text-subtask"></span>
        `;
    }
}

/**
 * Gives an alert if the password is not confirming and renders a red border.
 */
function warningConfirmPassword() {
    let confirmPswdInput = document.getElementById('confirm-password');
    if (confirmPswdInput.value !== '') {
        confirmPswdInput.style.border = "1px solid red";
        let warningTxt = document.getElementById('warning-txt-confirm-password');
        warningTxt.innerHTML = /*html*/`
            <span class="warning-text-subtask">Oops! Your passwords don't match!</span>
        `;
    }
}


/**
 * Toggles the done sign in the checkbox and performs actions based on the checkbox state.
 */
function addDoneSignToSquare() {
    let checkBox = document.getElementById('checkbox');
    if (checkBox.src.includes('checkbox')) {
        checkBox.src = '/img/Group 19.png';
        checkInputsSignUp();
    } else {
        checkBox.src = '/img/checkbox.png';
        disableSignupBtn();
    }
}

/**
 * Enables the signup button.
 */
function enableSignUpBtn() {
    let signupBtn = document.getElementById('signupBtn');
    signupBtn.disabled = false;
    signupBtn.classList.remove('disabled');
}

/**
 * Disables the signup button.
 */
function disableSignupBtn() {
    let signupBtn = document.getElementById('signupBtn');
    signupBtn.disabled = true;
    signupBtn.classList.add('disabled');
}

/**
 * Checks the inputs for signup and enables/disables the signup button accordingly.
 */
function checkInputsSignUp() {
    let fullNameInput = document.getElementById('fullname-input');
    let emailInput = document.getElementById('email');
    let passwordInput = document.getElementById('password');
    let confirmedPassword = document.getElementById('confirm-password');

    if (fullNameInput.value !== '' && emailInput.value !== '' && passwordInput.value !== '' && confirmedPassword.value !== '') {
        enableSignUpBtn();
    } else {
        disableSignupBtn();
    }
}

/**
 * Animates the success information and redirects to the login page after a delay.
 */
function playSuccessAnimation() {
    let animation = document.getElementById('signup-success-animation');
    animation.classList.add('d-flex');
    animation.classList.add('signup-animation');

    setTimeout(() => {
        window.location.href = '/html/login.html'
    }, 2000);
}

/**
 * Changes the background image in the confirm password field from lock to eye-slash.
 */
function bgImgEyeConfirm() {
    let passwordInput = document.getElementById('confirm-password');
    if (passwordInput.value === '') {
        passwordInput.style.backgroundImage = "url(/img/lock.png)";
    } else {
        passwordInput.style.backgroundImage = "url(/img/eye-slash.svg)";
    }
}

/**
 * Changes the closed eye to an open eye in the confirm password field.
 */
function changeEyeConfirm() {
    let passwordInput = document.getElementById('confirm-password');
    if (passwordInput.style.backgroundImage.includes('/img/eye-slash.svg')) {
        passwordInput.style.backgroundImage = "url(/img/eye.svg)";
    } else if (passwordInput.style.backgroundImage.includes('/img/eye.svg')) {
        passwordInput.style.backgroundImage = "url(/img/eye-slash.svg)";
    }
    showPassword(passwordInput);
    setTimeout(function () { setAutoFocusAtTheEnd(passwordInput); }, 0);
}

/**
 * Shows or hides the password in the confirm password field when clicked.
 * @param {HTMLInputElement} passwordInput - The confirm password input element.
 */
function showPassword(passwordInput) {
    if (passwordInput.style.backgroundImage.includes('/img/eye.svg')) {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
}









