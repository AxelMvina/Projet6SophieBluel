

const gallery = document.querySelector('div.gallery');

// appel du tableau backend
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const responseJson = await response.json();
    console.log(responseJson);
    return responseJson;
}

getWorks();


// affichage des works
async function affichageWorks() {
    const arrayWorks = await getWorks();
    arrayWorks.forEach(work => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = work.imageUrl;
        const figcaption = document.createElement('figcaption');
        figcaption.textContent = work.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

affichageWorks();

