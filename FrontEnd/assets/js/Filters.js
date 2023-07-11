
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


  console.log(works);
  //PARCOUR LE TABLEAU POUR RENVOYER TOUS LES ELEMENTS
  for (let index = 0; index < works.length; index++) {

    console.log(works[index].title);

  }

}




var Objets = document.querySelector(".Filter-Objets");
Objets.addEventListener('click',()=>filterWorksByCatObjets(1));

async function filterWorksByCatObjets(categoryId) {
  const response = await fetch("http://localhost:5678/api/works");
  const works = await response.json();
  const result = works.filter(work => work.categoryId === categoryId);


  console.log(result);



}

