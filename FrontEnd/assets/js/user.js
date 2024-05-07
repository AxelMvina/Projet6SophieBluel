



// async function login(email,password,messageErreur,form) {
//     const users = await getUsers();
//     console.log(users);
//     form.addEventListener("submit", (e) => {
//       e.preventDefault();
//       const userEmail = email.value;
//       const userPwd = password.value;
//       console.log(userEmail, userPwd);
//       users.forEach((user) => {
//         // verifications
//         if (
//           user.email == userEmail &&
//           user.password == userPwd &&
//           user.admin == true
//         ) {
//           // si les conditions sont remplies on fait ça
//           window.sessionStorage.loged = true;
//           window.location.href = "../index.html";
//           // console.log("je suis conecté");
//         } else {
//           //message d'erreur
//           email.classList.add("inputErrorLogin");
//           password.classList.add("inputErrorLogin");
//           messageErreur.textContent =
//             "Votre email ou votre mot de passe est incorrect";
//         }
//       });
//     });
//   }
  

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
          console.log("je suis conecté");
        }
    })
    // prevenir l'utilisateur en cas d'erreur
    .catch(error => 
        console.log(error));

}