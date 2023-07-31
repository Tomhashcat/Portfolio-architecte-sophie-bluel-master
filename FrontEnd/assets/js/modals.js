/**
 * DECLARATIONS DES VARIABLES
 */
let isFirstModalOpen = false;
var mod = document.getElementById('mod');
var modal = document.querySelector('.modal');
//var modalClose;
var firstModalDiv;
var secondModalDiv;
var secondeModalTitre;
var boutonEnvoyer;
let selectedWorkIds = [];
var griseBar;
var modalTitre;
var btnValider;
var btnsContainer;
var modGalleryContainer;
var deleteWorkBtn;
var workId;
var trashIcon;
var figcaption;
var figureElement;
var deleteLInk;
var btnOpenFirstModal;

var uploadPhotoContainer;
var file;
var inputPhoto;
var inputChoiceContent;
var labelPhoto;
var labelTitre;
var inputTitle;
var labelCategorie;
var selectCategories;
var labelCategories;
var btnModal;
var imagePreview;

var option;
var existingImagePreview;
var modalCloseLink;
var backArrow;

/**
 * CHANGE LA MODAL SOUS CONDITION
 * @param {obj}
 */
function toggleModal() {

    if (isFirstModalOpen) {
        secondModalDiv.style.display = 'none';
        firstModalDiv.style.display = 'flex';
    } else {
        mod.style.display = "flex";
        modal.style.display = "flex";
        firstModalDiv.style.display = 'none';
        secondModalDiv.style.display = 'flex';
        if (!secondModalDiv) {
            generateSecondModal();
        }

    }
    isFirstModalOpen = !isFirstModalOpen;
}
/**
 * 
 * GENERE LA PREMIERE MODAL 
 */
