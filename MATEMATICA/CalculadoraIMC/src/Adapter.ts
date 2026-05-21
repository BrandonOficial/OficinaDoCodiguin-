import * as readline from 'readline';

export class CLIAdapter {
  private rl: readline.Interface;

  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  // Transforma o callback callback padrão do readline em uma Promise limpa
  ask(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(`> ${question} `, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  close(): void {
    this.rl.close();
  }
}