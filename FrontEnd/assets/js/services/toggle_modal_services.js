/**
 * CHANGE THE MODAL
 * @param {obj}
 */
function toggleModal() {




    if (isFirstModalOpen) {
        secondModalDiv.style.display = 'none';
        firstModalDiv.style.display = 'flex';
        generateFirstModal();
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