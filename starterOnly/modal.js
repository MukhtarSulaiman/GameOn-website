function editNav() {
  var x = document.getElementById("headerSection");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".hero-section-bg");
const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtn = document.querySelector("#closeModalBtn");
const formGroup = document.querySelectorAll(".form-group");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", openModal));
closeModalBtn.addEventListener('click', closeModal);

// open modal form
function openModal() {
  modalbg.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}


