


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
