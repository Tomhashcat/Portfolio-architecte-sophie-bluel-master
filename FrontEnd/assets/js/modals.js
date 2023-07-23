
let isFirstModalOpen = false;

function toggleModal() {
    var modal = document.getElementById('mod');
    var secondeModal = document.getElementById('seconde-modale');
    if (modal.style.display === 'none') {
        modal.style.display = 'flex';

        if (isFirstModalOpen) {
            
            generateSecondModal();
        }
    } else {
        modal.style.display = 'none';
        secondeModal.style.display='flex';
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

    figureElement.forEach(figure => {
        if (!figure.dataset.workid) {
            const workId = '1';
            figure.setAttribute('data-workid', workId);
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
    btnModal.addEventListener('click', () => generateSecondModal);
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
















