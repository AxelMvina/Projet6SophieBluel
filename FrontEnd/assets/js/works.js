// appel du tableau backend
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const responseJson = await response.json();
    return responseJson;
}

const gallery = document.querySelector('.gallery');



async function affichageWorks() {
    const images = await getWorks();
    images.forEach((image) => {
      createImage(image);
    });
  }

  
  function createImage(image) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = image.imageUrl;
    figcaption.textContent = image.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);
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
        btn.classList.add('buttonFilter');
        filters.appendChild(btn);

        // ajout class active au click
         
            btn.addEventListener('click', function() {
            document.querySelector('.active')?.classList.remove('active');
            this.classList.add('active');
        }); 
  });       
}



// filtrer les projets
async function filterCategory(gallery) {
    const project = await getWorks();
    console.log(project)
    const buttons = document.querySelectorAll(".filters button");
    console.log(buttons)
    buttons.forEach(button => {
        button.addEventListener("click",(e)=>{
            const btnId = e.target.id;
            gallery.innerHTML = "";
            if (btnId !== "0") {
                const projectTriCategory = project.filter((image) =>{
                    return image.categoryId == btnId;
                });
                console.log(projectTriCategory);
                projectTriCategory.forEach(image => {
                    createImage(image);
                });
            }
            else {
                affichageWorks();
            }
            console.log(btnId);
        });
    });
}

