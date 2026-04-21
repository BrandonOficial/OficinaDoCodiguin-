import { IWordRepository, SpacyPosTag, IWordEntry } from "./types"; // Adicione o IWordEntry no import

export class GetRandomWordUseCase {
  constructor(private readonly repository: IWordRepository) {}

  // Alteramos o retorno de Promise<string> para Promise<IWordEntry>
  async execute(
    posTag: SpacyPosTag,
    featureKey?: string,
    featureValue?: string,
  ): Promise<IWordEntry> {
    const result = await this.repository.getRandomWord({
      posTag,
      featureKey,
      featureValue,
    });

    // Antes estava `return result.word;`
    // Agora retornamos o objeto inteiro:
    return result;
  }
}
