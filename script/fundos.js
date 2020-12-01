let fundHistoryElt = document.querySelector(".container-funds-history");
let userFund = document.querySelector(".user-funds");
userFund.innerHTML = `R\$${user.fundos}`;
showHistory();


function showHistory() {
	fundHistoryElt.innerHTML = "";
	let div, first, second;
	div = document.createElement("div");
	div.className = "history-item";
	first = document.createElement("span");
	first.className = "history-header";
	first.innerHTML = "status";
	second = document.createElement("span");
	second.className = "history-header";
	second.innerHTML = "valor";
	div.append(first);
	div.append(second);
	fundHistoryElt.append(div);

	for(item of user.historicoDePedidos) {
		div = document.createElement("div");
		div.className = "history-item";
		first = document.createElement("span");
		first.innerHTML = item.status;
		second = document.createElement("span");
		second.innerHTML = `R\$ ${item.valor}`;
		div.append(first);
		div.append(second);
		fundHistoryElt.append(div);
	}
}

function addFunds() {
	let inputContent = document.getElementsByName("value")[0].value;
	let valueMoney = Number(inputContent);
	user.adicionarFundos(valueMoney);
	showHistory();
	userFund.innerHTML = `R\$${user.fundos}`;
}