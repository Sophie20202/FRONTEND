// let link = "http://localhost:5000/greet/v1/comment"
// function validateForm(event) {
//   event.preventDefault();

// //   var email = document.getElementById("email").value;
//   var Comment = document.getElementById("message").value;
//   console.log(password, email);
//   fetch(link, {
//     method: "POST", headers: {
//       "Content-Type": "application/json",

//     }, body: JSON.stringify({Comment})
//   })
//     .then(res => res.json())
//     .then(data => {
//       console.log(data)
//       if(data.token){
//         localStorage.setItem("token",data.token)
//         // window.location.href="adminpanel.html";  
//       }else{
//         alert(data.message)
//       }
//     })
//     .catch(error => console.log(error))
// }
fetch('https://backend-jdw6.onrender.com/greet/v1/blog')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(blogDataArray => {
        console.log(blogDataArray)

        const blogContainer = document.getElementById('Inspire');
        blogDataArray.data.forEach(object => {
            const blogElement = document.createElement('div');
            blogElement.innerHTML = `
                        <div class="blog">
                            <div class="Inspiration">
                                <div class="paragraph">
                                    
                                    <p>${object.message}</p>
                                    
                                </div>
                                
                                <div class="photo">
                                </div>
                            </div> 
                        </div>
                        
                    `;
            blogContainer.appendChild(blogElement);
        });

    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });