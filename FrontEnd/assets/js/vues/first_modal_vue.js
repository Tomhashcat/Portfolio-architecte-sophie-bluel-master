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
let selectedWorkId;
let noSelectionDiv;
let id;
let btnYes;
let btnNo;
/**
 * GENERATE THE FIRST MODAL 
 */
function generateFirstModal() {

    modal.innerHTML = "";
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
        mod.style.display = 'none';
        /**
           * INITIANLIZE THE PAGE
           */
        init();
        generateFirstModal()



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




    alerteDeleteSelection = document.createElement('div');
    alerteDeleteSelection.className = 'alerteDeleteSelection';


    if (selectedWorkIds.length === 0) {

        alerteDeleteSelection.textContent = "Rien n'est sélectionné pour la suppression.";
        btnOk = document.createElement('button');
        btnOk.className = 'btnChoices';
        btnOk.textContent = 'OK';
        alerteDeleteSelection.appendChild(btnOk);
        btnOk.addEventListener('click', () => {
            alerteDeleteSelection.style.display = 'none';
        });
    }


    else {
        alerteDeleteSelection.textContent = "Etes vous sur de vouloir supprimer la sélection ?";

        btnYes = document.createElement('button');
        btnYes.className = 'btnChoices';
        btnYes.textContent = 'OUI';
        alerteDeleteSelection.appendChild(btnYes);



        btnNo = document.createElement('button');
        btnNo.className = 'btnChoices';
        btnNo.textContent = 'NON';
        alerteDeleteSelection.appendChild(btnNo);





        btnYes.addEventListener('click', () => {
            deleteWork(workId);

        });


        btnNo.addEventListener('click', () => {

            alerteDeleteSelection.style.display = 'none';
        });


    }

    firstModalDiv.appendChild(alerteDeleteSelection);



    deleteWorkBtn = document.createElement('a');
    deleteWorkBtn.setAttribute("href", "#");
    deleteWorkBtn.className = ('btn-delete-work');
    deleteWorkBtn.textContent = 'Supprimer les travaux';

    btnsContainer.appendChild(deleteWorkBtn);
    deleteWorkBtn.addEventListener('click', () => {
        if (selectedWorkId === null) {
            noSelectionDiv = document.querySelector('.noSelectionDiv')
            noSelectionDiv.style.display = 'flex';
            alerteDeleteSelection = document.querySelector('.alerteDeleteSelection');
            alerteDeleteSelection.style.display = 'none';
        }
        else {
            alerteDeleteSelection = document.querySelector('.alerteDeleteSelection');
            alerteDeleteSelection.style.display = 'flex';
        }

    });



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
                trashIcon.addEventListener('click', (event) => {
                    event.stopPropagation();
                    const figureElement = event.currentTarget.parentElement;
                    const workId = figureElement.dataset.workid;
                    deleteWork(workId)

                });

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
    mod.addEventListener('click', (event) => {

        if (mod.contains(event.target) && event.target == mod) {
            mod.style.display = 'none';

        }
    });




}

btnOpenFirstModal = document.querySelector('.a-modifier');
btnOpenFirstModal.addEventListener('click', () => {
    mod.style.display = "flex";
    modal.style.display = "flex";
    generateFirstModal()
});
