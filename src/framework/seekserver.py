from googleapiclient.discovery import build
import re
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound
import ollama
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, resources={r"/process": {"origins": "*"}})

@app.route('/process', methods=['POST', 'GET'])
def process_data():
    payload = request.get_json()

    data = payload.get('data')
    modelo = payload.get('modelo')

    if not data:
        return jsonify({'error': 'URL do vídeo não fornecida.'}), 400
    
    if not modelo:
        return jsonify({'error': 'URL do vídeo não fornecida.'}), 400

    resultado = get_video_details(data, modelo)
    responses = jsonify(resultado)
    responses.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    responses.headers.add('Content-Type', 'application/json')
    responses.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    responses.headers.add('Access-Control-Allow-Origin', '*')
    return responses
# Defina sua chave de API aqui
API_KEY = os.getenv('YOUTUBE_API_KEY')



# Cria um serviço de conexão com a API YouTube
youtube = build('youtube', 'v3', developerKey=API_KEY)
 
# Função para extrair o ID do vídeo a partir da URL
def extract_video_id(url):
    video_id_match = re.search(r'(v=|/)([a-zA-Z0-9_-]{11})', url)
    if video_id_match:
        return video_id_match.group(2)
    else:
        raise ValueError("URL do vídeo inválida.")
 
# Função para obter transcrição (legendas automáticas ou manuais)
def get_transcript(video_id):
    try:
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id, languages=['en', 'pt'])
        transcript_text = " ".join([entry['text'] for entry in transcript_list])
        return transcript_text
    except (TranscriptsDisabled, NoTranscriptFound):
        return "0"  # Se não houver transcrição disponível
 
# Função para obter os detalhes do vídeo
def get_video_details(data, modelo):
    response = ""
    try:
        # Extrair ID do vídeo a partir da URL
        video_id = extract_video_id(data)
       
        # Fazer a requisição à API para obter detalhes do vídeo
        request = youtube.videos().list(
            part='id,snippet,contentDetails',
            id=video_id
        )
        response = request.execute()
 
        # Extrair informações do vídeo
        for video in response.get('items', []):
            video_id = video.get('id', '0')
            snippet = video.get('snippet', {})
            tags = snippet.get('tags', '0')
            category_id = snippet.get('categoryId', '0')
 
            # Obter a transcrição (se houver)
            transcript = get_transcript(video_id)
 
            if int(category_id) >= 17 and int(category_id) <=33:
                category_id = int(category_id)-13
            elif int(category_id) > 33 and int(category_id) <=44:
                category_id = int(category_id)-14    
            elif int(category_id) >= 1 and int(category_id) <=2:
                category_id = int(category_id)-1
            elif int(category_id) == 10:
                category_id = int(category_id)-8
            elif int(category_id) == 10:
                category_id = int(category_id)-12
 
            lista_categorias = [
            'Filmes e Animação',
            'Automóveis e Veículos',
            'Música',
            'Animais de Estimação e Animais',
            'Esportes',
            'Curtas-metragens',
            'Viagens e Eventos',
            'Jogos',
            'Vlogs',
            'Pessoas e Blogs',
            'Comédia',
            'Entretenimento',
            'Notícias e Política',
            'Como Fazer e Estilo',
            'Educação',
            'Ciência e Tecnologia',
            'ONGs e Ativismo',
            'Filmes',
            'Animes e Animações',
            'Ação ou Aventura',
            'Clássicos',
            'Documentários',
            'Drama',
            'Família',
            'Estrangeiros',
            'Terror',
            'Ficção Científica ou Fantasia',
            'Suspense',
            'Curtas',
            'Programas',
            'Trailers'
            ]
 
            categoria = lista_categorias[category_id]
 
            def summarize_text(text):
                try:
                    response = ollama.chat(
                        model='llama3.2',
                        messages=[
                            {"role": "user", "content": "Você é um transformador de textos em palavras chave, e deve apenas responder o que eu lhe pedir sem tagalerar e sem acrescentar nada"},
                            {"role": "user", "content": "Compare os textos e tags abaixo e os resuma em apenas 10 palavras chave."},
                            {"role": "user", "content": f"{text} e as {tags}"}
                            #   {f"conteudo: ","legenda", "tags" }
    
                        ],
                    )
 
                    # Extrair o resumo da resposta da API
                    summary = response['message']['content']
                    return summary
 
                except Exception as e:
                    return f"Erro ao gerar resumo: {e}"
 
            text = transcript
            summary = summarize_text(text)
            print(modelo)
            if modelo == ['news', None]:
                cx = '540fac61a0b534509'
            if modelo == ['study', None]:
                cx = '64ae854ef96d3472d'
            else:
                cx = 'c1ad8ebaf73c341f1'
            print(cx)
            baseUrl='https://customsearch.googleapis.com/customsearch/v1'
            apikey = os.getenv('API_KEY')
            #cx = os.getenv('CX')
            txt = f'{summary} {categoria}'
            chars = "',.!?[]"
            textin = txt.translate(str.maketrans('', '', chars))
            texto = textin.replace(" ", "+")
            query = f'{texto}'
            url = f'{baseUrl}?key={apikey}&cx={cx}&q={query}'
            response = requests.get(url)
            jason = response.json()
            if 'items' not in jason:
                return jsonify({'error': 'Nenhum resultado encontrado na pesquisa.'}), 404
            links = [i['link'] for i in jason['items']]

            
            response = links
   
        return response
    
    except ValueError as e:
        return (f"Erro: {e}")
   
    
 
 
# Exemplo de uso com uma URL do YouTube

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=8081)