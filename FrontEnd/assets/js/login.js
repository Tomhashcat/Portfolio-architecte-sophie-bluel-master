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
      'authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
     'email':'sophie.bluel@test.tld' ,
      'password':'$2b$10$OyUbvsLMHp/gu0kPRpkJ/.757z.DBecw/wd1CE09Y3q4nDjoC7L1e'
    })
  });

  if (response.ok) {
    const jsonResponse = await response.json();
    console.log(jsonResponse);

    const usersResponse = await fetch("http://localhost:5678/api/users");  
    if (usersResponse.ok) {
      const users = await usersResponse.json();  
      let userExists = false;
      let userId = null;

      for (let i = 0; i < users.length; i++) {
        if (users[i].email === email && users[i].password === password) {
          userExists = true;
          userId = users[i].userId;
        
          break;
        }
      }

      if (userExists) {
        console.log('Utilisateur trouvé');
        console.log('userId:', userId);
        window.location.href = 'index.html'; 
      } else {
        console.log('Utilisateur non trouvé');
      }
    } else {
      console.log('Erreur lors de la récupération des utilisateurs depuis l\'API');
    }
  } else {
    console.log('Erreur lors de la récupération du contenu HTML');
  }
}

function displayHTMLResponse(htmlResponse) {
  var loginForm = document.querySelector(".loginForm");
  loginForm.innerHTML = htmlResponse;
  console.log(htmlResponse);
}

function addNewProject(){
  var ne
}