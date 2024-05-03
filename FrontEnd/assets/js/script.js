

window.addEventListener("load", (event) => {

    
    const filters = document.querySelector('.filters')
    const buttonFil = document.querySelector('.buttonFilter')

    getWorks();
    affichageWorks(gallery);
    getCategorys();
    displayCategorysButtons(filters,buttonFil);
    filterCategory(gallery);
    buttonactive();
})


