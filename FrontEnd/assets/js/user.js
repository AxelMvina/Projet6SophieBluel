


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
            window.location.href = "../index.html";
            console.log(result)
            localStorage.setItem('token', result.token);
        }
    })
    // prevenir l'utilisateur en cas d'erreur
    .catch(error => 
        console.log(error));

}

// ajout de token si connecter
function isConnected() {
    let token = localStorage.getItem('token');
    if (token !== null) {
        return true;
    }
    else {
        return false
    }
}

// suppression du token deconnecter
function disconnected() {
    localStorage.removeItem('token');
}