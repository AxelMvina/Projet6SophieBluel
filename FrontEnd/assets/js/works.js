// appel du tableau backend
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const responseJson = await response.json();
    return responseJson;
}


// affichage des images
async function affichageWorks(gallery) {
    const work = await getWorks();
    work.forEach(image => {
      createImage(image,gallery);
    });
  }
  
//   creation du html dans le dom
  function createImage(work,gallery) {
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = work.imageUrl;
    figcaption.textContent = work.title;
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


// ajout class active au click boutton Tous
function buttonactive() {
    const button = document.querySelector('.filters button');
    
        button.addEventListener('click', function() {
            document.querySelector('.active')?.classList.remove('active');
            this.classList.add('active');
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
                    createImage(image, gallery);
                });
            }
            else {
                affichageWorks(gallery);
            }
            console.log(btnId);
        });
    });
}

// si l'utilisateur est connecter

const logout = document.querySelector(".logout");
const modifier = document.querySelector("#modifier");


if (isConnected()) {
    logout.textContent = "logout";
    logout.addEventListener('click',()=>{
        disconnected()
    })
    filters.style.display = 'none';
    modifier.style.display = 'inline-flex';
}
