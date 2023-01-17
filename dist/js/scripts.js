function validateEmail(){
    let email = document.getElementById('email');
    let emailError = document.getElementById('emailError');
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(emailRegex.test(email.value)){
        email.style.border = "2px solid green";
        document.getElementById('loginRegisterSubmit').disabled = false;
        emailError.classList.add('d-none');
        return true;
    }else{
        email.style.border = "2px solid red";
        document.getElementById('loginRegisterSubmit').disabled = true;
        emailError.classList.remove('d-none');
        return false;
    }
}

function validateName(){
    let name = document.getElementById('fullName');    
    let nameError = document.getElementById('nameError');
    if(name.value.length > 0){
        name.style.border = "2px solid green";
        document.getElementById('loginRegisterSubmit').disabled = false;
        nameError.classList.add('d-none');
        return true;
    }else{
        name.style.border = "2px solid red";
        document.getElementById('loginRegisterSubmit').disabled = true;
        nameError.classList.remove('d-none');
        return false;
    }
}

function validatePassword(){
    let password = document.getElementById('password');
    let passwordError = document.getElementById('passwordError');
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if(passwordRegex.test(password.value)){
        password.style.border = "2px solid green";
        document.getElementById('loginRegisterSubmit').disabled = false;
        passwordError.classList.add('d-none');
        return true;
    }else{
        password.style.border = "2px solid red";
        document.getElementById('loginRegisterSubmit').disabled = true;
        passwordError.classList.remove('d-none');
        return false;
    }
}

function validateConfirmPassword(){
    let confirmPassword = document.getElementById('confirmPassword');
    let confirmPasswordError = document.getElementById('confirmPasswordError');
    if(confirmPassword.value == document.getElementById('password').value && confirmPassword.value.length > 0){
        confirmPassword.style.border = "2px solid green";
        document.getElementById('loginRegisterSubmit').disabled = false;
        confirmPasswordError.classList.add('d-none');
        return true;
    }else{
        confirmPassword.style.border = "2px solid red";
        document.getElementById('loginRegisterSubmit').disabled = true;
        confirmPasswordError.classList.remove('d-none');
        return false;
    }
}

function validateRegister(){
    document.querySelector('#fullName').addEventListener('input', validateName);
    document.querySelector('#email').addEventListener('input', validateEmail);
    document.querySelector('#password').addEventListener('input', validatePassword);
    document.querySelector('#confirmPassword').addEventListener('input', function(){
        document.getElementById('loginRegisterSubmit').disabled = false;
    });

    if (validateName() && validateEmail() && validatePassword() && validateConfirmPassword()){
        document.getElementById('loginRegisterSubmit').disabled = false;
    }else{
        document.getElementById('loginRegisterSubmit').disabled = true;
    }
}

function validateLogin(){
    document.querySelector('#email').addEventListener('input', validateEmail);
    document.querySelector('#password').addEventListener('input', validatePassword);
    if (validateEmail() && validatePassword()){
        document.getElementById('loginRegisterSubmit').disabled = false;
    }else{
        document.getElementById('loginRegisterSubmit').disabled = true;
    }
}