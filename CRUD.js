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



var btnRegNewUser = document.querySelector('#btn-submit');
btnRegNewUser.addEventListener('click',()=>{   
    formValidate();
    let type = "POST";
    let url = "http://localhost:56481/api/Users";
    
    AddUserRequest(type,url);
    window.location.reload(); 
});

var btnAddUser = document.querySelector("#btn-sign-in");
btnAddUser.addEventListener('click',() =>{
    form.style.display = 'block';
    btnRegNewUser.style.display = 'block';
    btnUpdate.style.display = 'none';
});

var appExit = document.querySelector("#btn-exit");
appExit.addEventListener('click',() =>{
    table.style.display = 'none';
    form.style.display = 'none';
    btnRegNewUser.style.display = 'none';
    btnUpdate.style.display = 'none';
});

