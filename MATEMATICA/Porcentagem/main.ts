// O formato de resposta padronizado (Value Object)
export interface ICalculationResult {
  rawResult: number; // O número cru para o front-end usar se precisar
  formattedResult: string; // O número formatado bonitinho (ex: "25.00%")
  formulaUsed: string; // Para fins educativos e de log
}

// O contrato que todas as calculadoras devem respeitar (Interface Segregation)
export interface IPercentageStrategy {
  calculate(x: number, y: number): ICalculationResult;
}

// Estratégia 1: Quanto é X% de Y?
export class FractionCalculator implements IPercentageStrategy {
  calculate(percentage: number, total: number): ICalculationResult {
    const result = (percentage / 100) * total;

    return {
      rawResult: result,
      formattedResult: result.toFixed(2),
      formulaUsed: `(${percentage} / 100) * ${total}`,
    };
  }
}

// Estratégia 2: X é qual porcentagem de Y?
export class ProportionCalculator implements IPercentageStrategy {
  calculate(part: number, total: number): ICalculationResult {
    // Tratamento de erro clássico (Fail Fast)
    if (total === 0) {
      throw new Error("Divisão por zero: O total não pode ser nulo.");
    }

    const result = (part / total) * 100;

    return {
      rawResult: result,
      formattedResult: `${result.toFixed(2)}%`,
      formulaUsed: `(${part} / ${total}) * 100`,
    };
  }
}

// Estratégia 3: Qual a variação de X para Y?
export class VariationCalculator implements IPercentageStrategy {
  calculate(oldValue: number, newValue: number): ICalculationResult {
    if (oldValue === 0) {
      throw new Error(
        "Divisão por zero: O valor inicial não pode ser nulo para calcular variação.",
      );
    }

    const result = ((newValue - oldValue) / oldValue) * 100;
    const sign = result > 0 ? "+" : ""; // Adiciona um + se for crescimento

    return {
      rawResult: result,
      formattedResult: `${sign}${result.toFixed(2)}%`,
      formulaUsed: `((${newValue} - ${oldValue}) / ${oldValue}) * 100`,
    };
  }
}
export class CalculatePercentageUseCase {
  // Injetamos a dependência via construtor
  constructor(private strategy: IPercentageStrategy) {}

  // Permite trocar a estratégia em tempo de execução
  setStrategy(newStrategy: IPercentageStrategy) {
    this.strategy = newStrategy;
  }

  execute(x: number, y: number): ICalculationResult {
    return this.strategy.calculate(x, y);
  }
}
