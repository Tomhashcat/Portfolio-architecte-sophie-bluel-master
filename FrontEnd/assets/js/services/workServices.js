


var url = 'http://localhost:5678/api/works'; // API URL for works


/**
 * DELETE THE SELECTION UNDER CONDITIONS (MANAGED BY FETCH AND HANDLECLICK)
 * @param {OBJ} workId
 */
async function deleteWork(workId) {


    await fetch(`${url}/${workId}`,
        {
            method: 'DELETE',
            headers: {
              
                "Authorization": `Bearer ` + token,

            }  
        })
        .then(response => response.json())
        .then(data => {
            console.log('Œuvre supprimée avec succès:', data);

        })
        .catch(error => {
            console.error('Une erreur s\'est produite lors de la suppression de l\'œuvre:', error);

        });

}

/**
 * HANDLE CLICK ON THE SELECTED WORK
 * @param {HTMLELEMENT} figureElement
 */
function handleWorkClick(figureElement) {

    const id = figureElement.dataset.workid;

    if (selectedWorkId === id) {
        selectedWorkId = null;
        figureElement.classList.remove('selected-work');
    } else {
        selectedWorkId = id;
        figureElement.classList.add('selected-work');
    }

}
/**
 * HANDLE THE CLICK OF THE DELETE BUTTON IF ID
 */
function handleDeleteButtonClick() {

    if (selectedWorkId !== null) {

        deleteWork(selectedWorkId);
       

    } else {
        console.log("Aucun travail sélectionné pour la suppression");
    }

}











/**
 * ADD TO THE DATABASE
 * @param {work} file
 */
function ajouterTravailALaBaseDeDonnees(file, workTitle, categoryId) {
    const reader = new FileReader();

    reader.onloadend = function () {


        const formData = new FormData(); // Créez un nouvel objet FormData
        /**
          * ADD THE WORK USING APPEND
          */
        formData.append('image', file);
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