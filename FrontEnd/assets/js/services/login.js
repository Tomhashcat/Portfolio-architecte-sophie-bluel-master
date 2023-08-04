/**
 * DECLARATION DES VARIABLES
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
var token;
/**
 * RECUPERE LE FORMULAIRE
 */
var loginForm = document.querySelector(".loginForm");
loginForm.addEventListener('submit', handleLogin);

/**
 * RECUPERE LES ELEMENTS DU FORM ET ENVOIE EN BDD
 * @param {obj} event 
 */
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
 * SI PAS D ERREUR RENVOI UN TOKEN ET UN ID PUIS REDIRIGE VERS INDEX.html
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
      localStorage.setItem('token', token);
      window.location.href = 'index.html';


    } else {
      console.log('Utilisateur non trouvé');


      /**
       * GESTION DES ERREURS
       */
      messageError.textContent = "Erreur 404 ! Utilisateur ou mot de passe invalide";
      divError.style.display = 'flex';
      errorClose.addEventListener('click', function () {
        window.location.href = 'login.html';
      })

    }
  } else {
    console.log('Erreur lors de la récupération du contenu HTML');
    messageError.textContent = "Erreur 404 ! Utilisateur ou mot de passe invalide";
    divError.style.display = 'flex';
    errorClose.addEventListener('click', function () {
      window.location.href = 'login.html';
    })
    // Affiche la réponse complète de l'API pour déboguer
    const responseText = await response.text();
    console.log('Réponse de l\'API:', responseText);
  }
}