function generateFirstModal() {

    if (document.querySelector('.First-modal')) {

        return;
    }
    /**
     * GENERE LE HTML
     */
    firstModalDiv = document.createElement('div');
    firstModalDiv.className = "First-modal";
    modal.appendChild(firstModalDiv);

    let modalClose = document.createElement('a');
    modalClose.className = "modal_close";
    modalClose.textContent = "x";
    firstModalDiv.appendChild(modalClose);
    modalClose.addEventListener('click', () => {
        // Fermez la modal en masquant le div firstModalDiv
        firstModalDiv.style.display = 'none';
        /**
         * INITIANLISE LA PAGE
         */
        selectedWorkIds = [];

        // Redirige l'utilisateur vers "index.html"
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
    //FIN DE LA GENERATION DE LA PREMIERE MODAL








    /**
     * FETCH POUR RECUPERER TOUS LES WORKS
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

                // Ajouter l'événement de clic pour la suppression des œuvres
                figure.addEventListener('click', () => handleWorkClick(figure));

                modGalleryContainer.appendChild(figure);
            });
        })
        .catch(error => {
            console.log('Une erreur s\'est produite lors de la récupération des works :', error);
        });

    /**
     * ATTRIBU UN ID A TOUS LES WORKS DANS LA GALLERY DE LA MODAL
     * @param {obj}
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
    btnOpenSecondModal.addEventListener('click', generateSecondModal);
    /**
     * VERIFIE SI LE BTN DELETE EXISTE DEJA POUR NE PAS LE CREER A CHAQUE OUVERTURE
     */
    if (!btnsContainer.querySelector('.btn-delete-work')) {
        deleteLInk = document.createElement('a');
        deleteLInk.href = '#';
        deleteLInk.textContent = 'supprimer la galerie';
        deleteLInk.className = 'btn-delete-work';
        btnsContainer.appendChild(deleteLInk);
        deleteLInk.addEventListener('click',  generateFirstModal())


    }


}
/**
 * AU CLICK OUVRE LA PREMIERE MODAL
 * @param {obj}
 */
btnOpenFirstModal = document.querySelector('.a-modifier');
btnOpenFirstModal.addEventListener('click', () => {
    mod.style.display = "flex";
    modal.style.display = "flex";
    generateFirstModal()
});

/**
 * GENERE LA SECONDE MODAL
 */
function generateSecondModal() {
    /**
     * VERIFI SI LA DIV EXISTE DEJA
     */
    if (!secondModalDiv) {
        secondModalDiv = document.createElement('div');
        secondModalDiv.className = "seconde-modal";
        secondModalDiv.style.display = 'flex';
    }
    if (firstModalDiv) {
        firstModalDiv.style.display = 'none';
    }

    modal.appendChild(secondModalDiv);

    /**
     * GENERE LE HTML DE LA SECONDE MODAL
     */
    backArrow = document.createElement('i');
    backArrow.className = "fa-solid fa-arrow-left";
    secondModalDiv.appendChild(backArrow);
    backArrow.addEventListener('click', () => {
        toggleModal();
    });

    let modalClose = document.createElement('a');
    modalClose.className = "modal_close";
    modalClose.textContent = "x";
    secondModalDiv.appendChild(modalClose);
    modalClose.addEventListener('click', () => {
        // Fermez la modal en masquant le div firstModalDiv
        secondModalDiv.style.display = 'none';
        // Assurez-vous également de réinitialiser la sélection des travaux
        selectedWorkIds = [];

        // Redirigez l'utilisateur vers "index.html"
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
     * AJOUTE LES ELEMENTS AU DOM
     */
    uploadPhotoContainer.appendChild(inputPhoto);

    inputChoiceContent.appendChild(labelTitre);
    inputChoiceContent.appendChild(inputTitle);
    inputChoiceContent.appendChild(labelCategories);
    inputChoiceContent.appendChild(selectCategories);


    btnValider.addEventListener('click', (event) => {
        event.preventDefault();
        file = inputPhoto.files[0]; // Récupérer le fichier sélectionné
        if (file) {
            ajouterTravailALaBaseDeDonnees(file);
            console.log("Nouveau travail ajouté !");

        }
    });





    /**
     * VERIFI SI LE BTNMODAL EXISTE AVANT DE LE CREER
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
     * FETCH POUR RECUPERER LES NUMERO ID ET CATEGORIES
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
    // Ajoute l'écouteur d'événement pour le champ de téléchargement de fichier
    inputPhoto.addEventListener('change', () => {
        const file = inputPhoto.files[0]; // Récupérer le fichier sélectionné
        if (file) {
            // Active le bouton d'ajout de travail s'il y a un fichier sélectionné
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
            // Désactive le bouton si aucun fichier n'est sélectionné
            btnValider.disabled = true;

            existingImagePreview = uploadPhotoContainer.querySelector('.image-preview');
            if (existingImagePreview) {
                uploadPhotoContainer.removeChild(existingImagePreview);
            }
        }
    });




    /**
     * FERME LA MODAL SI CLICK SUR MODAL CLOSE
     */
    modalCloseLink = document.querySelector('.modal_close');

    if (modalCloseLink) {

        modalCloseLink.addEventListener('click', () => {
            const secondeModal = document.getElementById('seconde-modale');
            secondeModal.style.display = 'none';
        });
    }



}
/**
 * GERE LE CLICK SUR L OEUVRE SELECTIONNEE
 * @param {HTMLELEMENT} figureElement 
 */
function handleWorkClick(figureElement) {

    const workId = figureElement.dataset.workid;

    if (selectedWorkIds.includes(workId)) {

        const index = selectedWorkIds.indexOf(workId);
        if (index > -1) {
            selectedWorkIds.splice(index, 1);
        }
        // style visuel pour indiquer qu'un work est désélectionné
        figureElement.classList.remove('selected-work');
    } else {
        // Le workId n'est pas encore sélectionné, donc l'ajouter à la liste
        selectedWorkIds.push(workId);
        //style visuel pour indiquer qu'un work est sélectionné
        figureElement.classList.add('selected-work');
    }

}
/**
 * GERE LE CLICK DU BOUTON DE SUPRESSION SI ID
 */
function handleDeleteButtonClick() {
    if (selectedWorkIds.length > 0) {

        selectedWorkIds.forEach(workId => {
            deleteWork(workId);
            console.log('workId', workId)
        });
        selectedWorkIds = [];

    } else {
        console.log("Aucun travail sélectionné pour la suppression");
    }

}









/**
 * AJOUTE A LA BASE DE DONNEE
 * @param {work} file 
 */
function ajouterTravailALaBaseDeDonnees(file, workTitle, categoryId) {
    const reader = new FileReader();

    reader.onloadend = function () {
       

        const formData = new FormData(); // Créez un nouvel objet FormData
        /**
         * AJOUTE LE TAVAIL AVEC APPEND
         */
        formData.append('image',file);
        formData.append('title', workTitle);
        formData.append('categoryId', categoryId);
        fetch('http://localhost:5678/api/works', {
            method: 'POST',
            headers: {

                "Authorization": "Bearer " + token,

            },
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                console.log('Travail ajouté avec succès:', data);

            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de l\'ajout du travail:', error);

            });
    };
    reader.readAsDataURL(file);
}











