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
  
  
    btnModal.addEventListener('click', () => showModal());
  })
  