//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
///////////////////////////                                             //////////////////////////////////////////////////////////////////////////// 
///////////////////////////                                             //////////////////////////////////////////////////////////////////////////// 
///////////////////////////                                             //////////////////////////////////////////////////////////////////////////// 
///////////////////////////                SOMMAIRE                     //////////////////////////////////////////////////////////////////////////// 
///////////////////////////                                             //////////////////////////////////////////////////////////////////////////// 
///////////////////////////                                             //////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
///  --Line 28  : GetCategories                                                                                               ///////////////////////
///  --Line 50  : DeleteWork                                                                                                  ///////////////////////
///  --Line 88  : AddNewWork(ajouterTravailALaBaseDeDonnees)                                                                  ///////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////   
 /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var url = 'http://localhost:5678/api/';

async function getCategory(){
    const request = await fetch(url + "categories",{
        method : "GET",
        headers : {
            "Accept" : "application/json",
            'Content-Type': 'application/json',
        }
    })
    if(!request.ok){
        throw new Error("erreur API");
    }
    const result = await request.json();
    return result;                     
};

var url = 'http://localhost:5678/api/works'; // API URL for works


/**
 * DELETE THE SELECTION UNDER CONDITIONS
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
        .then(response => {
            if (!response.ok) {
                throw new Error('La suppression de l\'œuvre a échoué');
            }
            return response.text();
        })
        .then(data => {
            console.log('Œuvre supprimée avec succès:', data);
            generateFirstModal();
            init();

        })
        .catch(error => {
            console.log('Une erreur s\'est produite lors de la suppression de l\'œuvre:', error);

        });




}

/**
 * ADD TO THE DATABASE
 * @param {work} file
 */
async function ajouterTravailALaBaseDeDonnees() {


    const title = document.querySelector(".input-new-title").value;
    const categoryId = document.querySelector(".input-categories-new-work").value;
    const image = document.querySelector(".input-File-Seconde-Modal").files[0];


    if (title === "" || categoryId === "" || image === undefined) {
        alert("Merci de remplir tous les champs");
        return;
    } else if (categoryId !== "1" && categoryId !== "2" && categoryId !== "3") {
        alert("Merci de choisir une catégorie valide");
        return;
    } else {
        const allowedExtensions = ["jpg", "png"];
        const fileExtension = image.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(fileExtension)) {
            alert("L'extension du fichier doit être JPG ou PNG");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("category", categoryId);
            formData.append("image", image);

            /**
             * FECTH POST
             *  @param {obj}
             */
            const response = await fetch(`${url} `, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            if (response.status === 201) {
                alert("Projet ajouté avec succès :)");
                init(categoryId);
                generateFirstModal();
              
                

            } else if (response.status === 400) {
                alert("Merci de remplir tous les champs");
            } else if (response.status === 500) {
                alert("Erreur serveur");
            } else if (response.status === 401) {
                alert("Vous n'êtes pas autorisé à ajouter un projet");

            }
        }

        catch (error) {
            console.log(error);
        }
    }
}