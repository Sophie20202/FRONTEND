fetch("https://backend-jdw6.onrender.com/api/blogs")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((blogDataArray) => {
    const blogContainer = document.getElementById("Inspire");
    blogDataArray.data.forEach((object) => {
      const blogElement = document.createElement("div");
      blogElement.classList.add("blog");

      const action = document.createElement("div");
      action.classList.add("actions");
      const readButton = document.createElement("button");
      readButton.classList.add("btn", "btn-primary");
      readButton.textContent = "Read More";
      readButton.addEventListener("click", () => {
        window.location.href = `view-blog.html?id=${object._id}`;
      });
      action.appendChild(readButton);

      blogElement.innerHTML = `
        <div class="content">
            <h2>${object.title}</h2>
        </div>
        `;
      blogElement.appendChild(action);
      blogContainer.appendChild(blogElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
