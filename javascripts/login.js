let link = "https://backend-jdw6.onrender.com/greet/v1/users/login"
function validateForm(event) {
  event.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  console.log(password, email);
  fetch(link, {
    method: "POST", headers: {
      "Content-Type": "application/json",

    }, body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data.token){
        localStorage.setItem("token",data.token)
        window.location.href="adminpanel.html";  
      }else{
        alert(data.message)
      }
    })
    .catch(error => console.log(error))
  
}