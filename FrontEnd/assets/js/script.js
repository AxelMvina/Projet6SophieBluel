

window.addEventListener("load", (event) => {

    const gallery = document.querySelector('.gallery');
    const filters = document.querySelector('.filters')

    getWorks();
    affichageWorks(gallery);
    getCategorys();
    displayCategorysButtons(filters);
})




// filtrer les projets
// async function filterCategory() {
//     const project = await getWorks();
//     console.log(project)
//     const buttons = document.querySelectorAll(".filters button");
//     console.log(buttons)
//     buttons.forEach(button => {
//         button.addEventListener("click",(e)=>{
//             btnId = e.target.id;
//             gallery.innerHTML = "";
//             if (btnId !== "0") {
//                 const projectTriCategory = project.filter((image) =>{
//                     return image.categoryId == btnId;
//                 });
//                 projectTriCategory.forEach(image => {
//                     affichageWorks(image);
//                 });
//             }
//             console.log(btnId);
//         });
//     });
// }

// filterCategory();