var response;
var works;
var filteredWorks;
var galleryContainer;
var work;
var figure;
var image;
var figcaption;
var userId;
var token;
var btnModifier;
var modeEdition;
var filters;
var buttonsFiltres;
var response;
var buttonTous;
var categories;
var categoryId;
var filter;
// Récupére les références des boutons et des éléments conteneurs


var filtersContainer = document.querySelector('.Filters');
var btnModal = document.querySelector('.modifier');
var loginButton = document.querySelector('.div-login');
var logoutButton = document.querySelector('.div-logout');



// Appele la fonction de filtrage initiale pour afficher toutes les œuvres
filterWorksByCat(0);



// Fonction de filtrage des œuvres par catégorie
async function filterWorksByCat(categoryId) {
  response = await fetch("http://localhost:5678/api/works");
  works = await response.json();
  filteredWorks = works;

  if (categoryId !== 0) {
    filteredWorks = works.filter(work => work.categoryId === categoryId);
  }

  galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = '';

  for (let index = 0; index < filteredWorks.length; index++) {
    work = filteredWorks[index];

    figure = document.createElement("figure");
    image = document.createElement("img");

    image.src = work.imageUrl;
    image.alt = work.title;
    figure.appendChild(image);

    figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(figcaption);



    galleryContainer.appendChild(figure);
  }
}


// Vérifier si  connecté 
userId = localStorage.getItem('userId');
token = localStorage.getItem('token');

btnModifier = document.querySelector('.modifier');
modeEdition = document.querySelector('.edition-mode')
// Vérifier si l'utilisateur est connecté 
if (userId && token) {

  console.log('Utilisateur connecté');
  console.log('userId:', userId);

  loginButton.style.display = "none";
  logoutButton.style.display = "block";

  modeEdition.style.display = 'flex';
  btnModifier.style.display = 'block';
} else {
  console.log('Utilisateur non connecté');



  modeEdition.style.display = 'none';
  btnModifier.style.display = 'none';
}


;

// Tableau des filtres
filters = [];
buttonsFiltres = [];


async function displayCategories() {

  try {
    response = await fetch('http://localhost:5678/api/categories');
    categories = await response.json();

    // Ajoute le filtre "Tous" au tableau des filtres

    filters.push({ text: 'Tous', className: 'Filter Filter-All', dataid: '0' });
    buttonTous = document.createElement('button');
    buttonTous.textContent = 'Tous';
    buttonTous.className = 'Filter Filter-All';
    buttonTous.setAttribute('data-id', '0');
    filtersContainer.appendChild(buttonTous);
    buttonsFiltres.push(buttonTous);

    // Ajouter l'événement click pour le bouton "Tous"
    buttonTous.addEventListener('click', () => {
      filterWorksByCat(0);
    });
    // Ajoute les catégories au tableau des filtres
    categories.forEach((category, index) => {

      filter = {
        text: category.name,
        className: `Filter`,
        dataid: category.id
      };
      filters.push(filter);


      // Génération des boutons
      const button = document.createElement('button');
      button.textContent = filter.text;
      button.className = filter.className;
      button.setAttribute('data-id', filter.dataid);

      // Ajout du bouton à l'élément conteneur
      filtersContainer.appendChild(button);
      buttonsFiltres.push(button);


      button.addEventListener('click', () => {
        categoryId = parseInt(button.getAttribute('data-id'));
        filterWorksByCat(categoryId);
      });
      button.textContent = filter.text;
      button.className = filter.className;
      button.setAttribute('data-id', filter.dataid);

      // Ajout du bouton à l'élément conteneur
      filtersContainer.appendChild(button);
      buttonsFiltres.push(button);

      button.addEventListener('click', () => {
        categoryId = parseInt(button.getAttribute('data-id'));
        filterWorksByCat(categoryId);

      });
    });
  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des catégories :", error);
  }
}

function handlLogout() {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  loginButton.style.display = "block";
  logoutButton.style.display = "none";

}
logoutButton.addEventListener('click', handlLogout);


displayCategories();






























