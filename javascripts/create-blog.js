window.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("articleForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let blogImage =  processImage(fileInput);
    var title = document.getElementById("title").value;
    var articleContent = document.getElementById("articleContent").value;
    var fileInput = document.getElementById("picture");

    const create = new FormData();
    create.append("title", title);
    create.append("message", articleContent);
    create.append("image", fileInput.files[0]);
    create.append("blogImage",blogImage )

    fetch("https://backend-jdw6.onrender.com/greet/v1/blog", {
      method: "POST",
      headers: {
        "auth-token": `${localStorage.getItem("token")}`,
      },
      body: create,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        window.location.href = "adminpanel.html";
      });
  });
  const processImage = (input) => {
    return new Promise((resolve, reject) => {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                resolve(e.target.result);
            };
            reader.readAsDataURL(input.files[0]);
        } else {
            reject("No file selected");
        }
    });
};
  
});
