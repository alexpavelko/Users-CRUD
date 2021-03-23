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
               
            });           
        });

        table.appendChild(tr); 
    }); 
    }    
}