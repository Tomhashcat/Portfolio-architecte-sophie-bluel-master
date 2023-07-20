// Récupére les références des boutons et des éléments conteneurs


var filtersContainer = document.querySelector('.Filters');
var btnModal = document.querySelector('.modifier');




let Objets;
let Appartements;
let Hotels;
let Tous;
// Appele la fonction de filtrage initiale pour afficher toutes les œuvres
filterWorksByCat(0);



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



    galleryContainer.appendChild(figure);
  }
}
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

  if (Tous) {
    Tous.addEventListener('click', () => filterWorksByCat(0));
  }
  if (Objets) {
    Objets.addEventListener('click', () => filterWorksByCat(1));
  }
  if (Appartements) {
    Appartements.addEventListener('click', () => filterWorksByCat(2));
  }
  if (Hotels) {
    Hotels.addEventListener('click', () => filterWorksByCat(3));
  }
});

// Tableau des filtres
const filters = [];
const buttonsFiltres = [];


async function displayCategories() {

  try {
    const response = await fetch('http://localhost:5678/api/categories');
    const categories = await response.json();

    // Ajoute le filtre "Tous" au tableau des filtres

    filters.push({ text: 'Tous', className: 'Filter Filter-All', dataid: '0' });
    const buttonTous = document.createElement('button');
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

      const filter = {
        text: category.name,
        className: `Filter Filter-Category-${index}`,
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
        const categoryId = parseInt(button.getAttribute('data-id'));
        filterWorksByCat(categoryId);
      });


     
      button.textContent = filter.text;
      button.className = filter.className;
      button.setAttribute('data-id', filter.dataid);

      // Ajout du bouton à l'élément conteneur
      filtersContainer.appendChild(button);
      buttonsFiltres.push(button);

      button.addEventListener('click', () => {
        const categoryId = parseInt(button.getAttribute('data-id'));
        filterWorksByCat(categoryId);

      });

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
   

  } catch (error) {
    console.error("Une erreur s'est produite lors de la récupération des catégories :", error);
  }
}
displayCategories();




















