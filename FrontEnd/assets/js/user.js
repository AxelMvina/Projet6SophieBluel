
const email = document.getElementById("email");
const password = document.getElementById("password");
const submit = document.getElementById("submit");

// Au clic, on envoie les valeurs de connextion
submit.addEventListener("click", (e) => {
    e.preventDefault();
    let user = {
        email: email.value,
        password: password.value
    };
    login(user);
    console.log(user)
})

const form = document.querySelector("form");

function login(id) {
    
    console.log(id);
    
    // verification de l'email et du mot de passe
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(id)
    })
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(result => { 
        console.log(result);
        // Si couple email/mdp incorrect
        if (result.error || result.message) {
            const p = document.querySelector("p");
            p.innerHTML = "La combinaison e-mail/mot de passe est incorrecte";

        // Si couple email/mdp correct
        } else {
            window.sessionStorage.loged = true;
            window.location.href = "../index.html";
        }
    })
    // prevenir l'utilisateur en cas d'erreur
    .catch(error => 
        console.log(error));

}