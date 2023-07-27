
let isFirstModalOpen = false;
var mod = document.getElementById('mod');
var modal = document.querySelector('.modal');
var modalContent = document.querySelector('modal-content');

function toggleModal() {

    if (isFirstModalOpen) {
        mod.style.display="flex";
        modal.style.display = 'flex';

        generateFirstModal();
    } else {
        mod.style.display="flex";
        modalContent.innerHTML = "";

        generateSecondModal();
        modal.style.display = 'flex';
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






    const modalTitre = document.createElement('h3');
    modalTitre.className = 'modal_Tiltle';
    modalTitre.textContent = 'Ajout photo';
    modal.appendChild(modalTitre);

    const btnsContainer = document.createElement('div');
    btnsContainer.className = "btns-Modif";
    modal.appendChild(btnsContainer);

    const modGalleryContainer = document.createElement('div');
    modGalleryContainer.className = "mod-gallery";
    modal.appendChild(modGalleryContainer);

    var btnOpenSecondModal = document.createElement('input');
    btnOpenSecondModal.type = 'submit';
    btnOpenSecondModal.className = 'btn-add-photo';
    btnOpenSecondModal.textContent = 'Ajouter une photo';








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
                figure.setAttribute('data-workid', work.id);

                // Ajouter l'événement de clic pour la suppression des œuvres
                figure.addEventListener('click', () => handleWorkClick(figure));

                modGalleryContainer.appendChild(figure);
            });
        })
        .catch(error => {
            console.log('Une erreur s\'est produite lors de la récupération des works :', error);
        });

    const figureElement = modGalleryContainer.querySelectorAll('.figure');
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








    btnsContainer.appendChild(btnOpenSecondModal);

    btnOpenSecondModal.addEventListener('click', () => {
        // Ouvrir la nouvelle page modal générée par la fonction
        toggleModal();
    });
    if (!btnOpenSecondModal) {
        btnsContainer.appendChild(btnOpenSecondModal);
    }
    btnOpenSecondModal.addEventListener('click', () => {
        generateSecondModal();
    });





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

const btnOpenFirstModal = document.querySelector('.a-modifier');
btnOpenFirstModal.addEventListener('click', () => {

    generateFirstModal();
});
















function generateSecondModal() {

    modal.innerHTML = "";







    const secondeModalTitre = document.createElement('h3');
    secondeModalTitre.className = 'modal_Tiltle';
    secondeModalTitre.textContent = "Ajouter une photo";
    modal.appendChild(secondeModalTitre);

    var secondeModalContent = document.createElement('div');
    secondeModalContent.className = 'seconde-modale';
    modal.appendChild(secondeModalContent);

    // Créez les éléments pour la nouvelle modal et les éléments nécessaires
    const uploadPhotoContainer = document.createElement('div');
    uploadPhotoContainer.className = "upload-photo-container";
    secondeModalContent.appendChild(uploadPhotoContainer);

    const inputChoiceContent = document.createElement('div');
    inputChoiceContent.className = 'inputs-seconde-modal-choices';
    uploadPhotoContainer.appendChild(inputChoiceContent);

    const inputPhoto = document.createElement('input');
    inputPhoto.className = 'input-File-Seconde-Modal';
    inputPhoto.type = 'file';
    inputPhoto.accept = 'image/*';

    const labelInputPhoto = document.createElement('label');
    labelInputPhoto.textContent = '+ Ajouter une photo';

    const btnValider = document.createElement('div');
    btnValider.className = "btn-valider";
    secondeModalContent.appendChild(btnValider);


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
    const btnModal = document.createElement('input');
    btnModal.type = 'submit';
    btnModal.className = 'btn-add-photo';
    btnModal.textContent = 'Ajouter une photo';
    const BtnAddPhoto = document.querySelector('.btn-add-photo');

    // Ajoute les éléments créés à la modal

    inputPhoto.appendChild(labelInputPhoto);
    uploadPhotoContainer.appendChild(inputPhoto);

    inputChoiceContent.appendChild(labelTitre);
    inputChoiceContent.appendChild(inputTitle);
    inputChoiceContent.appendChild(labelCategories);
    inputChoiceContent.appendChild(selectCategories);


    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.appendChild(uploadPhotoContainer);


    const divEnvoyer = document.createElement('div');
    divEnvoyer.className = 'inputChoiceContent';
    const boutonEnvoyer = document.createElement('button');
    boutonEnvoyer.className = 'btn-add-work';
    boutonEnvoyer.textContent = 'Valider';
    boutonEnvoyer.disabled = true;
    divEnvoyer.appendChild(boutonEnvoyer);
    if (!BtnAddPhoto) {
        var btnsContainer = document.createElement('div');
        btnsContainer.className = 'btns-container';
        btnsContainer.appendChild(btnModal);
    }
    btnModal.addEventListener('click', () => {
        toggleModal();
    });
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
            console.log("Nouveau travail ajouté !");

        }
    });
    btnModal.addEventListener('click', () => generateSecondModal());

    const modalCloseLink = document.querySelector('.modal_close');

    if (modalCloseLink) {
        console.log("Element '.modal_close' trouvé !");
        modalCloseLink.addEventListener('click', () => {
            const secondeModal = document.getElementById('seconde-modale');
            secondeModal.style.display = 'none';
        });
    }
    secondeModalContent.innerHTML = "";

}


btnModifier.addEventListener('click', () => toggleModal());



function deleteWork(workId) {
    fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',

        headers: {
            "accept": "*/*",
            "Authorization": "Bearer " + token
        }
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
















