var createUserButton = document.getElementById("createUserSubmit");
var username = document.getElementById("username");
var password = document.getElementById("password");
var email = document.getElementById("email");
var form = document.getElementById("userCreationForm");

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
});

//////MUST BE TESTED WITH AN ENDPOINT LATER/////
async function sendUserToBackend (username, password, email) {
  url = null;
  console.log('attempting to send user to backend');
  const data = { Username: username, Email:email, Password: password }
  fetch('endpoint-here', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'no-cors', //POSSIBLE FIX TO CORS ERROR I HAD BEFORE?
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      Console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}


createUserButton.addEventListener('click', sendUserToBackend(username, password, email));