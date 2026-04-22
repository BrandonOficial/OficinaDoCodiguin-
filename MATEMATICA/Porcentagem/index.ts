import * as readline from "node:readline";

// ==========================================
// 1. DOMÍNIO E CONTRATOS
// ==========================================
interface ICalculationResult {
  formattedResult: string;
  formulaUsed: string;
}

interface IPercentageStrategy {
  calculate(x: number, y: number): ICalculationResult;
}

// ==========================================
// 2. AS ESTRATÉGIAS (Regras Matemáticas)
// ==========================================
class FractionCalculator implements IPercentageStrategy {
  calculate(percentage: number, total: number): ICalculationResult {
    const result = (percentage / 100) * total;
    return {
      formattedResult: result.toFixed(2),
      formulaUsed: `(${percentage} / 100) * ${total}`,
    };
  }
}

class ProportionCalculator implements IPercentageStrategy {
  calculate(part: number, total: number): ICalculationResult {
    if (total === 0) throw new Error("O total não pode ser zero.");
    const result = (part / total) * 100;
    return {
      formattedResult: `${result.toFixed(2)}%`,
      formulaUsed: `(${part} / ${total}) * 100`,
    };
  }
}

class VariationCalculator implements IPercentageStrategy {
  calculate(oldValue: number, newValue: number): ICalculationResult {
    if (oldValue === 0) throw new Error("O valor inicial não pode ser zero.");
    const result = ((newValue - oldValue) / oldValue) * 100;
    const sign = result > 0 ? "+" : "";
    return {
      formattedResult: `${sign}${result.toFixed(2)}%`,
      formulaUsed: `((${newValue} - ${oldValue}) / ${oldValue}) * 100`,
    };
  }
}

// ==========================================
// 3. O MOTOR DE EXTRAÇÃO (O Parser Sênior)
// ==========================================
class InputParser {
  private static rules = [
    {
      // Fração: Aceita "20% 500" ou "20% de 500"
      pattern: /^(\d+(?:\.\d+)?)\s*%\s*(?:de\s*)?(\d+(?:\.\d+)?)$/i,
      getStrategy: () => new FractionCalculator(),
    },
    {
      // Proporção: Aceita "50/200" ou "50 em 200"
      pattern: /^(\d+(?:\.\d+)?)\s*(?:em|sobre|\/)\s*(\d+(?:\.\d+)?)$/i,
      getStrategy: () => new ProportionCalculator(),
    },
    {
      // Variação: Aceita "100>150", "100->150" ou "de 100 para 150"
      pattern:
        /^(?:de\s*)?(\d+(?:\.\d+)?)\s*(?:para|->|>|até|ate)\s*(\d+(?:\.\d+)?)$/i,
      getStrategy: () => new VariationCalculator(),
    },
  ];

  static parse(input: string) {
    const cleanInput = input.trim();

    for (const rule of this.rules) {
      const match = cleanInput.match(rule.pattern);
      if (match) {
        return {
          strategy: rule.getStrategy(),
          x: parseFloat(match[1]),
          y: parseFloat(match[2]),
        };
      }
    }

    throw new Error("Formato inválido. Digite 'ajuda' para ver os atalhos.");
  }
}

// ==========================================
// 4. O CASO DE USO (Orquestrador)
// ==========================================
class CalculatePercentageUseCase {
  execute(input: string): void {
    try {
      const parsedData = InputParser.parse(input);
      const result = parsedData.strategy.calculate(parsedData.x, parsedData.y);

      console.log(`\n✅ Resultado: \x1b[32m${result.formattedResult}\x1b[0m`);
      console.log(`   └─ Fórmula: ${result.formulaUsed}\n`);
    } catch (error) {
      if (error instanceof Error) {
        console.log(`\n\x1b[31m❌ Erro: ${error.message}\x1b[0m\n`);
      }
    }
  }
}

// ==========================================
// 5. TERMINAL INTERATIVO (CLI)
// ==========================================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '\x1b[36m🧮 Digite o cálculo ou "ajuda": \x1b[0m',
});

const useCase = new CalculatePercentageUseCase();

console.log("==========================================");
console.log("   MOTOR MATEMÁTICO CLI - CLEAN CODE");
console.log("==========================================\n");

rl.prompt();

rl.on("line", (line) => {
  const input = line.trim().toLowerCase();

  if (input === "sair" || input === "exit") {
    console.log("Encerrando o motor... Até mais!");
    process.exit(0);
  }

  if (input === "ajuda" || input === "help") {
    console.log("\n💡 \x1b[33mCOMO USAR OS ATALHOS:\x1b[0m");
    console.log(
      "  • Fração (Quanto é X% de Y): Digite \x1b[32m20% 500\x1b[0m ou \x1b[32m20% de 500\x1b[0m",
    );
    console.log(
      "  • Proporção (X é qual % de Y): Digite \x1b[32m50/200\x1b[0m ou \x1b[32m50 em 200\x1b[0m",
    );
    console.log(
      "  • Variação (Crescimento/Queda): Digite \x1b[32m100>150\x1b[0m ou \x1b[32mde 100 para 150\x1b[0m\n",
    );
  } else if (input) {
    useCase.execute(input);
  }

  rl.prompt();
});
