# Primeiro, instale as dependências no terminal:
# pip install spacy
# python -m spacy download pt_core_news_sm

import spacy
import json

# Carrega o modelo de inteligência artificial em português
nlp = spacy.load("pt_core_news_sm")

def gerar_banco_de_palavras(caminho_texto):
    with open(caminho_texto, 'r', encoding='utf-8') as f:
        texto = f.read()

    doc = nlp(texto)
    banco_dados = []
    palavras_processadas = set() # Para evitar palavras duplicadas

    for token in doc:
        palavra = token.lemma_.lower() # Pega a palavra raiz (ex: "correram" vira "correr")
        
        if palavra.isalpha() and palavra not in palavras_processadas:
            palavras_processadas.add(palavra)
            
            # Aqui classificamos de forma genérica
            item = {
                "word": palavra,
                "grammaticalClass": token.pos_, # NOUN (Substantivo), VERB (Verbo), ADJ, etc.
                "features": token.morph.to_dict() # Traz se é plural, singular, tempo verbal, etc.
            }
            banco_dados.append(item)

    # Exporta nosso "banco de dados" inicial
    with open('database.json', 'w', encoding='utf-8') as f:
        json.dump(banco_dados, f, ensure_ascii=False, indent=2)
        
    print(f"Sucesso! {len(banco_dados)} palavras catalogadas.")

gerar_banco_de_palavras("texto.txt")