/**
 * DECLARATION OF VARIABLES
 */
let isFirstModalOpen = false;
let mod = document.getElementById('mod');
let modal = document.querySelector('.modal');
let selectedWorkIds = [];
let modalClose;
let firstModalDiv;
let secondModalDiv;
let uploadPhotoContainer;


/**
 * GENERATE THE FIRST MODAL 
 */
function generateFirstModal() {


    if (document.querySelector('.First-modal')) {

        return;
    }
    /**
     * GENERATE LE HTML
     */
    firstModalDiv = document.createElement('div');
    firstModalDiv.className = "First-modal";
    modal.appendChild(firstModalDiv);

    let modalClose = document.createElement('a');
    modalClose.className = "modal_close";
    modalClose.textContent = "x";
    firstModalDiv.appendChild(modalClose);
    modalClose.addEventListener('click', () => {
        // Close the modal by hiding the firstModalDiv
        firstModalDiv.style.display = 'none';
        /**
           * INITIANLIZE THE PAGE
           */
        selectedWorkIds = [];

        // Redirect the user to "index.html"
        window.location.href = "index.html";
    });

    griseBar = document.createElement('div');
    griseBar.className = 'grise-bar';
    firstModalDiv.appendChild(griseBar);

    modalTitre = document.createElement('h3');
    modalTitre.className = 'modal_Tiltle';
    modalTitre.textContent = 'Gallerie Photo';
    firstModalDiv.appendChild(modalTitre);

    btnsContainer = document.createElement('div');
    btnsContainer.className = "btns-Modif";
    firstModalDiv.appendChild(btnsContainer);

    modGalleryContainer = document.createElement('div');
    modGalleryContainer.className = "mod-gallery";
    firstModalDiv.appendChild(modGalleryContainer);

    btnOpenSecondModal = document.createElement('input');
    btnOpenSecondModal.type = 'submit';
    btnOpenSecondModal.className = 'btn-add-photo';
    btnOpenSecondModal.value = 'Ajouter une photo';
    btnsContainer.appendChild(btnOpenSecondModal);



    deleteWorkBtn = document.createElement('a');
    deleteWorkBtn.setAttribute("href", "#");
    deleteWorkBtn.className = ('btn-delete-work');
    deleteWorkBtn.textContent = 'Supprimer les travaux';
    btnsContainer.appendChild(deleteWorkBtn);

    deleteWorkBtn.addEventListener('click', handleDeleteButtonClick);
    //END OF THE FIRST MODAL GENERATION

    /**
     * FETCH TO RETRIEVE ALL WORKS
     */
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(works => {


            works.forEach(work => {
                const figure = document.createElement('figure');
                const image = document.createElement('img');
                image.src = work.imageUrl;
                image.alt = work.title;
                figure.appendChild(image);

                workId = work.id;

                trashIcon = document.createElement('i');
                trashIcon.className = 'fas fa-trash-can';
                figure.appendChild(trashIcon);

                figcaption = document.createElement('figcaption');
                figcaption.textContent = work.title;
                figure.appendChild(figcaption);
                figure.setAttribute('data-workid', workId);

                // Add click event to delete works
                figure.addEventListener('click', () => handleWorkClick(figure));

                modGalleryContainer.appendChild(figure);
            });
        })
        .catch(error => {
            console.log('Une erreur s\'est produite lors de la récupération des works :', error);
        });

    /**
     * SET AN ID TO ALL WORKS IN THE MODAL GALLERY
     * @param {Object} obj 
     */
    figureElement = modGalleryContainer.querySelectorAll('.figure');
    let currentWorkId = 1;
    figureElement.forEach(figure => {
        if (!figure.dataset.workid) {
            workId = String(currentWorkId);
            figure.setAttribute('data-workid', workId);
            currentWorkId++;
        }
        if (!figure.hasAttribute('data-click-event-added')) {
            figure.addEventListener('click', () => handleWorkClick(figure));
            figure.setAttribute('data-click-event-added', true);
        }
    });



    if (!btnOpenSecondModal) {
        btnsContainer.appendChild(btnOpenSecondModal);
    }
    btnOpenSecondModal.addEventListener('click', () => { generateSecondModal(modal) });
    /**
        * CHECK IF THE DELETE BUTTON ALREADY EXISTS TO AVOID CREATING IT AGAIN ON EVERY OPENING
        */
    if (!btnsContainer.querySelector('.btn-delete-work')) {
        deleteLInk = document.createElement('a');
        deleteLInk.href = '#';
        deleteLInk.textContent = 'supprimer la galerie';
        deleteLInk.className = 'btn-delete-work';
        btnsContainer.appendChild(deleteLInk);
        deleteLInk.addEventListener('click', generateFirstModal())


    }


}

btnOpenFirstModal = document.querySelector('.a-modifier');
btnOpenFirstModal.addEventListener('click', () => {
    mod.style.display = "flex";
    modal.style.display = "flex";
    generateFirstModal()
});

