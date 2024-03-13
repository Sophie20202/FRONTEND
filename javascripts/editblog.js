function update() {
  const id = new URLSearchParams(window.location.search).get("id");
  const title = document.getElementById("title");
  const articleContent = document.getElementById("articleContent");
  const image = document.getElementById("picture");

  const update = new FormData();
  update.append("title", title.value);
  update.append("message", articleContent.value);

  if (image.files.length > 0) {
    update.append("image", image.files[0]);
  }

  fetch(`https://backend-jdw6.onrender.com/api/blogs/${id}`, {
    method: "PUT",
    headers: {
      'auth-token': `${localStorage.getItem("token")}`,
    },
    body: update,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      window.location.href = "adminpanel.html";
    })
    .catch((error) => console.log(error));
}

window.addEventListener("DOMContentLoaded", function () {
  const id = new URLSearchParams(window.location.search).get("id");
  const articles = JSON.parse(localStorage.getItem("articles")) || [];
  const article = articles.find((f) => f._id == id);

  if (!article) {
    alert("Article not found");
    this.history.back();
  }

  document.getElementById("title").value = article.title;
  document.getElementById("articleContent").value = article.message;

  document.getElementById("articleForm").addEventListener("submit", function (event) {
    event.preventDefault();
    update();
  });
});
