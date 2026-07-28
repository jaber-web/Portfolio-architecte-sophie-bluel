
const galleryView = document.getElementById("gallery-view");
const addPhotoView = document.getElementById("add-photo-view");
const addPhotoButton = document.getElementById("add-photo");
const backButton = document.getElementById("back-button");
const categorySelect = document.getElementById("category");
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

    modal.addEventListener("click", (event) => {

        console.log("Clique sur :", event.target);

        if (event.target === modal) {
            console.log("Je ferme la modale");
            modal.classList.add("hidden");
        }

    });

    addPhotoButton.addEventListener("click", () => {
        galleryView.classList.add("hidden");
        addPhotoView.classList.remove("hidden");
    });

    backButton.addEventListener("click", () => {
        addPhotoView.classList.add("hidden");
        galleryView.classList.remove("hidden");
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

    console.log("displayWorks appelée");
    console.log(works);
    console.log(gallery);

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


function displayModalGallery(worksList) {

    const modalGallery = document.querySelector(".modal-gallery");

    modalGallery.innerHTML = "";

    worksList.forEach((work) => {

        const figure = document.createElement("figure");

         const img = document.createElement("img");
         img.src = work.imageUrl;
         img.alt = work.title;

         const trash = document.createElement("i");
         trash.classList.add("fa-solid", "fa-trash-can");
         trash.dataset.id = work.id;

            trash.addEventListener("click", () => {

               fetch(`http://localhost:5678/api/works/${trash.dataset.id}`, {
                method: "DELETE",
               headers: {
                Authorization: `Bearer ${token}`
            }
    })

   .then((response) => {
      console.log(response);

       if (response.ok) {
         console.log("Projet supprimé !");

         works = works.filter(work => work.id != trash.dataset.id);

         displayWorks(works);
         displayModalGallery(works);

        } else {
              console.log("Erreur de suppression");
            }
    })

    .catch((error) => {
        console.error(error);
    });

    });
         console.log(work.id);

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

    console.log("Nombre de projets :", works.length);
    console.log(works);

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

    const option = document.createElement("option");
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);

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