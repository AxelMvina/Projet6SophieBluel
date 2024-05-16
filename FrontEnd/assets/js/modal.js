



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

const title = document.querySelector(".modalAddImage #title")
const category = document.querySelector(".modalAddImage #category")

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
        

    
    if (title.value !== "" && category.value !== "" && inputFile.value !== "") {
        buttonValidForm.classList.add("buttonModal-2-active");
        buttonValidForm.disabled = false;
    } else {
        buttonValidForm.classList.remove("buttonModal-2-active");
        buttonValidForm.disabled = true;
    }
    
}

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

// au click valider de la modal on retourne a la modalDisplay
function backtoModaldelete() {
    const buttonValidForm = document.querySelector(".modalAddImage button");
    buttonValidForm.addEventListener("click",() => {
        modalAddImage.style.display = 'none';
        modalGalerie.style.display = 'flex';
        
    })
}


// ajout de works en passant par la modal d'ajout
async function addWork(gallery, galleryModal) {
    const playload = new FormData();
    playload.append("title", title.value);
    playload.append("category", category.value);
    playload.append("image", inputFile.files[0]);

    try {
        let token = localStorage.getItem('token');
        const response = await fetch("http://localhost:5678/api/works/", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: playload,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const work = await response.json();
        console.log("Ajout réussi :", work);
        createImage(work, gallery);
        createWorkModal(work, galleryModal);

        // Réinitialiser le formulaire après le traitement réussi de la soumission du formulaire POST
        const form = document.querySelector(".modalAddImage form");
        form.reset();

        // Réinitialiser l'aperçu de l'image après le traitement réussi de la soumission du formulaire POST
        previewImg.src = ""; // Réinitialisation de la source de l'image
        previewImg.style.display = "none"; // Cacher l'aperçu de l'image
        labelFile.style.display = "block"; // Afficher l'étiquette de fichier
        inconFile.style.display = "block"; // Afficher l'icône de fichier
        pFile.style.display = "block"; // Afficher le texte de fichier

    } catch (error) {
        console.error("Une erreur est survenue lors de l'envoi de l'image :", error.message);
    }
}

async function displayWorksModal(galleryModal) {
    galleryModal.innerHTML ="";
    const images = await getWorks();
    images.forEach(image => {
        createWorkModal(image,galleryModal);
    });
    deleteImage(galleryModal)
}

function createWorkModal(work,galleryModal){
    const figure = document.createElement("figure");
        const img = document.createElement("img");
        const span = document.createElement("span");
        const trash = document.createElement("i");
        trash.classList.add("fa-solid","fa-trash-can");
        trash.id = work.id;
        img.src = work.imageUrl;
        span.appendChild(trash)
        figure.appendChild(span)
        figure.appendChild(img)
        galleryModal.appendChild(figure)
}

// fonction pour supprimer une image
function deleteImage(galleryModal) {
    const trashAll = document.querySelectorAll(".fa-trash-can")
    // console.log(trashAll);
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
                console.log(response)
                if (!response.ok) {
                    console.log("le delete n'a pas marcher !")
                }
                return response;
            })
            .then((data) => {
                console.log("le delete a reussi voici la data :", data)
                displayWorksModal(galleryModal);
            })
        })
    });
}
