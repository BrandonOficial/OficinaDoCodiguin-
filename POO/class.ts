// A nossa "planta" do Carro agora em TypeScript!
class Carro {
  // ATRIBUTOS: Aqui escrevemos o nome da variável seguido do tipo.
  // Detalhe: em TS, os tipos primitivos são com letra minúscula (string, number, boolean)
  marca: string;
  modelo: string;
  cor: string;
  ano: number;
  ligado: boolean;

  // CONSTRUTOR E O CONTRATO FLEXÍVEL:
  // Temos apenas UM construtor. Para permitir que o cliente compre o carro
  // só com marca e modelo, nós colocamos "= 2024" e "= 'Branco'" direto no parâmetro.
  // Isso significa: "Se não me passarem o ano e a cor, eu preencho com esses valores padrão".
  constructor(
    marcaEscolhida: string,
    modeloEscolhido: string,
    anoEscolhido: number = 2024,
    corEscolhida: string = "Branco",
  ) {
    this.marca = marcaEscolhida;
    this.modelo = modeloEscolhido;
    this.ano = anoEscolhido;
    this.cor = corEscolhida;
    this.ligado = false; // Todo carro sai da fábrica desligado
  }

  // MÉTODO 1: Ligar o carro
  // O ': void' avisa que o método não devolve nenhum dado, só executa a ação.
  ligar(): void {
    if (this.ligado === true) {
      console.log("O carro já está ligado!");
    } else {
      this.ligado = true;
      // No TS usamos as crases (Template Strings) para injetar variáveis no texto
      // Fica muito mais limpo que o "+" do Java!
      console.log(`Vrummm! O ${this.modelo} ligou.`);
    }
  }

  // MÉ MÉTODO 2: Acelerar
  acelerar(): void {
    if (this.ligado === true) {
      console.log("Pisando fundo no acelerador!");
    } else {
      console.log("Não dá pra acelerar, o carro está desligado, amigão.");
    }
  }
}

// CONSTRUINDO OS OBJETOS!

// Usando o Contrato 1: Passamos só o obrigatório (marca e modelo)
// O TypeScript automaticamente preenche o ano com 2024 e a cor com "Branco".
const meuCarro = new Carro("Toyota", "Corolla");

// Usando o Contrato 2: Passamos todos os parâmetros para um carro personalizado.
const carroDoBatman = new Carro("WayneTech", "Batmóvel", 2020, "Preto");

// USANDO OS MÉTODOS
meuCarro.acelerar(); // Não dá pra acelerar, o carro está desligado, amigão.

meuCarro.ligar(); // Vrummm! O Corolla ligou.
meuCarro.acelerar(); // Pisando fundo no acelerador!

carroDoBatman.ligar(); // Vrummm! O Batmóvel ligou.
