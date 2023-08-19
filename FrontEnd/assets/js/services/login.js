/**
 * VARIABLES DECLARATIONs
 */
var emailInput;
var passwordInput;
var messageError;
var divError;
var errorClose;
var divLogin;
var email;
var password;
var response;
var jsonResponse;
var userId;
var data;
var token = localStorage.getItem('token');

/**
 * GET THE LOGINFORM
 */
var loginForm = document.querySelector(".loginForm");
loginForm.addEventListener('submit', handleLogin);

/**
 * GET THE INFOS OF THE AND CHECK  IF EXIST
 * @param {obj} event 
 */
if (token) {
  console.log('Utilisateur déjà connecté');
  window.location.href = 'index.html'; // Rediriger vers la page d'accueil
}
async function handleLogin(event) {
  event.preventDefault();

  emailInput = document.querySelector('.email');
  passwordInput = document.querySelector('.password');
  messageError = document.querySelector('.error-message');
  divError = document.querySelector('.error');
  errorClose = document.querySelector('.error-close');
  divLogin = document.querySelector('.div-login');
  email = emailInput.value;
  password = passwordInput.value;

  response = await fetch("http://localhost:5678/api/users/login", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'email': email,
      'password': password
    })
  });
  /**
   *IF ALL GOOD GO BACK TO INDEX WITH EDITION MODE
   */
  if (response.ok) {
    jsonResponse = await response.json();
    console.log(jsonResponse);

    userId = jsonResponse.userId;
    token = jsonResponse.token;
    if (userId && token) {
      console.log('Utilisateur trouvé');
      console.log('userId:', userId);

      localStorage.setItem('userId', userId);
      localStorage.setItem('token', jsonResponse.token);
      window.location.href = 'index.html';


    } else {
      console.log('Utilisateur non trouvé');


    //ERRORS GESTION
      messageError.textContent = "!!! Utilisateur ou mot de passe invalide !!!";
      divError.style.display = 'flex';
      errorClose.addEventListener('click', function () {
        window.location.href = 'login.html';
      })

    }
  } else {
    console.log('Erreur lors de la récupération du contenu HTML');
    messageError.textContent = "!!! Utilisateur ou mot de passe invalide !!!";
    divError.style.display = 'flex';
    errorClose.addEventListener('click', function () {
      window.location.href = 'login.html';
    })
    //SHOW RESPONSE FROM API FOR DEBUG
    const responseText = await response.text();
    console.log('Réponse de l\'API:', responseText);
  }
}