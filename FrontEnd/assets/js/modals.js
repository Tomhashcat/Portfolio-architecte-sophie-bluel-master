
let isFirstModalOpen = false;

function toggleModal() {
    var modal = document.getElementById('mod');
    var secondeModal = document.getElementById('seconde-modale');
    if (modal.style.display === 'none') {
        modal.style.display = 'flex';
        secondeModal.style.display = 'none'

    } else {
        modal.style.display = 'none';
        secondeModal.style.display = 'flex';
    }
    isFirstModalOpen = !isFirstModalOpen;
}

function handleWorkClick(figureElement) {
    const workIdToDelete = figureElement.dataset.workId;
    fetch(`http://localhost:5678/api/works/${workIdToDelete}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log('oeuvre supprimée avec succes', data);
            generateFirstModal();
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la suppression de l\'œuvre:', error);
        });
}


function generateFirstModal() {

    const btnsContainer = document.querySelector('.btns-Modif');
    const modGalleryContainer = document.querySelector('.mod-gallery');


    const btnModal = document.createElement('input');

    modGalleryContainer.innerHTML = "";

    btnModal.type = 'submit';
    btnModal.className = 'btn-add-photo';
    btnModal.textContent = 'Ajouter une photo';
    const existingBtnAddPhoto = btnsContainer.querySelector('.btn-add-photo');
    if (!existingBtnAddPhoto) {
        btnsContainer.appendChild(btnModal);
    }
    btnModal.addEventListener('click', () => {
        toggleModal();
    });



    const deleteWorkBtn = document.createElement('a');
    deleteWorkBtn.className = ('btn-delete-work');



    // Récupére tous les works
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(works => {


            works.forEach(work => {
                const figure = document.createElement('figure');
                const image = document.createElement('img');
                image.src = work.imageUrl;
                image.alt = work.title;
                figure.appendChild(image);

                const figcaption = document.createElement('figcaption');
                figcaption.textContent = work.title;
                figure.appendChild(figcaption);
                figure.setAttribute('data-workid', work._id);

                // Ajouter l'événement de clic pour la suppression des œuvres
                figure.addEventListener('click', () => handleWorkClick(figure));

                modGalleryContainer.appendChild(figure);
            });
        })
        .catch(error => {
            console.log('Une erreur s\'est produite lors de la récupération des works :', error);
        });

    const figureElement = modGalleryContainer.querySelectorAll('figure');
    let currentWorkId = 1;
    figureElement.forEach(figure => {
        if (!figure.dataset.workid) {
            const workId = String(currentWorkId);
            figure.setAttribute('data-workid', workId);
            currentWorkId++;
        }
        if (!figure.hasAttribute('data-click-event-added')) {
            figure.addEventListener('click', () => handleWorkClick(figure));
            figure.setAttribute('data-click-event-added', true);
        }
    });


    deleteWorkBtn.addEventListener('click', () => {
        const workIdToDelete = deleteWorkBtn.dataset.workid;
        deleteWork(workIdToDelete);
    });




    if (!btnsContainer.querySelector('.btn-add-photo')) {

        const inputSubmit = document.createElement('input');
        inputSubmit.type = 'submit';
        inputSubmit.className = 'btn-add-photo';
        inputSubmit.value = 'Envoyer une photo';

        btnsContainer.appendChild(inputSubmit);

        inputSubmit.addEventListener('click', () => {
            // Ouvrir la nouvelle page modal générée par la fonction
            generateSecondModal();
        });



    }

    if (!btnsContainer.querySelector('.btn-delete-work')) {
        const deleteLInk = document.createElement('a');
        deleteLInk.href = '#';
        deleteLInk.textContent = 'supprimer la galerie';
        deleteLInk.className = 'btn-delete-work';
        btnsContainer.appendChild(deleteLInk);
        deleteLInk.addEventListener('click', () => {

        })
    }
}


document.addEventListener('DOMContentLoaded', () => {
    generateSecondModal();
    const btnModal = document.querySelector('.btn-modal');
    const btnAddPhoto = document.querySelector('.btn-add-photo');
    btnModal.addEventListener('click', () => generateFirstModal());
    btnAddPhoto.addEventListener('click', () => toggleModal());
});









function generateSecondModal() {

    const secondeModalContent = document.querySelector('.seconde-modale-content');
    // Créez les éléments pour la nouvelle modal et les éléments nécessaires
    const uploadPhotoContainer = document.createElement('div');
    uploadPhotoContainer.className = "upload-photo-container";

    const inputPhoto = document.createElement('button');
    inputPhoto.className = 'input-File-Seconde-Modal';
    inputPhoto.type = 'file';
    inputPhoto.accept = 'image/*';

    const labelInputPhoto = document.createElement('label');
    labelInputPhoto.textContent = '+ Ajouter une photo';


    const inputsChoices = document.querySelector('.inputs-seconde-modal-choices');

    const inputTitle = document.createElement('input');
    inputTitle.className = 'input-new-title';

    const labelTitre = document.createElement('label');
    labelTitre.textContent = 'Titre';
    labelTitre.className = 'titre-input-titre';

    const labelCategorie = document.createElement('label');
    labelCategorie.textContent = 'Catégorie';

    const selectCategories = document.createElement('select');
    selectCategories.className = 'input-categories-new-work';

    const labelCategories = document.createElement('label');
    labelCategories.textContent = 'Catégorie';
    labelCategories.className = 'Titre-select-categories'

    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                selectCategories.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Une erreur s\'est produite ', error);
        });






    const divEnvoyer = document.querySelector('.btn-valider');
    const boutonEnvoyer = document.createElement('button');
    boutonEnvoyer.className = 'btn-add-work';
    boutonEnvoyer.textContent = 'Valider';
    boutonEnvoyer.disabled = true; // Désactive le bouton par défaut


    // Ajoute les éléments créés à la modal

    inputPhoto.appendChild(labelInputPhoto);
    uploadPhotoContainer.appendChild(inputPhoto);

    inputsChoices.appendChild(labelTitre);
    inputsChoices.appendChild(inputTitle);
    inputsChoices.appendChild(labelCategories);
    inputsChoices.appendChild(selectCategories);

    divEnvoyer.appendChild(boutonEnvoyer);
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.appendChild(uploadPhotoContainer);
    secondeModalContent.appendChild(uploadPhotoContainer);

    // Ajoute l'écouteur d'événement pour le champ de téléchargement de fichier
    inputPhoto.addEventListener('change', () => {
        const file = inputPhoto.files[0]; // Récupérer le fichier sélectionné
        if (file) {
            // Active le bouton d'ajout de travail s'il y a un fichier sélectionné
            boutonEnvoyer.disabled = false;
        } else {
            // Désactive le bouton si aucun fichier n'est sélectionné
            boutonEnvoyer.disabled = true;
        }
    });

    // Ajoute l'écouteur d'événement pour le bouton "Ajouter le nouveau travail"
    boutonEnvoyer.addEventListener('click', () => {
        const file = inputPhoto.files[0]; // Récupérer le fichier sélectionné
        if (file) {
            // Vous pouvez maintenant utiliser les informations du fichier (par exemple, envoyer l'image vers un serveur, etc.).
            // Puis, vous pouvez ajouter le nouveau travail en utilisant ces informations.
            console.log("Nouveau travail ajouté !");
            // ... (votre code pour ajouter le nouveau travail)
        }
    });
    btnModal.addEventListener('click', () => generateSecondModal);

    const modalCloseLink = document.querySelector('.modal_close');

    if (modalCloseLink) {
        console.log("Element '.modal_close' trouvé !");
        modalCloseLink.addEventListener('click', () => {
            const secondeModal = document.getElementById('seconde-modale');
            secondeModal.style.display = 'none';
        });
    }
}


function deleteWork(workId) {
    fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
    })
        .then(response => response.json())
        .then(data => {
            console.log('Œuvre supprimée avec succès:', data);
            generateFirstModal();
        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la suppression de l\'œuvre:', error);
        });

}
















