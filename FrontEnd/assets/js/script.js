

window.addEventListener("load", async (event) => 
     {

        const gallery = document.querySelector('.gallery');
        const filters = document.querySelector('.filters');
        const galleryModal = document.querySelector(".galeriePhoto")
    
    
        // previsualisation de l'image
        const previewImg = document.querySelector(".containerFile img")
        const inputFile = document.querySelector(".containerFile input")
        const labelFile = document.querySelector(".containerFile label")
        const inconFile = document.querySelector(".containerFile .fa-image")
        const pFile = document.querySelector(".containerFile p")
    
    
        
        const works= await getWorks();
        console.log(works)
        affichageWorks(gallery, works);
        getCategorys();
        // on passe à la fonction les works pour pouvoir les filtrer
        displayCategorysButtons(filters, gallery, works);
    
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
    
        inputFile.addEventListener("change", () => {
            const file = inputFile.files[0];
            if (file) {
                const validTypes = ["image/jpeg", "image/jpg", "image/png"];
                if (!validTypes.includes(file.type)) {
                    alert("Le fichier doit être une image au format JPG, JPEG ou PNG.");
                    inputFile.value = ""; // Réinitialiser le champ de fichier
                    return;
                }

                if (file.size > 4 * 1024 * 1024) { // 4 Mo en octets
                    alert("La taille de l'image ne doit pas dépasser 4 Mo.");
                    inputFile.value = ""; // Réinitialiser le champ de fichier
                    return;
                }
        
                const reader = new FileReader();
                reader.onload = function (e) {
                    previewImg.src = e.target.result;
                    previewImg.style.display = "flex";
                    labelFile.style.display = "none";
                    inconFile.style.display = "none";
                    pFile.style.display = "none";
                };
                reader.readAsDataURL(file);
            }
        });
        
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




