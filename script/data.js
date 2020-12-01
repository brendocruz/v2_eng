let fragment = document.location.search;
fragment = decodeURI(fragment.substring(1, fragment.length));
let type = document.location.hash;
type = decodeURI(type.substring(1, type.length));
let user = objectToClass(JSON.parse(fragment), type);

//console.log(JSON.parse(fragment));
//console.log(type);

function objectToClass(object, type) {
	let newObject;
	if(type === "aluno")
		newObject = new Aluno(object.nomeDeUsuario, object.senha);
	else if(type === "professor")
		newObject = new Professor(object.nomeDeUsuario, object.senha);
	else console.log(1);

	for(let property in object)
		newObject[property] = object[property];
	return newObject;
}

let anchors = document.querySelectorAll("a");
for(let element of anchors) {
	element.onclick = function() {
		let link = decodeURI(event.target.href);
		link = link.concat("?", JSON.stringify(user), "#", type);
		document.location.assign(link);
		return false;
	}
}