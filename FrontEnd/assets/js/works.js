// appel du tableau backend
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const responseJson = await response.json();
    return responseJson;
}


// affichage des images
async function affichageWorks(gallery, works) {
    console.log(works);
    gallery.innerHTML = "";
   
    works.forEach(work => {
      createImage(work,gallery);
    });
}
  
//   creation du html dans le dom
function createImage(work,gallery) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = work.imageUrl;
    figure.dataset.id = work.id;
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
}


// suppression du travail dont l'id est passé en paramètre (est appelé depuis la modale)
function deleteWorkHtml(id){
    // récupération du travaux
    const workHtml = document.querySelector(".gallery figure[data-id='"+id+"']");
    workHtml.remove();
}


//***affichage boutons par categories***


// recuperer le tableau des categories

async function getCategorys() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}


// afficher les bouttons
async function displayCategorysButtons(filters, galleryHtml, works) {
    const categorys = await getCategorys();
    
    // Créer le bouton "Tous" avec id 0
    const allBtn = document.createElement("button");
    allBtn.textContent = "Tous";
    allBtn.id = "0";
    allBtn.classList.add('buttonFilter');
    allBtn.classList.add('active');
    filters.appendChild(allBtn);

    // Ajout de l'événement de clic pour le bouton "Tous"
    allBtn.addEventListener('click', function(e) {
        galleryHtml.innerHTML = "";
        works.forEach(image => {
            createImage(image, galleryHtml);
        });
        document.querySelector('.active')?.classList.remove('active');
        this.classList.add('active');
    });
    
    // Création des boutons de Tri
    categorys.forEach(category =>{
    const btn = document.createElement("button");
    btn.textContent = category.name;
    btn.id = category.id;
    btn.classList.add('buttonFilter');
    filters.appendChild(btn);

    // tableau des travaux à afficher
    let  projectTriCategory;

    // ajout class active au click
        
    btn.addEventListener('click', function(e) {

        const btnId = e.target.id;
        let projectTriCategory;
        galleryHtml.innerHTML = "";
        if (btnId !== "0") {
            projectTriCategory = works.filter((image) =>{
                return image.categoryId == btnId;
            });

           
        }
        else {
            projectTriCategory = works;
            
        }

        console.log("works",projectTriCategory);
        projectTriCategory.forEach(image => {
            createImage(image, galleryHtml);
        });
        
        console.log(btnId);
        document.querySelector('.active')?.classList.remove('active');
        this.classList.add('active');
    }); 
  });       
}


// ajout class active au click boutton Tous
// function buttonactive() {
//     const button = document.querySelector('.filters button');
    
//         button.addEventListener('click', function() {
//             document.querySelector('.active')?.classList.remove('active');
//             this.classList.add('active');
//         });
   
// }




