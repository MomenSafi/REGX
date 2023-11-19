var Register = document.getElementById('Register');
var Login = document.getElementById('Login');

var firstNameInput = document.getElementById('firstName');
var lastNameInput = document.getElementById('lastName');
var emailInput = document.getElementById('email');
var ConfirmEmailInput = document.getElementById('ConfirmEmail');
var passwordInput = document.getElementById('password');
var ConfirmPasswordInput = document.getElementById('ConfirmPassword');

var emailCheckInput = document.getElementById('emailCheak');
var passwordCheckInput = document.getElementById('passwordCheak');

Register.addEventListener('click', save);
Login.addEventListener('click', checkInfo);

const namePattern = /^[A-Za-z]+$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*]).{8,32}$/;

function save(event) {
    clearErrorMessages();

    if (!namePattern.test(firstNameInput.value)) {
        showError('wrongeFName', 'Invalid first name. Only letters are allowed.');
        event.preventDefault();
        return;
    }

    if (!namePattern.test(lastNameInput.value)) {
        showError('wrongeLName', 'Invalid last name. Only letters are allowed.');
        event.preventDefault();
        return;
    }

    if (!emailPattern.test(emailInput.value)) {
        showError('wrongeEmail', 'Invalid email address.');
        event.preventDefault();
        return;
    }

    if (emailInput.value !== ConfirmEmailInput.value) {
        showError('wrongeEmailConfirm', 'Emails do not match.');
        event.preventDefault();
        return;
    }

    if (!passwordPattern.test(passwordInput.value)) {
        showError('wrongePassword', 'Invalid password. Please follow the password requirements.');
        event.preventDefault();
        return;
    }

    if (passwordInput.value !== ConfirmPasswordInput.value) {
        showError('wrongeConfirmPassword', 'Passwords do not match.');
        event.preventDefault();
        return;
    }

    saveToLocalStorage(emailInput.value, passwordInput.value);
}

function checkInfo(event) {
    clearErrorMessages();

    const emailToCheck = emailCheckInput.value;
    const passwordToCheck = passwordCheckInput.value;

    const storedEmail = localStorage.getItem('registeredEmail');
    const storedPassword = localStorage.getItem('registeredPassword');

    if (emailToCheck === storedEmail && passwordToCheck === storedPassword) {
        alert('Login successful!');
    } else {
        showError('wrongemailLogin', 'Email or password is incorrect.');
        event.preventDefault();
    }
}

function showError(elementId, errorMessage) {
    const errorElement = document.getElementById(elementId);
    errorElement.innerText = errorMessage;
    errorElement.style.display = 'block';
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.wrong');
    errorElements.forEach((element) => {
        element.innerText = '';
        element.style.display = 'none';
    });
}

function saveToLocalStorage(email, password) {
    localStorage.setItem('registeredEmail', email);
    localStorage.setItem('registeredPassword', password);
}
