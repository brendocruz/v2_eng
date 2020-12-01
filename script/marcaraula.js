let professor1 = new Professor("Layton", "_nada_");
let professor2 = new Professor("Yoda", "_nada_");

let profile = document.querySelectorAll(".profile");
for(let element of profile) {
	element.addEventListener("click", function() {
		for(let elt of profile)
			elt.removeAttribute("data-selected");
		event.currentTarget.toggleAttribute("data-selected");
	}, false);
}

function marcarAula() {
	let elt = document.querySelector("[data-selected]");
	let professor;
	if(elt.getAttribute("data-nome") === "layton")
		professor = professor1;
	else if(elt.getAttribute("data-nome") === "yoda")
		professor = professor2;
	user.marcarAulas(professor, new Date(), 60);
}