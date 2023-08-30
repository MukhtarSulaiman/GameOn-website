
// ------------------- Form Inputs ----------------------------
const form = document.getElementById("form");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const birthDate = document.getElementById("birthDate");
const quantity = document.getElementById("quantity");

const locations = document.getElementsByName("location");
const terms = document.querySelectorAll('.checkbox-input[name="terms"]');

// Trigger form's submission 
form.addEventListener("submit", (e) => {
    e.preventDefault();

    checkInputs();
});


// Checks form input values
function checkInputs() {
	//get the values from the inputs
	const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
	const emailValue = email.value.trim();
	const birthDateValue = birthDate.value.trim();
	const quantityValue = quantity.value.trim();

    let locationValue =  null;

	// Gets the selected value of a radio button
	for (let i = 0; i < locations.length; i++) {
		if (locations[i].checked) {
			locationValue = locations[i].value;
			break;
		}
	}

	// Gets the checked values of checkboxes
	const termsValues = Array.from(terms)
		.filter(term => term.checked)
		.map(item => item.value);


     // First name validation
	if (firstNameValue === "") {
		// show error & add error class
		setErrorFor(firstName, "Nom est requis !");
	} else if (!isLetters(firstNameValue)) {
		setErrorFor(firstName, 'Prénom doit contenir uniquement des lettres !');
	} else if (firstNameValue.length < 2) {
		setErrorFor(firstName, 'Prénom doit contenir au moins 2 lettres !');
	} else {
		setSuccessFor(firstName);
	}

     // Last name validation
    if (lastNameValue === "") {
		setErrorFor(lastName, "Nom est requis !");
	} else if (!isLetters(lastNameValue)) {
		setErrorFor(lastName,'Nom doit contenir uniquement des lettres !');
	} else if (lastNameValue.length < 2) {
		setErrorFor(lastName, 'Nom doit contenir au moins 2 lettres !');
	} else {
		setSuccessFor(lastName);
	}

     // Email validation
	if (emailValue === "") {
		setErrorFor(email, "E-mail est requis !");
	} else if (!isEmail(emailValue)) {
		setErrorFor(email, "E-mail n'est pas valide !");
	} else {
		setSuccessFor(email);
	}

     // Birth date validation
	if (birthDateValue === "") {
		setErrorFor(birthDate, "Date de naissance est requis !");
	} else {
		setSuccessFor(birthDate);
	}

    // Quantité validation
    if (quantityValue === '') {
		setErrorFor(quantity, "Quantité est requis !");
	} else {
		setSuccessFor(quantity);
	}

	// Radio buttons validation
    if (locationValue === "" || locationValue === null) {
		setErrorFor(locations.item(1), "Sélectionnez le lieu de tournoi !");
	} else {
		setSuccessFor(locations.item(1));
	}

	// Checkboxes validation
    if (termsValues[0] !== 'acceptedTerm' || termsValues[0] === undefined) {
		setErrorFor(terms[0], "Vous devez accepter les termes et conditions");
	} else {
		setSuccessFor(terms[0]);
	}


	const errorMessages = document.querySelectorAll('.form-group>small, .form-groups>small');
	// Checks error input states
	const notErrorMessages = Array.from(errorMessages).every(err => err.innerText === "");
	
	if(notErrorMessages) {
		const formData = {
			firstNameValue, 
			lastNameValue, 
			emailValue, 
			birthDateValue, 
			quantityValue, 
			locationValue, 
			termsValues 
		};

		saveFormDataAndShowAlert(formData);
	} 
}


// Sets error messages for all inputs
function setErrorFor(input, message) {
	const formGroup = input.parentElement; //form-group
	const small = formGroup.querySelector("small");

	small.innerText = message; 	// add error message

	if(formGroup.classList.contains('form-group')) formGroup.className = "form-group error";

	else if(formGroup.classList.contains('form-groups')) formGroup.className = "form-groups error";
}

// Sets success states for all inputs
function setSuccessFor(input) {
	const formGroup = input.parentElement;

	if(formGroup.classList.contains('form-group')) {
		formGroup.className = "form-group success";
	} else if(formGroup.classList.contains('form-groups')) formGroup.className = "form-groups success";
}

// Checks if the user's input is of letter type
function isLetters(letter) {
	return /[a-zA-Z-âãäåæçèéêëìíîïðñòóôõøùúûüýþÿ]/.test(letter);
}

// Matches valide email 
function isEmail(email) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}


const heroSection = document.querySelector(".hero-section-bg");
const alertMessage =  document.querySelector('.container');

// Safes form data and shows a confirmation message
function saveFormDataAndShowAlert(formData) {
	// console.log(formData) // Data that will be send it to the server !
	
	setTimeout(() =>{ 
		Array.from(document.querySelectorAll('.form-group')).map(formGroup => formGroup.classList.remove('success'));
		form.reset();
			
		heroSection.style.display = "none";
		alertMessage.style.display = 'flex';
	}, 500);
};


// Trigger click envent on homburger menu 
document.querySelector(".edit-nav").addEventListener("click", editNav);
// Modifies header classes
function editNav() {
	const x = document.getElementById("headerSection");
	if (x.className === "header") {
		x.className += " responsive";
	} else {
		x.className = "header";
	}
}


const modalBtn = document.querySelectorAll(".modal-btn");
const closeModalBtns = document.querySelectorAll(".close-modal-btn");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", openModal));
closeModalBtns.forEach((btn) => btn.addEventListener("click", closeModal));

// open modal form
function openModal() {
	heroSection.style.display = "block";
}

// Trigger modal closing event
document.querySelector(".close-alert-btn").addEventListener("click", closeModal);
// close modal form
function closeModal() {
	alertMessage.style.display = 'none';
	heroSection.style.display = "none";
}