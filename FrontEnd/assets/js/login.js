var loginForm = document.querySelector(".loginForm");
loginForm.addEventListener('submit', handleLogin);

async function handleLogin(event) {
  event.preventDefault();

  var emailInput = document.querySelector('.email');
  var passwordInput = document.querySelector('.password');

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
      window.location.href = 'index.html';
    } else {
      console.log('Utilisateur non trouvé');
    }
  } else {
    console.log('Erreur lors de la récupération du contenu HTML');
    // Affiche la réponse complète de l'API pour déboguer
    const responseText = await response.text();
    console.log('Réponse de l\'API:', responseText);
  }
}
  

function displayHTMLResponse(htmlResponse) {
  var loginForm = document.querySelector(".loginForm");
  loginForm.innerHTML = htmlResponse;
  console.log(htmlResponse);
}

