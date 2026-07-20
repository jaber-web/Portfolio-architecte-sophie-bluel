const gallery = document.querySelector(".gallery");
console.log("gallery");

const portfolio = document.querySelector("#portfolio");

let works = [];

function displayWorks(works) {
     gallery.innerHTML = "";
      works.forEach((work)=> {

         const figure = document.createElement("figure");
         const img = document.createElement("img");
         const figcaption = document.createElement("figcaption");

         img.src = work.imageUrl;
         figcaption.textContent = work.title;

         figure.appendChild(img);
         figure.appendChild(figcaption);

         gallery.appendChild(figure);
        
        });

};


fetch("http://localhost:5678/api/works")
  .then((response) => {
     console.log(response);
     return response.json();
   })

    .then((data) => {
        works = data;

      displayWorks(works);
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

       portfolio.insertBefore(filters, gallery);

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