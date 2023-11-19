var Register = document.getElementById('Register');
var Login = document.getElementById('Login');

var firstNameInput = document.getElementById('firstName');
var lastNameInput = document.getElementById('lastName');
var birthDateInput = document.getElementById('birthdate');
var emailInput = document.getElementById('email');
var confirmEmailInput = document.getElementById('Confirmemail');
var passwordInput = document.getElementById('password');
var confirmPasswordInput = document.getElementById('Confirmpassword');

var emailCheckInput = document.getElementById('emailCheak');
var passwordCheckInput = document.getElementById('passwordCheak');

Register.addEventListener('click', save);
Login.addEventListener('click', checkInfo);

const namePattern = /^[A-Za-z]+$/;
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const passwordPattern = /^(?=.*[A-Z])(?=.*\d.*\d)(?=.*[!@#$%^&*]).{8,32}$/;
const datePattern = /^\d{4}-\d{2}-\d{2}$/;

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

    if (!datePattern.test(birthDateInput.value)) {
    showError('wrongeBirthDate', 'Invalid birth date.');
    event.preventDefault();
    return;
    }

    if (!emailPattern.test(emailInput.value)) {
        showError('wrongeEmail', 'Invalid email address.');
        event.preventDefault();
        return;
    }

    if (emailInput.value !== confirmEmailInput.value) {
        showError('wrongeEmailConfirm', 'Emails do not match.');
        event.preventDefault();
        return;
    }

    if (!passwordPattern.test(passwordInput.value)) {
        showError('wrongePassword', 'Invalid password. Please follow the password requirements.');
        event.preventDefault();
        return;
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        showError('wrongePasswordConfirm', 'Passwords do not match.');
        event.preventDefault();
        return;
    }

    saveToLocalStorage(firstNameInput.value, lastNameInput.value, birthDateInput.value, emailInput.value, passwordInput.value);
}

function checkInfo(event) {
    clearErrorMessages();

    const emailToCheck = emailCheckInput.value;
    const passwordToCheck = passwordCheckInput.value;

    const storedEmail = localStorage.getItem('Email');
    const storedPassword = localStorage.getItem('Password');

    if (emailToCheck === storedEmail && passwordToCheck === storedPassword) {
        alert('Login successful!');
    } else if(emailToCheck != storedEmail){
        showError('wrongemailLogin', `Email isn't Registed.`);
        event.preventDefault();
    } else {
        showError('wrongpasswordLogin', `Password isn't Wrong.`);
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

function saveToLocalStorage(firstName, lastName, birthdate, email, password) {
    localStorage.setItem('first Name', firstName);
    localStorage.setItem('last Name', lastName);
    localStorage.setItem('birth date', birthdate);
    localStorage.setItem('Email', email);
    localStorage.setItem('Password', password);
}
