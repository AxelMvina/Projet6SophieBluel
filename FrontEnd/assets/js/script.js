

window.addEventListener("load", (event) => {

    const gallery = document.querySelector('.gallery');
    const filters = document.querySelector('.filters');
    const galleryModal = document.querySelector(".galeriePhoto")
 
     const title = document.querySelector(".modalAddImage #title")
     const category = document.querySelector(".modalAddImage #category")
 
     // previsualisation de l'image
     const previewImg = document.querySelector(".containerFile img")
     const inputFile = document.querySelector(".containerFile input")
     const labelFile = document.querySelector(".containerFile label")
     const inconFile = document.querySelector(".containerFile .fa-image")
     const pFile = document.querySelector(".containerFile p")
 
 
    

    getWorks();
    affichageWorks(gallery);
    getCategorys();
    displayCategorysButtons(filters);
    filterCategory(gallery);
    buttonactive();
    displayWorksModal(galleryModal, gallery);
    displayAddModal();
    displayCategoryModal();
    

    // Post ajout de l'image
    const form =document.querySelector(".modalAddImage form")
   

    form.addEventListener("submit",async (e) => {
        e.preventDefault();
        addWork(gallery,galleryModal)
        verifFormCompleted();
        
    })

    form.addEventListener("input", () => {
        verifFormCompleted();
    });
    backtoModaldelete();


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

    
    // si l'utilisateur est connecter

    const logout = document.querySelector(".logout");
    const modifier = document.querySelector("#modifier");


    if (isConnected()) {
        console.log("connecte")
        logout.textContent = "logout";
        logout.addEventListener('click',()=>{
            disconnected()
        })
        filters.style.display = 'none';
        modifier.style.display = 'inline-flex';
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


   
})




