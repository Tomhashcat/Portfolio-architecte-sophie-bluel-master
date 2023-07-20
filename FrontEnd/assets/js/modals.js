

function showModal() {

    // Appele la fonction de filtrage initiale pour afficher toutes les œuvres
    const btnsContainer = document.querySelector('.btns-Modif');
    const modGalleryContainer = document.querySelector('.mod-gallery');

    if (!btnsContainer.querySelector('.btn-add-photo')) {

        const inputSubmit = document.createElement('input');
        inputSubmit.type = 'submit';
        inputSubmit.className = 'btn-add-photo';
        inputSubmit.value = 'Envoyer une photo';

        btnsContainer.appendChild(inputSubmit);
      
        btnModal.addEventListener('click', () => {
            // Ouvrir la nouvelle page modal générée par la fonction
            OpenAddWorkModal();
        });



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


document.addEventListener('DOMContentLoaded', () => {


    btnModal.addEventListener('click', () => showModal());
})

function OpenAddWorkModal() {
    // Créez les éléments pour la nouvelle modal et les éléments nécessaires
    const uploadPhotoContainer = document.createElement('div');
    uploadPhotoContainer.className = "upload-photo-container";

    const inputPhoto = document.createElement('input');
    inputPhoto.className = 'inputFile';
    inputPhoto.type = 'file';
    inputPhoto.accept = 'image/*';

    const labelNewWork = document.createElement('label');
    labelNewWork.className = 'btn-add-photo';
    labelNewWork.textContent = 'Faites glisser une nouvelle photo';

    const boutonEnvoyer = document.createElement('button');
    boutonEnvoyer.className = 'btn-add-work';
    boutonEnvoyer.textContent = 'Ajouter le nouveau travail';
    boutonEnvoyer.disabled = true; // Désactiver le bouton par défaut

    // Ajoutez les éléments créés à la modal
    uploadPhotoContainer.appendChild(inputPhoto);
    uploadPhotoContainer.appendChild(labelNewWork);
    uploadPhotoContainer.appendChild(boutonEnvoyer);
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.appendChild(uploadPhotoContainer);

    // Ajoutez l'écouteur d'événement pour le champ de téléchargement de fichier
    inputPhoto.addEventListener('change', () => {
        const file = inputPhoto.files[0]; // Récupérer le fichier sélectionné
        if (file) {
            // Activer le bouton d'ajout de travail s'il y a un fichier sélectionné
            boutonEnvoyer.disabled = false;
        } else {
            // Désactiver le bouton si aucun fichier n'est sélectionné
            boutonEnvoyer.disabled = true;
        }
    });

    // Ajoutez l'écouteur d'événement pour le bouton "Ajouter le nouveau travail"
    boutonEnvoyer.addEventListener('click', () => {
        const file = inputPhoto.files[0]; // Récupérer le fichier sélectionné
        if (file) {
            // Vous pouvez maintenant utiliser les informations du fichier (par exemple, envoyer l'image vers un serveur, etc.).
            // Puis, vous pouvez ajouter le nouveau travail en utilisant ces informations.
            console.log("Nouveau travail ajouté !");
            // ... (votre code pour ajouter le nouveau travail)
        }
    });
}













