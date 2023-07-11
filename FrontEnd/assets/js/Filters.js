
var Tous = document.querySelector(".Filter-All");
Tous.addEventListener('click', displayWorks);
/**
 * DISPLAYWORKS : Au click renvoi tous les works
 * @param {func} 
 */
async function displayWorks() {
  //FETCH API WORKS
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  const galleryContainer = document.querySelector(".gallery");


  console.log(works);
  //PARCOUR LE TABLEAU POUR RENVOYER TOUS LES ELEMENTS
  for (let index = 0; index < works.length; index++) {
    const work = works[index];

    const figure = document.createElement("figure");
    const image = document.createElement("img");

    image.src = work.imageUrl;
    image.alt = work.title;
    figure.appendChild(image);


    const figcaption = document.createElement("figcaption");
    figcaption.textContent = work.title;
    figure.appendChild(figcaption);

    galleryContainer.appendChild(figure);
    console.log(works[index]);
  }
  galleryContainer.appendChild(figure);
}










var Objets = document.querySelector(".Filter-Objets");
Objets.addEventListener('click', () => filterWorksByCatObjets(1));

async function filterWorksByCatObjets(categoryId) {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  const result = works.filter(work => work.categoryId === categoryId);


  console.log(result);
  const galleryContainer = document.querySelector(".gallery");
  for (let index = 0; index < result.length; index++) {
    const work = result[index];

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





var Appartements = document.querySelector(".Filter-Appartements");
Appartements.addEventListener('click', () => filterWorksByCatAppartements(2));

async function filterWorksByCatAppartements(categoryId) {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  const result = works.filter(work => work.categoryId === categoryId);


  console.log(result);
  const galleryContainer = document.querySelector(".gallery");
  for (let index = 0; index < result.length; index++) {
    const work = result[index];

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


var HotelsRestaurants = document.querySelector(".Filter-Hotels");
HotelsRestaurants.addEventListener('click', () => filterWorksByCatHotelsRestaurants(3));

async function filterWorksByCatHotelsRestaurants(categoryId) {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  const result = works.filter(work => work.categoryId === categoryId);


  console.log(result);
  const galleryContainer = document.querySelector(".gallery");
  for (let index = 0; index < result.length; index++) {
    const work = result[index];

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
