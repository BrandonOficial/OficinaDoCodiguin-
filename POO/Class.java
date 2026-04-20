// Aqui a gente cria a "planta" do nosso Carro
public class Carro {
    
    // ATRIBUTOS: São as variáveis que guardam as características.
    // Usamos 'String' para textos e 'int' para números inteiros.
    String marca;
    String modelo;
    String cor;
    int ano;
    boolean ligado; // Guarda verdadeiro ou falso (se o carro tá ligado ou não)
    
    // CONTRATO 1: O cliente só quer passar marca e modelo.
    // A gente assume que a cor padrão é "Branco" e o ano é o atual.
    public Carro(String marcaEscolhida, String modeloEscolhido) {
        this.marca = marcaEscolhida;
        this.modelo = modeloEscolhido;
        this.cor = "Branco"; 
        this.ano = 2024;
    }

    // CONTRATO 2: O cliente quer personalizar tudo logo de cara!
    public Carro(String marcaEscolhida, String modeloEscolhido, int anoEscolhido, String corEscolhida) {
        this.marca = marcaEscolhida;
        this.modelo = modeloEscolhido;
        this.ano = anoEscolhido;
        this.cor = corEscolhida;
    }

    // MÉTODO 1: Ligar o carro
    // 'void' significa que esse método não devolve nenhuma resposta, ele só faz a ação.
    public void ligar() {
        if (this.ligado == true) {
            System.out.println("O carro já está ligado!");
        } else {
            this.ligado = true;
            System.out.println("Vrummm! O " + this.modelo + " ligou.");
        }
    }

    // MÉTODO 2: Acelerar
    public void acelerar() {
        if (this.ligado == true) {
            System.out.println("Pisando fundo no acelerador!");
        } else {
            System.out.println("Não dá pra acelerar, o carro está desligado, amigão.");
        }
    }
}

public class Fabrica {
    public static void main(String[] args) {
        
        // Construindo o OBJETO! 
        // Aqui chamamos aquele Construtor que criamos lá em cima.
        Carro meuCarro = new Carro("Toyota", "Corolla");
        Carro carroDoBatman = new Carro("WayneTech", "Batmóvel");

        // Usando os MÉTODOS (mandando os carros fazerem coisas)
        meuCarro.acelerar(); // Vai dar erro, pois está desligado!
        
        meuCarro.ligar();    // Vrummm! O Corolla ligou.
        meuCarro.acelerar(); // Pisando fundo no acelerador!

        carroDoBatman.ligar(); // Vrummm! O Batmóvel ligou.
    }
}