var email = document.getElementById("email");
var createUserButton = document.getElementById("createUserSubmit");

createUserButton.onclick = function() {
  console.log("createUserButton.onclick");
  if (email.value.includes("@" && ".")) {
    console.log("email is valid");
  } else {
    alert("Email is not valid");
  }
}

