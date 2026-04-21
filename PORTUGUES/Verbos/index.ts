import { JsonWordRepository } from "./JsonWordRepository";
import { GetRandomWordUseCase } from "./GetRandomWordUseCase";

async function runTests() {
  console.log("🚀 Iniciando motor avançado de palavras...\n");

  const repository = new JsonWordRepository();
  const getRandomWord = new GetRandomWordUseCase(repository);

  try {
    // 1. Buscando um Substantivo Simples
    const nounSimple = await getRandomWord.execute(
      "NOUN",
      "composition",
      "simples",
    );
    console.log(`✅ Palavra: \x1b[32m${nounSimple.word.toUpperCase()}\x1b[0m`);
    console.log(`   ├─ Classe: Substantivo`);
    console.log(
      `   ├─ Estrutura: ${nounSimple.features.composition || "Não definida"}`,
    );
    console.log(`   └─ Outros Atributos:`, nounSimple.features, `\n`);

    // 2. Buscando um Substantivo Composto
    const nounCompound = await getRandomWord.execute(
      "NOUN",
      "composition",
      "composto",
    );
    console.log(
      `✅ Palavra: \x1b[32m${nounCompound.word.toUpperCase()}\x1b[0m`,
    );
    console.log(`   ├─ Classe: Substantivo`);
    console.log(
      `   ├─ Estrutura: ${nounCompound.features.composition || "Não definida"}`,
    );
    console.log(`   └─ Outros Atributos:`, nounCompound.features, `\n`);

    // 3. Buscando um Verbo qualquer (sem filtro de feature)
    const verb = await getRandomWord.execute("VERB");
    console.log(`✅ Palavra: \x1b[32m${verb.word.toUpperCase()}\x1b[0m`);
    console.log(`   ├─ Classe: Verbo`);
    console.log(`   └─ Atributos:`, verb.features, `\n`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`\x1b[31m❌ Erro capturado: ${error.message}\x1b[0m`);
    } else {
      console.log(`\x1b[31m❌ Erro desconhecido: ${String(error)}\x1b[0m`);
    }
  }
}

runTests();
