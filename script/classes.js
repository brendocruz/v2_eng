class Usuario {
	constructor(nomeDeUsuario, senha) {
		this.nomeDeUsuario = nomeDeUsuario;
		this.senha = senha;
		this.aulasMarcadas = [];
		this.fundos = 0.0;
	}

	alterarSenha(newPassword) {
		this.senha = newPassword;
	}
}

class Aluno extends Usuario {
	constructor(nomeDeUsuario, senha) {
		super(nomeDeUsuario, senha);
		this.listaDeGrupos = [];
		this.historicoDePedidos = [];
		this.cartaoDeCredito = null;
	}

	adicionarFundos(value) {
		if(!this.cartaoDeCredito) return;
		let pedido = new PedidoDeposito(value);
		this.historicoDePedidos.push(pedido);
		pedido.despacharPedido();

		if(pedido.status === "APROVADO")
			this.fundos += value;
	}

	registrarCartaoDeCredito(cartaoDeCredito) {
		this.cartaoDeCredito = cartaoDeCredito;
	}

	marcarAulas(professor, horario, duracao) {
		if(professor.custoAula > this.fundos)
			return false;
		this.fundos -= professor.custoAula;
		let aula = new Aula(professor, horario, duracao, professor.custoAula);
		aula.adicionarParticipantes(this);
		this.aulasMarcadas.push(aula);
		professor.aulasMarcadas.push(aula);
	}

	desmarcarAulas(aula) {
		let index = this.aulasMarcadas.indexOf(aula);
		if(index !== -1)
			this.aulasMarcadas.splice(index, 1);
		let taxa = aula.professor.cobrarTaxa();
		this.fundos += taxa;
	}
}

class Professor extends Usuario {
	constructor(nomeDeUsuario, senha) {
		super(nomeDeUsuario, senha);
		this.custoAula = 10;
		this.taxa = 0.2;
		this.historicoDeSaques = [];
		this.contaBancaria = null;
	}

	registrarContaBancaria(contaBancaria) {
		this.contaBancaria = contaBancaria;
	}

	sacarFundos(value) {
		if(!this.contaBancaria) return;
		let pedido = new PedidoSaque(value, this);
		this.historicoDeSaques.push(pedido);
		pedido.despacharPedido();

		if(pedido.status === "APROVADO")
			this.fundos -= value;
	}

	calcularTaxa() {
		let valorTaxa = this.custoAula - this.custoAula * this.taxa;
		this.fundos -= valorTaxa;
		return valorTaxa;
	}
}

class Reuniao {
 	constructor() {
 		this.participantes = [];
 		this.gravacao;
 		this.duracao;
 	}

 	adicionarParticipantes(user) {
 		this.participantes.push(user);
 	}

 	gravarAula() {
 		Controller.GravarAula(this);
 	}

 	salvarGravacao() {
 		Controller.PararGravacao(this);
 		this.gravacao = Model.ObterIdGravacao(this);
 		this.duracao = Model.ObterGravacao(this.gravacao).duracao;
 	}
 }

class Aula extends Reuniao {
 	constructor(professor, horario, duracao, valor) {
 		super();
 		this.professor = professor;
 		this.horario = horario;
 		this.duracao = duracao;
 		this.valor = valor;
 	}

 	adicionarProfessor(professor) {
 		this.professor = professor;
 	}
}

class Controller {
	constructor() {}
	static GravarAula() {}
	static PararGravacao() {}
}

class Model {
	constructor() {}
	static ObterIdGravacao() { return "6784617284" }
}

class Pedido {
	constructor(valor) {
		this.valor = valor;
		this.status = "EM APROVAÇÃO";
	}

}

class PedidoSaque extends Pedido {
	constructor(valor) {
		super(valor);
	}

	despacharPedido(contaBancaria) {
		this.status = "APROVADO";
	}

}

class PedidoDeposito extends Pedido {
	constructor(valor) {
		super(valor);
	}

	despacharPedido(cartaoDeCredito) {
		this.status = "APROVADO";
	}

}

class CartaoDeCredito {
	constructor(nome, numero, cvv) {
		this.nome = nome;
		this.numero = numero;
		this.cvv = cvv;
	}
}

class ContaBancaria {
	constructor(nome, numero, agencia, banco) {
		this.nome = nome;
		this.numero = numero;
		this.agencia = agencia;
		this.banco = banco;
	}
}