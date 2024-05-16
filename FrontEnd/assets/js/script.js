

window.addEventListener("load", (event) => {

    const gallery = document.querySelector('.gallery');
    const filters = document.querySelector('.filters');
    const galleryModal = document.querySelector(".galeriePhoto")

    getWorks();
    affichageWorks(gallery);
    getCategorys();
    displayCategorysButtons(filters);
    filterCategory(gallery);
    buttonactive();
    displayWorksModal(galleryModal);
    displayAddModal();
    displayCategoryModal();
    

    // Post ajout de l'image
    const form =document.querySelector(".modalAddImage form")
   

    form.addEventListener("submit",async (e) => {
        e.preventDefault();
        addWork(gallery,galleryModal)
        verifFormCompleted();
        
    })

    form.addEventListener("input", () => {
        verifFormCompleted();
    });
    backtoModaldelete();
})




