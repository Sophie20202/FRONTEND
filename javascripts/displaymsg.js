fetch("https://backend-jdw6.onrender.com/api/contacts")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((blogDataArray) => {
    console.log(blogDataArray);

    const blogContainer = document.getElementById("Inspire");
    blogDataArray.data.forEach((object) => {
      const blogElement = document.createElement("div");
      blogElement.classList.add("blog");
      blogElement.innerHTML = `
        <div class="content">
            <h2>${object.name}</h2>
            <p>${object.email}</p>
            <p>${object.message}</p>
        </div>
        `;
      blogContainer.appendChild(blogElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
