//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////                                             //////////////////////////////////////////////////////////////////////////// 
///////////////////////////                                             //////////////////////////////////////////////////////////////////////////// 
///////////////////////////                                             //////////////////////////////////////////////////////////////////////////// 
///////////////////////////                SOMMAIRE                     //////////////////////////////////////////////////////////////////////////// 
///////////////////////////                                             //////////////////////////////////////////////////////////////////////////// 
///////////////////////////                                             //////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//  --Line 55  : FILTERBYCAT (Filters categories and creates buttons)                                                        ///////////////////////
//  --Line 100 : Check if connected (not a function)                                                                         ///////////////////////
//  --Line 132 : Declarations of Filters arrays                                                                              ///////////////////////
//  --Line 139 : DISPLAYCAT (Distributes WORKS based on their data-id (categories' id) and creates buttons)   n              ///////////////////////                                                                                                                                               
//  --Line 207 : Logout                                                                                                       //////////////////////
//  --Line 220 : INIT (Calls displayByCat based on detected categoryId)                                                        /////////////////////                                        
//  --Line 232 : Call displayCat to update the gallery                                                                         /////////////////////
//  --Line 238 : handleWorkClick (listens if workId is selected, if yes, applies the class_selected)                           /////////////////////
//  --Line 292 : handleWorkClickToDelete (calls deleteWork from services.js)                                                   /////////////////////
//  --Line 308 : ToggleModal (toggles modals)                                                                                 //////////////////////    
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let response;
let works;
let work;
let userId;
let token;
let btnModifier;
let modeEdition;
let categoryId;
let currentCategoryId;

/**
 * GET BTNS
 */
let filtersContainer = document.querySelector('.Filters');
let btnModal = document.querySelector('.modifier');
let loginButton = document.querySelector('.div-login');
let logoutButton = document.querySelector('.div-logout');



// Appele la fonction de filtrage initiale pour afficher toutes les œuvres
filterWorksByCat(0);



/**
 * 
 * GET CATEGORYS
 * @parma {function} works
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

function updateSelectedButton(button) {
  if (selectedButton !== null) {
    selectedButton.classList.remove("selected");
  }
  selectedButton = button;
  selectedButton.classList.add("selected");
}









/**
 * CHECK IF LOGIN 
 * @param{obj}
 */
userId = localStorage.getItem('userId');
token = localStorage.getItem('token');

btnModifier = document.querySelector('.modifier');

modeEdition = document.querySelector('.edition-mode')
/**
 * IF LOGIN OK EDITION MODE DISPLAY= FLEX
 * @param{obj}
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







// ARRAY FILTERS BUTTONFILTER
let filters = [];
let buttonsFiltres = [];
let selectedButton = null;
/**
 * ATTRIBUT UN BUTTON POUR CHAQUE CAT
 */
async function displayCategories() {

  try {
    response = await fetch('http://localhost:5678/api/categories');
    let categories = await response.json();

    // Ajoute le filtre "Tous" au tableau des filtres

    filters.push({ text: 'Tous', className: 'Filter Filter-All', dataid: '0' });
    let buttonTous = document.createElement('button');
    buttonTous.textContent = 'Tous';
    buttonTous.className = 'Filter Filter-All';
    buttonTous.setAttribute('data-id', '0');
    filtersContainer.appendChild(buttonTous);
    buttonsFiltres.push(buttonTous);

    //événement click pour le bouton "Tous"
    buttonTous.addEventListener('click', () => {
      filterWorksByCat(0);
      updateSelectedButton(buttonTous);
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




      button.textContent = filter.text;
      button.className = filter.className;
      button.setAttribute('data-id', filter.dataid);

      button.addEventListener('click', async () => {
        categoryId = parseInt(button.getAttribute('data-id'));

        filterWorksByCat(categoryId);
        updateSelectedButton(button);

      });
      // Ajout du bouton à l'élément conteneur
      filtersContainer.appendChild(button);
      buttonsFiltres.push(button);

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


async function init() {


  if (selectedButton !== null) {
    currentCategoryId = parseInt(selectedButton.getAttribute('data-id'));
  } else {
    currentCategoryId = 0; 
  }
  await filterWorksByCat(currentCategoryId);
}


displayCategories();

/**
 * HANDLE CLICK ON THE SELECTED WORK
 * @param {HTMLELEMENT} figureElement
 */
function handleWorkClick(figureElement) {

  const id = figureElement.dataset.workid;

  if (selectedWorkId === id) {
      selectedWorkId = null;
      figureElement.classList.remove('selected-work');
  } else {

      selectedWorkId = id;
      figureElement.classList.add('selected-work');

  }

}
/**
* HANDLE THE CLICK OF THE DELETE BUTTON IF ID
*/
function handleDeleteButtonClick() {

  if (selectedWorkId !== null ) {

    alerte("Aucun travail sélectionné pour la suppression");
return;

  } if(confirmation)
   {
       deleteWork(selectedWorkId); 
  }

}


/**
 * HANDLE CLICK ON THE SELECTED WORK
 * @param {HTMLELEMENT} figureElement
 */
function handleWorkClick(figureElement) {

  const id = figureElement.dataset.workid;

  if (selectedWorkId === id ||selectedWorkIds.includes(id) ) {
    selectedWorkIds = selectedWorkIds.filter(workId => workId !== id);
      selectedWorkId = null;
      figureElement.classList.remove('selected-work');
  } else {
    selectedWorkIds.push(id);
      selectedWorkId = id;
      figureElement.classList.add('selected-work');

  }

}
/**
* HANDLE THE CLICK OF THE DELETE BUTTON IF ID
*/
function handleDeleteButtonClick() {

  if (selectedWorkId !== null) {

      deleteWork(selectedWorkId);


  } else {
      alerte("Aucun travail sélectionné pour la suppression");
  }

}
/**
 * CHANGE THE MODAL
 * @param {obj}
 */
function toggleModal() {




  if (isFirstModalOpen) {
    
      secondModalDiv.style.display = 'none';
      firstModalDiv.style.display = 'flex';
      generateFirstModal();
  } else {
      mod.style.display = "flex";
      modal.style.display = "flex";
      firstModalDiv.style.display = 'none';
      secondModalDiv.style.display = 'flex';
      if (!secondModalDiv) {
          generateSecondModal();
      }

  }
  isFirstModalOpen = !isFirstModalOpen;
}