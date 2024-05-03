
// async function getUsers() {
//     fetch(,{
//         method: 'post',
//         body:
//         header: 
//     })
// }






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
  