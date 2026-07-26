const loginForm = document.querySelector("#login form");

const gallery = document.querySelector(".gallery");
console.log("gallery");

const portfolio = document.querySelector("#portfolio");

let works = [];
const token = localStorage.getItem("token");

if (token) {

    const editMode = document.createElement("div");
    editMode.classList.add("edit-mode");
    editMode.innerHTML = `
        <i class="fa-regular fa-pen-to-square"></i>
        Mode édition
    `;

    document.body.prepend(editMode);
}

const loginLink = document.getElementById("login-link");

const editProject = document.getElementById("edit-project");
const modal = document.getElementById("modal");
const closeModal = document.querySelector(".close");

if (token) {

    editProject.addEventListener("click", () => {
        modal.classList.remove("hidden");
    });

    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

}

if (token) {
    loginLink.textContent = "logout";
    loginLink.href = "#";
}
if (token) {
    loginLink.addEventListener("click", (event) => {
      console.log("Logout cliqué");
    event.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    window.location.href = "index.html";
});
}

if (token) {
    console.log("Utilisateur connecté");
} else {
    console.log("Utilisateur non connecté");
}


function displayWorks(works) {

    gallery.innerHTML = "";

    works.forEach((work) => {

        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        img.src = work.imageUrl;
        img.alt = work.title;
        figcaption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);

        gallery.appendChild(figure);

    });

}

function displayModalGallery(works) {

    const modalGallery = document.querySelector(".modal-gallery");

    modalGallery.innerHTML = "";

    works.forEach((work) => {

        const figure = document.createElement("figure");

         const img = document.createElement("img");
         img.src = work.imageUrl;
         img.alt = work.title;

         const trash = document.createElement("i");
         trash.classList.add("fa-solid", "fa-trash-can");

         figure.appendChild(img);
         figure.appendChild(trash);

         modalGallery.appendChild(figure);

    });

}

fetch("http://localhost:5678/api/works")
  .then((response) => {
     console.log(response);
     return response.json();
   })

.then((data) => {
    works = data;

    displayWorks(works);

    displayModalGallery(works);
});

fetch("http://localhost:5678/api/categories")
    .then((response) => {
        return response.json();
    })

   .then((categories) => {
        console.log(categories);

        const filters = document.createElement("div");
        filters.classList.add("filters");

        const button = document.createElement("button");
        button.textContent = "Tous" ;

        button.addEventListener("click", () => {
        displayWorks(works);
        });

        filters.appendChild(button);

       if (!token) {
    portfolio.insertBefore(filters, gallery);
}

          categories.forEach((category) => {

            const button = document.createElement("button");

            button.textContent = category.name;
            button.dataset.id = category.id;

              button.addEventListener("click", () => {

                const filteredWorks = works.filter((work) => {
                  return work.categoryId === category.id;
               });

               displayWorks(filteredWorks);
             });

               filters.appendChild(button);
           });

        
});