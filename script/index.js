function createUser() {
	let userName = document.querySelector(".form-username");
	let password = document.querySelector(".form-password");
	let newUser = new Usuario(userName.value, password.value);
	document.location.assign(`html/principal.html?${JSON.stringify(newUser)}`);
}