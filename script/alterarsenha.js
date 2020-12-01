function changePassword() {
	let oldPassword = document.getElementsByName("oldPassword")[0].value;
	let newPassword = document.getElementsByName("newPassword")[0].value;
	let newPasswordAgain = document.getElementsByName("newPasswordAgain")[0].value;
	if(oldPassword === "" || newPassword === "" || newPasswordAgain === "")
		return alert("Preencha todos os campos.");		
	if(oldPassword !== user.senha)
		return alert("Senha ínvalida");
	if(newPassword !== newPasswordAgain)
		return alert("Senhas não correspondem");
	user.alterarSenha(newPassword);
	alert("Senha alterada com sucesso.");
}