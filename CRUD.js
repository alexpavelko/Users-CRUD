var firstName = document.querySelector('#userFName');   
var lastName = document.querySelector('#userLName');
var userPassword = document.querySelector('#userPass');
var birthDate = document.querySelector('#userBDay');
var form = document.querySelector('#form-Add-User');
var table =  document.querySelector('#mainTable');
var btnUpdate = document.querySelector("#btn-update");
form.style.display = 'none'; 

userPassword.addEventListener('input',() => {
    userPassword.value = userPassword.value.replace(/[а-я]/gi,'');
});

