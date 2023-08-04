/**
 * GENERATE THE SECOND MODAL
 * @param {Object} modal - The modal object
 */

function generateSecondModal(modal) {



    let file;
    let inputPhoto;
    let inputChoiceContent;
    let labelPhoto;
    let labelTitre;
    let inputTitle;
    let labelCategorie;
    let selectCategories;
    let labelCategories;
    let btnModal;
    let modalClose;
    let imagePreview;
    let option;
    let existingImagePreview;
    let modalCloseLink;
    let backArrow;


    /**
     * CHECK IF THE SECOND DIV EXIST
     */
    if (!secondModalDiv) {
        secondModalDiv = document.createElement('div');
        secondModalDiv.className = "seconde-modal";
        secondModalDiv.style.display = 'flex';
        modal.appendChild(secondModalDiv);
    }
    if (firstModalDiv) {
        firstModalDiv.style.display = 'none';
    }



    /**
 * GENERATE THE HTML OF THE SECOND MODAL
 */
    backArrow = document.createElement('i');
    backArrow.className = "fa-solid fa-arrow-left";
    secondModalDiv.appendChild(backArrow);
    backArrow.addEventListener('click', () => {
        toggleModal();
    });

    modalClose = document.createElement('a');
    modalClose.className = "modal_close";
    modalClose.textContent = "x";
    secondModalDiv.appendChild(modalClose);
    modalClose.addEventListener('click', () => {
        // Close the modal by hiding the secondModalDiv
        secondModalDiv.style.display = 'none';
        // Make sure to reset the selectedWorkIds
        selectedWorkIds = [];

        // Redirect the user to "index.html"
        window.location.href = "index.html";
    });
    secondeModalTitre = document.createElement('h3');
    secondeModalTitre.className = 'modal_Tiltle';
    secondeModalTitre.textContent = "Ajouter une photo";
    secondModalDiv.appendChild(secondeModalTitre);


    uploadPhotoContainer = document.createElement('div');
    uploadPhotoContainer.className = "upload-photo-container";



    secondModalDiv.appendChild(uploadPhotoContainer);

    inputChoiceContent = document.createElement('div');
    inputChoiceContent.className = 'inputs-seconde-modal-choices';
    uploadPhotoContainer.appendChild(inputChoiceContent);

    inputPhoto = document.createElement('input');
    inputPhoto.className = 'input-File-Seconde-Modal';
    inputPhoto.type = 'file';
    inputPhoto.accept = 'image/*';
    inputPhoto.id = 'fileInput';


    labelPhoto = document.createElement('label');
    labelPhoto.htmlFor = 'fileInput';
    labelPhoto.id = 'customFileInput';
    labelPhoto.className = 'custom-file-input';
    labelPhoto.textContent = '+ Ajouter une photo';

    uploadPhotoContainer.appendChild(labelPhoto);

    pAddPhoto = document.createElement('p');
    pAddPhoto.className = 'pAddPhoto';
    pAddPhoto.textContent = 'jpg, pnj : 4mo max.'
    uploadPhotoContainer.appendChild(pAddPhoto);

    griseBar = document.createElement('div');
    griseBar.className = 'grise-bar-second';
    secondModalDiv.appendChild(griseBar);

    btnValider = document.createElement('div');
    btnValider.className = "btn-valider";
    btnValider.textContent = "valider";
    btnValider.disable = true;
    secondModalDiv.appendChild(btnValider);


    inputTitle = document.createElement('input');
    inputTitle.className = 'input-new-title';

    labelTitre = document.createElement('label');
    labelTitre.textContent = 'Titre';
    labelTitre.className = 'titre-input-titre';

    labelCategorie = document.createElement('label');
    labelCategorie.textContent = 'Catégorie';

    selectCategories = document.createElement('select');
    selectCategories.className = 'input-categories-new-work';

    labelCategories = document.createElement('label');
    labelCategories.textContent = 'Catégorie';
    labelCategories.className = 'Titre-select-categories'

    btnModal = document.createElement('input');
    btnModal.type = 'submit';
    btnModal.className = 'btn-add-photo';
    btnModal.textContent = 'Ajouter une photo';

    btnModal.addEventListener('click', toggleModal);


    /**
    * ADD ELEMENTS TO THE DOM
    */
    uploadPhotoContainer.appendChild(inputPhoto);

    inputChoiceContent.appendChild(labelTitre);
    inputChoiceContent.appendChild(inputTitle);
    inputChoiceContent.appendChild(labelCategories);
    inputChoiceContent.appendChild(selectCategories);


    btnValider.addEventListener('click', (event) => {
        event.preventDefault();
        file = inputPhoto.files[0];// Get the selected file
        if (file) {
            ajouterTravailALaBaseDeDonnees(file);
            console.log("Nouveau travail ajouté !");

        }
    });





    /**
     * CHECK IF THE BTNMODAL EXISTS BEFORE CREATING IT
     */
    if (!btnModal) {
        btnsContainer = document.createElement('div');
        btnsContainer.className = 'btns-container';
        btnsContainer.appendChild(btnModal);
    }
    btnModal.addEventListener('click', () => {
        toggleModal();
    });

    /**
  * FETCH TO RETRIEVE THE NUMBER ID AND CATEGORIES
  */
    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name;
                selectCategories.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Une erreur s\'est produite ', error);
        });

    // Add event listener for the file upload field
    inputPhoto.addEventListener('change', () => {
        const file = inputPhoto.files[0]; // Get the selected file
        if (file) {
            // Enable the add work button if a file is selected
            btnValider.disabled = false;
            btnValider.classList.add('btn-actif');
            imagePreview = document.createElement('img');
            imagePreview.src = URL.createObjectURL(file);
            imagePreview.className = 'image-preview';

            const existingImagePreview = uploadPhotoContainer.querySelector('.image-preview');
            if (existingImagePreview) {
                uploadPhotoContainer.removeChild(existingImagePreview);

            }
            uploadPhotoContainer.appendChild(imagePreview);
        } else {
            // Disable the button if no file is selected
            btnValider.disabled = true;

            existingImagePreview = uploadPhotoContainer.querySelector('.image-preview');
            if (existingImagePreview) {
                uploadPhotoContainer.removeChild(existingImagePreview);
            }
        }
    });




    /**
   * CLOSE THE MODAL ON CLICK ON MODAL CLOSE
   */
    modalCloseLink = document.querySelector('.modal_close');

    if (modalCloseLink) {

        modalCloseLink.addEventListener('click', () => {
            const secondeModal = document.getElementById('seconde-modale');
            secondeModal.style.display = 'none';
        });
    }



}