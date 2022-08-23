console.log('login.js');

var loginButton = document.getElementById('loginSubmit');

async function sendLogintoBackend (email, password) {
  const data = { username: 'example' };

  fetch('https://example.com/profile', {
    method: 'POST', // or 'PUT'
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  
  const { token } = response.body

  const customerInfo = {
    "username": "exampelusername"
  }
  
  localStorage.setItem('token', token)
  if (isLoggedIn === true) {
    
    window.location.href = 'Catalog.html'
  }
  else{
    alert('Incorrect email or password')
  }

}

async function isLoggedIn () {
  const token = store.get('token')
  if (!token) return false
}


loginButton.addEventListener('click', basiclogin);