import * as fs from "fs";
import * as path from "path";
import { IWordRepository, IWordEntry, SpacyPosTag } from "./types";

export class JsonWordRepository implements IWordRepository {
  private db: IWordEntry[];

  constructor() {
    // 1. Lê o arquivo gigante do disco
    const rawData = fs.readFileSync(
      path.resolve(__dirname, "database_gigante.json"),
      "utf-8",
    );

    // 2. Transforma o texto em um array de objetos TypeScript, aplicando a Dupla Asserção
    this.db = JSON.parse(rawData) as unknown as IWordEntry[];
  }

  async getRandomWord(filters: {
    posTag: SpacyPosTag;
    featureKey?: string;
    featureValue?: string;
  }): Promise<IWordEntry> {
    let filtered = this.db.filter((entry) => entry.class === filters.posTag);

    const key = filters.featureKey;
    const value = filters.featureValue;

    // Se entrar no if, o TypeScript tem 100% de certeza que key e value são strings
    if (key && value) {
      filtered = filtered.filter(
        (entry) => entry.features && entry.features[key] === value,
      );
    }

    if (filtered.length === 0) {
      throw new Error(
        `Nenhuma palavra encontrada para a classe ${filters.posTag} com filtro ${filters.featureKey}=${filters.featureValue}`,
      );
    }

    const randomIndex = Math.floor(Math.random() * filtered.length);
    return filtered[randomIndex];
  }
}
