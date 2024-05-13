


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
                headers: { 
                    'Authorization': `Bearer ${token}`},
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


// Ecouter changements sur input file

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

// Post ajout de l'image
