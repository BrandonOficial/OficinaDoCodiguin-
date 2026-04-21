// 

// Espelhando as tags oficiais do spaCy (Universal POS tags)
export type SpacyPosTag = "NOUN" | "VERB" | "ADJ" | "ADV" | "PRON" | "DET";

// A estrutura exata de cada item no database.json
export interface IWordEntry {
  word: string;
  class: SpacyPosTag;
  features: Record<string, string>;
  // Ex: { Gender: "Masc", Number: "Sing", composition: "composto" }
}

// O contrato do nosso repositório
export interface IWordRepository {
  getRandomWord(filters: {
    posTag: SpacyPosTag;
    featureKey?: string;
    featureValue?: string;
  }): Promise<IWordEntry>;
}
