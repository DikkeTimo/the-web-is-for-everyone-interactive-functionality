let button = document.getElementById("goal");
let form = document.querySelector("form");

button.addEventListener("click", () => {
  form.classList.toggle("visibile");
});

let add = document.getElementById("add-player");
let formAdd = document.querySelector("add-players");

add.addEventListener("click", () => {
  formAdd.classList.toggle("add-visibile");
});
