

window.addEventListener("load", (event) => {

    const gallery = document.querySelector('.gallery');
    const filters = document.querySelector('.filters')

    getWorks();
    affichageWorks(gallery);
    getCategorys();
    displayCategorysButtons(filters);
})


