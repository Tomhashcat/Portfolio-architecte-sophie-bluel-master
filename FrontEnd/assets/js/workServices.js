const url= 'http://localhost:5678/api/works';


/**
 * SUPPRIME LA SELECTION SOUS CONDITIONS(GERE PAR LE FECTH ET HANDLECLICK)
 * @param {OBJ} workId 
 */
async function deleteWork(workId) {
  
    await fetch(`${url}/${workId}`,
        {
            method: 'DELETE',
            headers:{

                "Authorization": `Bearer ${token}`,
        
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