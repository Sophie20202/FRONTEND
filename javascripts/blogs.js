function deleteBlog(id) {
  const confirmDelete = confirm("Are you sure you want to delete this blog?");
  if (!confirmDelete) {
    return;
  }
  fetch(`https://backend-jdw6.onrender.com/api/blog/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      location.reload();
    });
}

document.addEventListener("DOMContentLoaded", function () {
  fetch("https://backend-jdw6.onrender.com/api/blogs")
    .then((res) => res.json())
    .then((data) => {
      localStorage.setItem("articles", JSON.stringify(data.data));
      const blogContainer = document.getElementById("tbody");
      data.data.forEach((blog, i) => {
        const blogElement = document.createElement("tr");

        const editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-primary");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => {
          window.location.href = `editblog.html?id=${blog._id}`;
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => {
          deleteBlog(blog._id);
        });

        const action = document.createElement("td");
        action.appendChild(editButton);
        action.appendChild(deleteButton);

        const num = document.createElement("td");
        num.textContent = i + 1;

        const title = document.createElement("td");
        title.textContent = blog.title;

        blogElement.appendChild(num);
        blogElement.appendChild(title);
        blogElement.appendChild(action);
        blogContainer.appendChild(blogElement);
      });
    });
});
