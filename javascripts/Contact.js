
const message = document.getElementById('form')
message.addEventListener("submit", (e)=>{
    e.preventDefault();
messageData()
})
function validateForm() {
    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let message = document.getElementById('message').value;
    const messages = {
        name,
        email,
        message
    }
    console.log(messages)
    const api = `https://backend-jdw6.onrender.com/api/contacts/messages`
    const postman = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(messages)
    };
    fetch(api,postman)
    .then(response=>{
        console.log(response.status)
        document.getElementById("form").reset();
        return response.json()
    })
    .then((data)=>{
        
        alert(data.message)
    })

}

