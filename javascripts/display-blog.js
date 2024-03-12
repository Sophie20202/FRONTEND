const dislike=document.getElementById("dislike-btn")
const like=document.getElementById("like-btn")
dislike.setAttribute("disabled","")
const id = new URLSearchParams(window.location.search).get("id");


document.addEventListener("DOMContentLoaded", () => {
  fetch(`https://backend-jdw6.onrender.com/greet/v1/blog/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data.data)
      const blogContainer = document.getElementById("blog");
      blogContainer.innerHTML = `
          <div class="content">
              <h2>${data.data.title}</h2>
              <img src="${data.data.picture}">
              <p>${data.data.message}</p>
              
          </div>
          `;

    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});


// document.addEventListener("DOMContentLoaded", 
  const blogcomment=async() => {
  const id = new URLSearchParams(window.location.search).get("id");
  const commentsContainer = document.querySelector("#comments .display");
  await  fetch(`https://backend-jdw6.onrender.com/greet/v1/comment/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      commentsContainer.innerHTML = "";
      console.log(data)
      data.data.forEach((comment) => {
        const commentElement = document.createElement("div");
        commentElement.classList.add("comment");
        commentElement.innerHTML = `
            <p>${comment.message}</p>
            `;
        commentsContainer.appendChild(commentElement);
      });
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
    });
};
blogcomment()

const countlikes=async() => {
  const id = new URLSearchParams(window.location.search).get("id");
  const commentsContainer = document.querySelector("#comments .display");
  await  fetch(`https://backend-jdw6.onrender.com/greet/v1/likes/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
  
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
document.getElementById("like-count").innerText=data.Total_like
    })
    .catch((error) => {
      console.error("Error counting likes:", error);
    });
};
countlikes()

const createlikes=async() => {
  const id = new URLSearchParams(window.location.search).get("id");
  like.setAttribute("disabled","")
  dislike.removeAttribute("disabled")
  localStorage.setItem("bloglike",JSON.stringify(id))
  const commentsContainer = document.querySelector("#comments .display");
  await  fetch(`https://backend-jdw6.onrender.com/greet/v1/likes/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
  
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
      countlikes()
    })
    .catch((error) => {
      console.error("Error creating likes", error);
    });
};

const createdislikes=async() => {
  const id = new URLSearchParams(window.location.search).get("id");
  like.removeAttribute("disabled","")
  dislike.setAttribute("disabled","")
  localStorage.removeItem("bloglike",JSON.stringify(id))
  const commentsContainer = document.querySelector("#comments .display");
  await  fetch(`https://backend-jdw6.onrender.com/greet/v1/likes/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
  
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data)
      countlikes()
    })
    .catch((error) => {
      console.error("Error creating dislikes", error);
    });
};


document.getElementById("comment-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const message = document.getElementById("comment").value;
  const id = new URLSearchParams(window.location.search).get("id");
  fetch(`https://backend-jdw6.onrender.com/greet/v1/comment/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ message, blogId: id}),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      document.getElementById("comment-form").reset();
      const commentsContainer = document.querySelector("#comments .display");
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = `
            <p>${message}</p>
            `;
      commentsContainer.appendChild(commentElement);
    })
    .catch((error) => {
      console.error("Error adding comment:", error);
    });
});
//This codes handles like and dislike
const likeStorage=JSON.parse(localStorage.getItem("bloglike"))
if(likeStorage==id){
   like.setAttribute("disabled","");
  dislike.removeAttribute("disabled",);
}
