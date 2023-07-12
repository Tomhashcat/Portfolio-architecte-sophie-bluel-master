


var Tous = document.querySelector(".Filter-All");
var Objets = document.querySelector(".Filter-Objets ");
var Appartements = document.querySelector(" .Filter-Appartements ");
var Hotels = document.querySelector(" .Filter-Hotels ");

Tous.addEventListener('click', () => filterWorksByCat(null));
Objets.addEventListener('click', () => filterWorksByCat(1));
Appartements.addEventListener('click', () => filterWorksByCat(2));
Hotels.addEventListener('click', () => filterWorksByCat(3));


async function filterWorksByCat(categoryId) {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  let filteredWorks = works;
/**
 * je selection tout ce qui a un categoyId
 * @param {obj} categoryId
 */
  if (categoryId !== null) {
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













