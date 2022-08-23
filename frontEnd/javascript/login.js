var loginButton = document.getElementById("loginSubmit");
var username = document.getElementById("username");
var password = document.getElementById("password");

/////MUST BE TESTED WITH AN ENDPOINT LATER/////
let customerInfo = {};
async function sendLogintoBackend(username, password) {
  console.log("attempting to send user to backend");
  const data = { Username: username, Password: password };
  fetch("endpoint-here", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    mode: "no-cors", //POSSIBLE FIX TO CORS ERROR I HAD BEFORE?
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      localStorage.setItem("token", data.token);
      if (isLoggedIn === true) {
        customerInfo = { username: data.username, email: data.email };
        window.location.href = "Catalog.html";
      } else {
        alert("Incorrect email or password");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

async function isLoggedIn() {
  const token = store.get("token");
  if (!token) return false;
}

loginButton.addEventListener("click", sendLogintoBackend(username, password));
