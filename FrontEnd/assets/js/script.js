

window.addEventListener("load", (event) => {

    
    const filters = document.querySelector('.filters')

    getWorks();
    affichageWorks(gallery);
    getCategorys();
    displayCategorysButtons(filters);
    filterCategory(gallery);
    buttonactive();
})


