document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("id");
  fetch(`https://backend-jdw6.onrender.com/greet/v1/blog/${id}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      const blogContainer = document.getElementById("blog");
      blogContainer.innerHTML = `
          <div class="content">
              <h2>${data.data.title}</h2>
              <img src="${data.data.image}">
              <p>${data.data.message}</p>
              
          </div>
          `;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const id = new URLSearchParams(window.location.search).get("id");
  const commentsContainer = document.querySelector("#comments .display");
  fetch(`https://backend-jdw6.onrender.com/greet/v1/comment`, {
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
});

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
