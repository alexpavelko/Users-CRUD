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

GetAllUsersRequest(table);

var btnRegNewUser = document.querySelector('#btn-submit');
btnRegNewUser.addEventListener('click',()=>{   
    formValidate();
    let type = "POST";
    let url = "http://localhost:56481/api/Users";
    
    AddUserRequest(type,url);
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



function formValidate(){
    firstName.maxLength = 20;
    lastName.maxLength = 20;
    userPassword.maxLength = 20;
 
    let firstNameInput = {  value: firstName.value,size: 5, label: document.querySelector("#lblFname"),span:document.querySelector("#spanFname")};
    let lastNameInput = {  value: lastName.value,size: 5, label: document.querySelector("#lblLname"),span:document.querySelector("#spanLname")}
    let PasswordInput = {  value: userPassword.value,size: 8, label: document.querySelector("#lblPass"),span:document.querySelector("#spanPass")};

    let inputs = [firstNameInput,lastNameInput,PasswordInput];
    
    inputs.forEach(function(obj, index){   
     
    if(obj.value.length<obj.size){   
        obj.span.style.color = "red";   
        let text = (`✖ ${obj.label.innerHTML} должен быть длинее ${obj.size-1} символов!`);
        obj.span.innerHTML = text;  
        }
        else{          
            obj.span.innerHTML = '✓';
            obj.span.style.color = "green";   
        }         
    }); 
}


function GetAllUsersRequest(){
    var xhr = new XMLHttpRequest();
    
    xhr.open("GET", "http://localhost:56481/api/Users");
    xhr.send();
    xhr.onload=function(){      
    var users=JSON.parse(xhr.response);
   
    users.forEach(function(obj, index){    
        let buttonRemove = document.createElement("input");   
        buttonRemove.type = "button"; 
        buttonRemove.value = "Remove";
        let buttonUpdate = document.createElement("input");     
        buttonUpdate.value = "Update";
        buttonUpdate.type = "button";
        let tr = document.createElement('tr');      
        let tdForBtnRemove = document.createElement('td');
        let tdForBtnEdit = document.createElement('td');
        for (let key in obj){                     
            var td = document.createElement('td');
         
            tdForBtnRemove.appendChild(buttonRemove);
                
            tdForBtnEdit.appendChild(buttonUpdate);
            td.innerHTML = obj[key];
            tr.appendChild(td);   
            
            tr.append(tdForBtnEdit);     
            tr.append(tdForBtnRemove);                             
        }
        buttonRemove.addEventListener('click',()=>{
            let tr = buttonRemove.parentNode.parentNode;
            let td = tr.getElementsByTagName("td")[0].innerHTML;
            let userID = td; 
            let type = "DELETE"; 
            let url = `http://localhost:56481/api/Users/${userID}`;
            DeleteUserRequest(type, url);
            window.location.reload();
        });
        buttonUpdate.addEventListener('click',()=>{        
            form.style.display = 'block';
            btnRegNewUser.style.display = 'none';
            btnUpdate.style.display = 'block';
            btnUpdate.addEventListener('click',()=>{
                let tr = buttonUpdate.parentNode.parentNode;
                let td = tr.getElementsByTagName("td")[0].innerHTML;
                let userID = td; 
                let type = "PUT";
                let url = `http://localhost:56481/api/Users/${userID}`;
                DeleteUserRequest(userID);         
                UpdateUserRequest(type, url);
                window.location.reload();
            });           
        });

        table.appendChild(tr); 
    }); 
    }    
}
