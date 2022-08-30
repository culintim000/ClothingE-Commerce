var createUserButton = document.getElementById("createUserSubmit");
var username = document.getElementById("username");
var password = document.getElementById("password");
var email = document.getElementById("email");
var form = document.getElementById("userCreationForm");



console.log('createUser.js loaded');

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
});




//////MUST BE TESTED WITH AN ENDPOINT LATER/////
createUserButton.onclick = function () {

}


createUserButton.addEventListener("click", function () {
  console.log('attempting to send user to backend');
  const data = {
    Username: username.value.toString(),
    Email: email.value.toString(),
    Password: password.value.toString(),
  }
  console.log(JSON.stringify(data));

  var response = "";
  fetch('http://localhost:8888/auth-service/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    //mode: 'no-cors',
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      window.location.href = 'Login.html';
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    console.log(response)

});

