var loginButton = document.getElementById("loginSubmit");
var username = document.getElementById("username");
var password = document.getElementById("password");
var form = document.getElementById("loginForm");

form.addEventListener('submit', (ev) => {
  ev.preventDefault();
});

/////MUST BE TESTED WITH AN ENDPOINT LATER/////
let customerInfo = {};
loginButton.addEventListener("click", async () => {
  console.log("attempting to send user to backend");
  const data = { 
      Username: username.value.toString(),
     Password: password.value.toString()};
  await fetch("http://localhost:8888/auth-service/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      localStorage.setItem("token", data.token);
      console.log(isLoggedIn());
      if (isLoggedIn() === true) {
        customerInfo = { username: data.username, email: data.email, token: data.token};
        localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
        window.location.href = "Catalog.html";
      }
      else {
        alert("Incorrect email or password");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

function isLoggedIn() {
  console.log("checking if user is logged in");
  console.log(localStorage.getItem("token"));
  const token = localStorage.getItem("token");
  if (token === null) return false;
  return true;
}

