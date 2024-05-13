

window.addEventListener("load", (event) => {

    const gallery = document.querySelector('.gallery');
    const filters = document.querySelector('.filters');
    const galeriePhoto = document.querySelector(".galeriePhoto")

    getWorks();
    affichageWorks(gallery);
    getCategorys();
    displayCategorysButtons(filters);
    filterCategory(gallery);
    buttonactive();
    displayWorksModal(galeriePhoto);
    displayAddModal();
    displayCategoryModal();
    verifFormCompleted();
})


