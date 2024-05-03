
const url = 'http://localhost:5678/api/users/login';


let user = {
    "email": "sophiebluel@gmail.com",
    "password": "photo"
}

const request = new Request(url, {
    method: "POST",
    body: user,
    headers: { "Content-Type": "application/json" }

});

fetch(request)
.then(function() {
    // Handle response you get from the server
});