// Récupére les références des boutons et des éléments conteneurs

var Tous = document.querySelector(".Filter-All");
var Objets = document.querySelector(".Filter-Objets");
var Appartements = document.querySelector(".Filter-Appartements");
var Hotels = document.querySelector(".Filter-Hotels");
var filtersContainer = document.querySelector('.Filters');
var btnModal = document.querySelector('.modifier');

// Appele la fonction de filtrage initiale pour afficher toutes les œuvres



document.addEventListener('DOMContentLoaded', () => {
  filterWorksByCat(0);
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
const filters = [];

async function displayCategories() {

  try {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();

    // Ajoute le filtre "Tous" au tableau des filtres
    filters.push({ text: 'Tous', className: 'Filter Filter-All', dataid: '0' });

    // Ajoute les catégories au tableau des filtres
    categories.forEach((category, index) => {
      const filter = {
        text: category.name,
        className: `Filter Filter-Category-${index}`,
        dataid: category.id
      };
      filters.push(filter);
    });

    // Génération des boutons
    filters.forEach(filter => {
      // Création de l'élément bouton
      const button = document.createElement('button');
      button.textContent = filter.text;
      button.className = filter.className;
      button.setAttribute('data-id', filter.dataid);

      // Ajout du bouton à l'élément conteneur
      filtersContainer.appendChild(button);

      // Ajoute l'écouteur d'événement au bouton
      button.addEventListener('click', () => filterWorksByCat(parseInt(filter.dataid)));
    });

  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des catégories :", error);
  }
}
// Appele la fonction pour afficher les catégories (et les filtres) sur la page d'accueil
displayCategories();

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
document.addEventListener('DOMContentLoaded', () => {
Tous.addEventListener('click', () => filterWorksByCat(0));
Objets.addEventListener('click', () => filterWorksByCat(1));
Appartements.addEventListener('click', () => filterWorksByCat(2));
Hotels.addEventListener('click', () => filterWorksByCat(3));})








function showModal() {
 
  // Appele la fonction de filtrage initiale pour afficher toutes les œuvres
  const btnsContainer = document.querySelector('.btns-Modif');
  const modGalleryContainer = document.querySelector('.mod-gallery');

  if (!btnsContainer.querySelector('.btn-add-photo')) {
    // Supprimez la redéclaration de inputSubmit ici
    inputSubmit = document.createElement('input');
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

  // Ajoute l'écouteur d'événement au bouton .modifier





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


document.addEventListener('DOMContentLoaded', () => {
Tous.addEventListener('click', () => filterWorksByCat(0));
Objets.addEventListener('click', () => filterWorksByCat(1));
Appartements.addEventListener('click', () => filterWorksByCat(2));
Hotels.addEventListener('click', () => filterWorksByCat(3));

btnModal.addEventListener('click', () => showModal());})
