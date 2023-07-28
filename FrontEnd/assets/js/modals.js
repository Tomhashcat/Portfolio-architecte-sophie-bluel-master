
let isFirstModalOpen = false;
var mod = document.getElementById('mod');
var modal = document.querySelector('.modal');

var firstModalDiv;
var secondModalDiv;

let selectedWorkIds = [];
function toggleModal() {

    if (isFirstModalOpen) {



        secondModalDiv.style.display = 'none';
        firstModalDiv.style.display = 'flex';
    } else {
        mod.style.display = "flex";
        modal.style.display = "flex";
        firstModalDiv.style.display = 'none';
        secondModalDiv.style.display = 'flex';
        if (!firstModalDiv) {
            generateFirstModal();
        }

    }





    isFirstModalOpen = !isFirstModalOpen;
}




function generateFirstModal() {

    if (document.querySelector('.First-modal')) {

        return;
    }
    firstModalDiv = document.createElement('div');
    firstModalDiv.className = "First-modal";
    modal.appendChild(firstModalDiv);

    const modalClose = document.createElement('a');
    modalClose.className = "modal_close";
    modalClose.textContent = "x";
    firstModalDiv.appendChild(modalClose);


    const griseBar = document.createElement('div');
    griseBar.className = 'grise-bar';
    firstModalDiv.appendChild(griseBar);

    const modalTitre = document.createElement('h3');
    modalTitre.className = 'modal_Tiltle';
    modalTitre.textContent = 'Gallerie Photo';
    firstModalDiv.appendChild(modalTitre);

    const btnsContainer = document.createElement('div');
    btnsContainer.className = "btns-Modif";
    firstModalDiv.appendChild(btnsContainer);

    const modGalleryContainer = document.createElement('div');
    modGalleryContainer.className = "mod-gallery";
    firstModalDiv.appendChild(modGalleryContainer);

    btnOpenSecondModal = document.createElement('input');
    btnOpenSecondModal.type = 'submit';
    btnOpenSecondModal.className = 'btn-add-photo';
    btnOpenSecondModal.value = 'Ajouter une photo';
    btnsContainer.appendChild(btnOpenSecondModal);



    const deleteWorkBtn = document.createElement('a');

    deleteWorkBtn.className = ('btn-delete-work');
   

    deleteWorkBtn.addEventListener('click',()=>{
    const workIdToDelete = figureElement.dataset.workid;
    handleDeleteButtonClick(workIdToDelete);});







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
            
                const trashIcon = document.createElement('i');
                trashIcon.className = 'fas fa-trash-can'; 
                figure.appendChild(trashIcon);
            
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
        const workIdToDelete = selectedWorkIds[0];
        if (workIdToDelete) {
            handleDeleteButtonClick(workIdToDelete);
        } else {
            console.log("Aucun travail sélectionné pour la suppression");
        }
    });










    btnOpenSecondModal.addEventListener('click', () => {
        // Ouvrir la nouvelle page modal générée par la fonction
        toggleModal();
    });
    if (!btnOpenSecondModal) {
        btnsContainer.appendChild(btnOpenSecondModal);
    }
    btnOpenSecondModal.addEventListener('click', generateSecondModal);

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
    mod.style.display = "flex";
    modal.style.display = "flex";
    generateFirstModal()
});

function generateSecondModal() {





    if (!secondModalDiv) { // Vérifiez si la div n'est pas déjà créée
        secondModalDiv = document.createElement('div');
        secondModalDiv.className = "seconde-modal";

    }
    if (firstModalDiv) {
        firstModalDiv.style.display = 'none';
    }

    modal.appendChild(secondModalDiv);

    const secondeModalTitre = document.createElement('h3');
    secondeModalTitre.className = 'modal_Tiltle';
    secondeModalTitre.textContent = "Ajouter une photo";
    secondModalDiv.appendChild(secondeModalTitre);



    // Créez les éléments pour la nouvelle modal et les éléments nécessaires
    const uploadPhotoContainer = document.createElement('div');
    uploadPhotoContainer.className = "upload-photo-container";
    secondModalDiv.appendChild(uploadPhotoContainer);

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
    secondModalDiv.appendChild(btnValider);


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

    btnModal.addEventListener('click', toggleModal);
    // Ajoute les éléments créés à la modal

    inputPhoto.appendChild(labelInputPhoto);
    uploadPhotoContainer.appendChild(inputPhoto);

    inputChoiceContent.appendChild(labelTitre);
    inputChoiceContent.appendChild(inputTitle);
    inputChoiceContent.appendChild(labelCategories);
    inputChoiceContent.appendChild(selectCategories);





    const divEnvoyer = document.createElement('div');
    divEnvoyer.className = 'inputChoiceContent';
    const boutonEnvoyer = document.createElement('button');
    boutonEnvoyer.className = 'btn-add-work';
    boutonEnvoyer.textContent = 'Valider';
    boutonEnvoyer.disabled = true;
    divEnvoyer.appendChild(boutonEnvoyer);
    if (!btnModal) {
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


    const modalCloseLink = document.querySelector('.modal_close');

    if (modalCloseLink) {
        console.log("Element '.modal_close' trouvé !");
        modalCloseLink.addEventListener('click', () => {
            const secondeModal = document.getElementById('seconde-modale');
            secondeModal.style.display = 'none';
        });
    }



}

function handleWorkClick(figureElement) {
    const workId = figureElement.dataset.workid;
    if (selectedWorkIds.includes(workId)) {
        // Le workId est déjà sélectionné, donc le supprimer de la liste
        const index = selectedWorkIds.indexOf(workId);
        if (index > -1) {
            selectedWorkIds.splice(index, 1);
        }
        // Appliquer un style visuel pour indiquer qu'un work est désélectionné
        figureElement.classList.remove('selected-work');
    } else {
        // Le workId n'est pas encore sélectionné, donc l'ajouter à la liste
        selectedWorkIds.push(workId);
        // Appliquer un style visuel pour indiquer qu'un work est sélectionné
        figureElement.classList.add('selected-work');
    }
}

function handleDeleteButtonClick(workId) {
   
        deleteWork(workId);
    

    // Vider la liste des workIds sélectionnés
    selectedWorkIds = [];

    // Mettez à jour la première modal pour refléter les changements (rechargez les works)
    generateFirstModal();
}
function deleteWork(workId) {
    fetch(`http://localhost:5678/api/works/${workId}`, {
        method: 'DELETE',
        headers: {
            "accept": "*/*",
            "Authorization": "Bearer " + token // Assurez-vous que 'token' est défini ou remplacez-le par le token valide
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Œuvre supprimée avec succès:', data);
        // Vous pouvez effectuer des actions supplémentaires ici après la suppression réussie
    })
    .catch(error => {
        console.error('Une erreur s\'est produite lors de la suppression de l\'œuvre:', error);
    });
}









































