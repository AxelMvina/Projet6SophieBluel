// variable globale

window.addEventListener("load", (event) => {
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
    

})

