import { CLIAdapter } from "./Adapter";

// 1. A Entidade - Garante que os dados nascem e se mantêm válidos
class Patient {
  constructor(
    private readonly name: string,
    private readonly weight: number,
    private readonly height: number,
  ) {
    if (weight <= 0 || height <= 0) {
      throw new Error(
        "Erro: Peso e altura devem ser valores positivos maiores que zero.",
      );
    }
  }

  getWeight(): number {
    return this.weight;
  }
  getHeight(): number {
    return this.height;
  }
  getName(): string {
    return this.name;
  }
}

// 2. O Retorno Rico - Agrupa o resultado matemático com a regra de negócio
class BMIReport {
  constructor(
    public readonly patientName: string,
    public readonly score: number,
    public readonly category: string,
  ) {}
}

// 3. O Caso de Uso - Responsabilidade Única (Calcular e classificar)
class CalculateBMIUseCase {
  execute(patient: Patient): BMIReport {
    // Regra de negócio isolada da interface do shell
    const heightInMeters = patient.getHeight();
    const score = patient.getWeight() / (heightInMeters * heightInMeters);
    const roundedScore = parseFloat(score.toFixed(2));

    const category = this.categorize(roundedScore);

    return new BMIReport(patient.getName(), roundedScore, category);
  }

  // Método privado: o shell não precisa saber como a classificação é feita
  private categorize(score: number): string {
    if (score < 18.5) return "Abaixo do peso";
    if (score >= 18.5 && score < 24.9) return "Peso normal";
    if (score >= 25 && score < 29.9) return "Sobrepeso";
    return "Obesidade";
  }
}
// Importe as classes que criamos anteriormente
// import { Patient, CalculateBMIUseCase } from './domain';
// import { CLIAdapter } from './cli';

async function bootstrap() {
  const cli = new CLIAdapter();
  const calculateBMI = new CalculateBMIUseCase();

  console.log("===================================");
  console.log("   CLÍNICA SHELL - CÁLCULO DE IMC  ");
  console.log("===================================\n");

  try {
    // Graças ao nosso Adapter, o fluxo fica síncrono visualmente e muito limpo
    const name = await cli.ask("Qual é o nome do paciente?");
    const weightInput = await cli.ask("Qual é o peso (em kg)? (ex: 80.5)");
    const heightInput = await cli.ask(
      "Qual é a altura (em metros)? (ex: 1.75)",
    );

    // Convertendo os inputs do shell (que sempre vêm como string) para números
    const weight = parseFloat(weightInput);
    const height = parseFloat(heightInput);

    // 1. Tenta criar a Entidade (Ela se autovalida!)
    const patient = new Patient(name, weight, height);

    // 2. Executa a regra de negócio
    const report = calculateBMI.execute(patient);

    // 3. Devolve a resposta rica ao usuário
    console.log("\n-----------------------------------");
    console.log(`[RESULTADO] Paciente: ${report.patientName}`);
    console.log(`[RESULTADO] IMC: ${report.score}`);
    console.log(`[RESULTADO] Diagnóstico: ${report.category}`);
    console.log("-----------------------------------\n");
  } catch (error: any) {
    // Fail-fast: Se o Patient estourar o erro de peso negativo, cai direto aqui.
    console.error(`\n[FALHA NA OPERAÇÃO] ${error.message}\n`);
  } finally {
    // Garantindo que o processo do Node morra graciosamente, dê erro ou sucesso
    cli.close();
  }
}

// Inicia a aplicação
bootstrap();
