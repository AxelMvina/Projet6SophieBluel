


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
}
