// appel du tableau backend
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const responseJson = await response.json();
    return responseJson;
}




// affichage des works
async function affichageWorks(gallery) {
    const arrayWorks = await getWorks();
    arrayWorks.forEach(work => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = work.imageUrl;
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}



//***affichage boutons par categories***


// recuperer le tableau des categories

async function getCategorys() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}



// afficher les bouttons
async function displayCategorysButtons(filters) {
    const categorys = await getCategorys();
    categorys.forEach(category =>{
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.id = category.id;
        filters.appendChild(btn);
    });
}


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