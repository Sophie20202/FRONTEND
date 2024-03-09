
let link = "https://backend-jdw6.onrender.com/greet/v1/contact"
function validateForm(event) {
  event.preventDefault();

  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;
  console.log(name, email,message);
  fetch(link, {
    method: "GET", body: JSON.stringify({ name, email,message})
  })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      if(data){
        localStorage.setItem(data)
        window.location.href="adminpanel.html";  
      }else{
        alert(data.message)
      }
    })
    .catch(error => console.log(error))
  
}
//   function validateForm(event) {
//     event.preventDefault();

//   var name = document.getElementById("name").value;
//   var email = document.getElementById("email").value;
//   var message = document.getElementById("message").value;
//   var errorMessage = document.getElementById("messageError");
//   errorMessage.style.padding= "10px";

//   if (name === ""){
//     // alert ("All fields are required");
//     errorMessage.innerHTML ="Name  can not be blank";
//     return false;
//   }

//   if (email===""||email.length<6) {
//     alert("please enter a valid email address");
//     return false;
//   }
//   if (message.length <=20) {
//     errorMessage.innerHTML = "Message can not be less than 20 character";
//     return false;
//   }
//   alert("form submitted successfully")
//   return true;
// }
//   // If all validations pass, save data to local storage
//   var contactData = {
//     name:name,
//     email: email,
//     message: message,
//   };

  // // Convert the data to a JSON string and save it to local storage
  // var storeblog=JSON.parse(localStorage.getItem("articles")) || [];
  // storeblogtoreblog.push("contactData")

  // window.localStorage.setItem("articles", JSON.stringify(artticles));
  // // processImage(contactData.id,inputvalue)

  // // You can add code to display a success message or redirect the user here
  // console.log("Form submitted successfully");
  
