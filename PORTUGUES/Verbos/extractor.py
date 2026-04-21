import spacy
import json
import os
import time

class LargeTextExtractor:
    def __init__(self, model: str = "pt_core_news_sm"):
        print(f"⏳ Carregando modelo IA ({model})...")
        self.nlp = spacy.load(model)
        # Aumentamos o limite do spaCy para não quebrar com livros grandes
        self.nlp.max_length = 2000000 

    def extract_from_file(self, filepath: str) -> list:
        if not os.path.exists(filepath):
            raise FileNotFoundError(f"Arquivo não encontrado: {filepath}")

        print(f"📖 Lendo o arquivo: {filepath}")
        with open(filepath, 'r', encoding='utf-8') as f:
            # Lemos as linhas e removemos linhas vazias
            linhas = [linha.strip() for linha in f if linha.strip()]

        print(f"🧠 Processando {len(linhas)} parágrafos. Isso pode levar alguns minutos...")
        
        banco_dados = []
        palavras_processadas = set()
        
        # O nlp.pipe processa em lotes, sendo MUITO mais rápido para grandes volumes
        for doc in self.nlp.pipe(linhas, batch_size=50):
            for token in doc:
                # Ignoramos pontuação, números, stop words (e, ou, de, para) e palavras muito curtas
                if not token.is_alpha or token.is_stop or len(token.text) < 3:
                    continue
                
                lemma = token.lemma_.lower()

                # Só processamos o que é Substantivo, Verbo ou Adjetivo
                if lemma not in palavras_processadas and token.pos_ in ["NOUN", "VERB", "ADJ"]:
                    palavras_processadas.add(lemma)
                    
                    is_compound = "-" in token.text
                    features = token.morph.to_dict()
                    
                    if token.pos_ == "NOUN":
                        features["composition"] = "composto" if is_compound else "simples"

                    banco_dados.append({
                        "word": lemma,
                        "class": token.pos_,
                        "features": features
                    })

        return banco_dados

class DataStorage:
    @staticmethod
    def save_to_json(data: list, filename: str):
        print(f"💾 Salvando base de dados em {filename}...")
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"✅ Sucesso! O arquivo agora contém {len(data)} palavras únicas catalogadas.")

# --- Execução ---
if __name__ == "__main__":
    start_time = time.time()
    
    extractor = LargeTextExtractor()
    
    # Coloque o nome do livro que você baixou aqui
    arquivo_texto = "livro.txt" 
    
    try:
        words_catalog = extractor.extract_from_file(arquivo_texto)
        DataStorage.save_to_json(words_catalog, "database_gigante.json")
    except Exception as e:
        print(f"❌ Erro durante o processamento: {e}")
        
    end_time = time.time()
    print(f"⏱️ Tempo total de execução: {round(end_time - start_time, 2)} segundos.")