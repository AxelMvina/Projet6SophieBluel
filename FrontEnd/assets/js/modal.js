


async function displayWorksModal(galeriePhoto) {
    galeriePhoto.innerHTML ="";
    const images = await getWorks();
    images.forEach(image => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid","fa-trash-can");
        trash.id = image.id;
        img.src = image.imageUrl;
        span.appendChild(trash)
        figure.appendChild(span)
        figure.appendChild(img)
        galeriePhoto.appendChild(figure)
    });
    deleteImage()
}

// fonction pour supprimer une image
function deleteImage(galeriePhoto) {
    const trashAll = document.querySelectorAll(".fa-trash-can")
    console.log(trashAll);
    trashAll.forEach(trash => {
        trash.addEventListener("click", (e) =>{
            let token = localStorage.getItem('token');
            const id = trash.id
            const init = {
                method:"DELETE",
                headers: {Authorization: `Bearer ${token}`},
            }
            // envoie de la requete avec l'id de la trash can 
            fetch("http://localhost:5678/api/works/" +id,init)
            .then((response) => {
                if (!response.ok) {
                    console.log("le delete n'a pas marcher !")
                }
                return response.json();
            })
            .then((data) => {
                console.log("le delete a reussi voici la data :", data)
                displayWorksModal(galeriePhoto);
            })
        })
    });
}

const containerModals = document.querySelector(".containerModals")
const xmark = document.querySelector(".containerModals .fa-xmark")


// afficher/cacher la premiere modals

modifier.addEventListener("click",()=>{
    containerModals.style.display = 'flex';
});

xmark.addEventListener("click",()=>{
    containerModals.style.display = 'none';
});

containerModals.addEventListener('click', (e) => {
    if (e.target.className == "containerModals") {
        containerModals.style.display = 'none';
    }
});


// modal 2 addImage
const btnAddmodal = document.querySelector(".modalGalerie button")
const modalAddImage = document.querySelector(".modalAddImage")
const modalGalerie = document.querySelector(".modalGalerie")
const arrowLeft = document.querySelector(".fa-arrow-left")
const xmarkAdd = document.querySelector(".modalAddImage .fa-xmark")


// afficher/cacher la deuxieme modal 
function displayAddModal() {
    btnAddmodal.addEventListener("click", () => {
        modalAddImage.style.display = 'flex';
        modalGalerie.style.display = 'none';
    })
    arrowLeft.addEventListener("click",() => {
        modalAddImage.style.display = 'none';
        modalGalerie.style.display = 'flex';
    })
    xmarkAdd.addEventListener("click",()=>{
        containerModals.style.display = 'none';
    });
}

// previsualisation de l'image
const previewImg = document.querySelector(".containerFile img")
const inputFile = document.querySelector(".containerFile input")
const labelFile = document.querySelector(".containerFile label")
const inconFile = document.querySelector(".containerFile .fa-image")
const pFile = document.querySelector(".containerFile p")


// Ecouter changements sur input file (preview)

inputFile.addEventListener("change",() => {
    const file = inputFile.files[0]
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e){
            previewImg.src = e.target.result
            previewImg.style.display = "flex";
            labelFile.style.display = "none";
            inconFile.style.display = "none";
            pFile.style.display = "none";
        }
        reader.readAsDataURL(file);
    }
})

// liste de categorie/input select
async function displayCategoryModal() {
    const select = document.querySelector(".modalAddImage select");
    const categorys = await getCategorys()
    categorys.forEach(category => {
        const option = document.createElement("option")
        option.value = category.id
        option.textContent = category.name
        select.appendChild(option)
    });
}


/* Fonction permettant de changer le style CSS du bouton "Valider" et le rendant 
    fonctionnelle quand les champs "image, titre & catégorie" sont remplie */
function verifFormCompleted() {
    const buttonValidForm = document.querySelector(".modalAddImage button");
        

    form.addEventListener("input", () => {
        if (title.value !== "" && category.value !== "" && inputFile.value !== "") {
            buttonValidForm.classList.add("buttonModal-2-active");
            buttonValidForm.disabled = false;
        } else {
            buttonValidForm.classList.remove("buttonModal-2-active");
            buttonValidForm.disabled = true;
        }
    });
}



// Post ajout de l'image
const form =document.querySelector(".modalAddImage form")
const title = document.querySelector(".modalAddImage #title")
const category = document.querySelector(".modalAddImage #category")

form.addEventListener("submit",async (e) => {
    e.preventDefault();
    const playload = new FormData();
    /* Ajout des données au FormData pour l'envoi via la requête HTTP */
    playload.append("title", title.value);
    playload.append("category", category.value);
    playload.append("image", inputFile.files[0]);

    /* Affichage des valeurs du titre, de la catégorie et du fichier dans la console */
    console.log(title.value);
    console.log(category.value);
    console.log(inputFile.files[0]);

    try {
        /* Récupération du token de la session */
        let token = localStorage.getItem('token');
        /* Envoi de la requête POST au serveur avec les données du formulaire */
        const response = await fetch("http://localhost:5678/api/works/", {
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            body: playload,
        });

        /* Vérification si la réponse du serveur est OK */
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        /* Récupération des données JSON de la réponse */
        const data = await response.json();
        /* Affichage d'un message de succès dans la console */
        console.log("Nouvelle image bien chargée !" + data);
        /* Actualisation de la galerie d'image et de la modale permettant la suppression d'une image */
        affichageWorks(gallery);
        displayWorksModal(galeriePhoto);

    } catch (error) {
        console.log("Une erreur est survenue lors de l'envoi de l'image :", error.message);
    }
})