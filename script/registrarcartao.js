function registerCreditCard() {
	let fullName = document.getElementsByName("fullName")[0].value;
	let creditCardNumber = document.getElementsByName("creditCardNumber")[0].value;
	let creditCardCVV = document.getElementsByName("creditCardCVV")[0].value;
	if(fullName === "" || creditCardNumber === "" || creditCardCVV === "")
		return alert("Preencha todos os campos.");
	let creditCard = new CartaoDeCredito(fullName, creditCardNumber, creditCardCVV);
	user.cartaoDeCredito = creditCard;
	alert("Cartão Registrado com sucesso");
}