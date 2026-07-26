const form = document.querySelector("form");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

const data = await response.json();

console.log(response.status);

if (response.ok) {
    console.log("Connexion réussie !");

    console.log(data);

    localStorage.setItem("token", data.token);
    localStorage.setItem("userId", data.userId);

    window.location.href = "index.html";

} else {
    console.log("Connexion échouée !");
    console.log(data);
}

});