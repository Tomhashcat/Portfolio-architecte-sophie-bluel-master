

var loginForm = document.querySelector(".loginForm");
loginForm.addEventListener('submit', handleLogin);

async function handleLogin(event) {
  event.preventDefault();

  var emailInput = document.querySelector('.email');
  var passwordInput = document.querySelector('.password');
  var messageError = document.querySelector('.error-message');
  var divError = document.querySelector('.error');
  var errorClose = document.querySelector('.error-close');
  var divLogin = document.querySelector('.div-login');
  var email = emailInput.value;
  var password = passwordInput.value;

  const response = await fetch("http://localhost:5678/api/users/login", {
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

  if (response.ok) {
    const jsonResponse = await response.json();
    console.log(jsonResponse);

    const userId = jsonResponse.userId;
    const token = jsonResponse.token;
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
