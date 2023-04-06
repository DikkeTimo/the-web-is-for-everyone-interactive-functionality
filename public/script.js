const button = document.getElementById("goal");
const form = document.querySelector("form");
const footer = document.querySelector("footer");

button.addEventListener("click", () => {
  form.classList.toggle("visibile");
});

let add = document.getElementById("add-player");
let formAdd = document.querySelector("add-players");

// add.addEventListener("click", () => {
//   formAdd.classList.toggle("add-visibile");
// });

setTimeout("window.location.reload();", 10000);
