// Récupére les références des boutons et des éléments conteneurs
var Tous = document.querySelector(".Filter-All");
var Objets = document.querySelector(".Filter-Objets");
var Appartements = document.querySelector(".Filter-Appartements");
var Hotels = document.querySelector(".Filter-Hotels");
var filtersContainer = document.querySelector('.Filters');
var btnModal = document.querySelector('.modifier');

document.addEventListener('DOMContentLoaded', () => {
  // Vérifier si  connecté 
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  const btnModifier = document.querySelector('.modifier');

  // Vérifier si l'utilisateur est connecté 
  if (userId && token) {
    console.log('Utilisateur connecté');
    console.log('userId:', userId);
    
    btnModifier.style.display = 'block';
  } else {
    console.log('Utilisateur non connecté');
    
    btnModifier.style.display = 'none';
  }
});

// Tableau des filtres
const filters = [
  { text: 'Tous', className: 'Filter Filter-All', dataid: '0' },
  { text: 'Objets', className: 'Filter Filter-Objets', dataid: '1' },
  { text: 'Appartements', className: 'Filter Filter-Appartements', dataid: '2' },
  { text: 'Hôtels & restaurants', className: 'Filter Filter-Hotels', dataid: '3' }
];

// Génération des boutons
filters.forEach(filter => {
  // Création de l'élément bouton
  const button = document.createElement('button');
  button.textContent = filter.text;
  button.className = filter.className;
  button.setAttribute('data-id', filter.dataid);

  // Ajout du bouton à l'élément conteneur
  filtersContainer.appendChild(button);

  // Récupération ref des boutons
  if (filter.className.includes('Filter-All')) {
    Tous = button;
  } else if (filter.className.includes('Filter-Objets')) {
    Objets = button;
  } else if (filter.className.includes('Filter-Appartements')) {
    Appartements = button;
  } else if (filter.className.includes('Filter-Hotels')) {
    Hotels = button;
  }
});

async function displayCategories() {

  const response = await fetch('http://localhost:5678/api/categories');
  const categories = await response.json();

  const categoriesContainer = document.querySelector('.categories')
  categories.forEach(category => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.addEventListener('click', filterWorksByCat(category.id));
    button.setAttribute("data-id", category.id);
    categoriesContainer.appendChild(button);
  })

}

// Fonction de filtrage des œuvres par catégorie
async function filterWorksByCat(categoryId) {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  let filteredWorks = works;

  if (categoryId !== 0) {
    filteredWorks = works.filter(work => work.categoryId === categoryId);
  }

  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = '';

  for (let index = 0; index < filteredWorks.length; index++) {
    const work = filteredWorks[index];

    const figure = document.createElement("figure");
    const image = document.createElement("img");

    image.src = work.imageUrl;
    image.alt = work.title;
    figure.appendChild(image);

    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(figcaption);

    console.log(works[index]);

    galleryContainer.appendChild(figure);
  }
}

// écouteurs d'événements aux boutons
Tous.addEventListener('click', () => filterWorksByCat(0));
Objets.addEventListener('click', () => filterWorksByCat(1));
Appartements.addEventListener('click', () => filterWorksByCat(2));
Hotels.addEventListener('click', () => filterWorksByCat(3));




// Appele la fonction de filtrage initiale pour afficher toutes les œuvres
filterWorksByCat(0);


let inputSubmit = null;
function showModal() {

  const btnsContainer = document.querySelector('.btns-Modif');
  const modGalleryContainer = document.querySelector('.mod-gallery');

  if (!btnsContainer.querySelector('.btn-add-photo')) {


    const inputSubmit = document.createElement('input');
    inputSubmit.type = 'submit';
    inputSubmit.className = 'btn-add-photo';
    inputSubmit.value = 'Envoyer une photo';


    btnsContainer.appendChild(inputSubmit);

  }
  if (!btnsContainer.querySelector('.btn-delete-work')) {

    const deleteLInk = document.createElement('a');
    deleteLInk.href = '#';
    deleteLInk.textContent = 'supprimer la galerie';
    deleteLInk.className = 'btn-delete-work';

    btnsContainer.appendChild(deleteLInk)
  }






  // Récupére tous les works
  fetch('http://localhost:5678/api/works')
    .then(response => response.json())
    .then(works => {
      
      modGalleryContainer.innerHTML = '';

      // Affiche chaque work dans modGalleryContainer
      works.forEach(work => {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        image.src = work.imageUrl;
        image.alt = work.title;
        figure.appendChild(image);

        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;
        figure.appendChild(figcaption);

        modGalleryContainer.appendChild(figure);
      });
    })
    .catch(error => {
      console.log('Une erreur s\'est produite lors de la récupération des works :', error);
    });
}

// Ajoute l'écouteur d'événement au bouton .modifier
btnModal.addEventListener('click', showModal);



