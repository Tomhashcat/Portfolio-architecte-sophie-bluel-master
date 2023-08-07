
let response;
let works;
let work;
let userId;
let token;
let btnModifier;
let modeEdition;
let categoryId;


/**
 * RECUPERE LES BTNS
 */
let filtersContainer = document.querySelector('.Filters');
let btnModal = document.querySelector('.modifier');
let loginButton = document.querySelector('.div-login');
let logoutButton = document.querySelector('.div-logout');



// Appele la fonction de filtrage initiale pour afficher toutes les œuvres
filterWorksByCat(0);



/**
 * 
 * RECUPERE LES CATEGORIES DANS LA BDD 
 */
async function filterWorksByCat(categoryId) {
  response = await fetch("http://localhost:5678/api/works");
  works = await response.json();
  let filteredWorks = works;

  if (categoryId !== 0) {
    filteredWorks = works.filter(work => work.categoryId === categoryId);
  }

  let galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = '';

  for (let index = 0; index < filteredWorks.length; index++) {
    work = filteredWorks[index];

    let figure = document.createElement("figure");
    let image = document.createElement("img");

    image.src = work.imageUrl;
    image.alt = work.title;
    figure.appendChild(image);

    let figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(figcaption);
    galleryContainer.appendChild(figure);
  }
}





// Vérifie si  connecté 
userId = localStorage.getItem('userId');
token = localStorage.getItem('token');

btnModifier = document.querySelector('.modifier');
modeEdition = document.querySelector('.edition-mode')
/**
 * SI CONNECT2 GENERE DE NEWS HTML
 *  */
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
};







// ARRAY FILTERS
let filters = [];
let buttonsFiltres = [];

/**
 * ADD ATTRIBUE FOREACH CATEGORY
 */
async function displayCategories() {

  try {
    response = await fetch('http://localhost:5678/api/categories');
    let categories = await response.json();

    // ADD FILTERS"TOUS" TO THE FILTER ARRAY

    filters.push({ text: 'Tous', className: 'Filter Filter-All', dataid: '0' });
    let buttonTous = document.createElement('button');
    buttonTous.textContent = 'Tous';
    buttonTous.className = 'Filter Filter-All';
    buttonTous.setAttribute('data-id', '0');
    filtersContainer.appendChild(buttonTous);
    buttonsFiltres.push(buttonTous);

    //CLICK EVENT FOR BUTTON "Tous"
    buttonTous.addEventListener('click', () => {
      filterWorksByCat(0);
    });
    // Ajoute les catégories au tableau des filtres
    categories.forEach((category) => {

      let filter = {
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
/**
 * LOGOUT
 */
function handlLogout() {
  localStorage.removeItem('userId');
  localStorage.removeItem('token');
  loginButton.style.display = "block";
  logoutButton.style.display = "none";

}
logoutButton.addEventListener('click', handlLogout);


displayCategories();