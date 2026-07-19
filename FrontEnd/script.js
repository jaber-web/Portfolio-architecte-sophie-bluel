const gallery = document.querySelector(".gallery");
console.log("gallery");

fetch("http://localhost:5678/api/works")
  .then((response) => {
    console.log(response);
    return response.json();
  })

  .then((works) => {

     gallery.innerHTML = "";
      works.forEach((work)=> {
         console.log(work);

         const figure = document.createElement("figure");
         const img = document.createElement("img");
         const figcaption = document.createElement("figcaption");

         img.src = work.imageUrl;
         figcaption.textContent = work.title;

         figure.appendChild(img);
         figure.appendChild(figcaption);

         gallery.appendChild(figure);
        
        });
   });
