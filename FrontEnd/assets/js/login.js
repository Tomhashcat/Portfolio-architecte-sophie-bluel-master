var buttonLog = document.querySelector('.connect');
var Email=document.querySelector('.mail');
var password=document.querySelector('.pass');

buttonLog.addEventListener('click', LogIn)

async function LogIn(){
const response = await fetch("http://localhost:5678/api/users/login");
const users =await  response.json();

let userExists =false;

for (let i = 0; i < users.length; i++) {
 if (users[i].email===Email.value){
  userExists=true;
 
 }
  
}
if(userExists){
console.log('user trouvé')
}else{
  console.log('user non-trouvé')
}
}