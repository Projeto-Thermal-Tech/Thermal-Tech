import sys
import os
import requests
from win11toast import toast

def get_arguments():
    # Se dois argumentos foram passados para o script, eles serão usados como o ID do chamado e criado_por_cha
    if len(sys.argv) > 2:
        id_chamado = sys.argv[1]
        criado_por_cha = ' '.join(sys.argv[2:])
    else:
        id_chamado = "Nenhum ID fornecido"
        criado_por_cha = "Nenhum nome fornecido"
    
    return id_chamado, criado_por_cha

def download_image(url, local_path):
    # Baixe a imagem
    response = requests.get(url)

    # Salve imagem localmente
    with open(local_path, 'wb') as file:
        file.write(response.content)

def create_toast(id_chamado, criado_por_cha, local_path):
    # A mensagem da notificação incluirá o ID do chamado e criado_por_cha
    title = f'🔔 Novo Chamado Criado 🔔'
    message = f'Chamado ID: {id_chamado}\nCriado por: {criado_por_cha}\nClique aqui para visualizar os detalhes.'

    # Use o caminho local para a imagem como ícone
    toast(title, message, icon=os.path.realpath(local_path), on_click=f'http://localhost:5000/view/chamado/{id_chamado}')

def main():
    id_chamado, criado_por_cha = get_arguments()

    # URL da imagem
    url = "https://firebasestorage.googleapis.com/v0/b/thermal-tech-57a87.appspot.com/o/logo2.ico?alt=media&token=2658deae-dbca-4703-ab5b-5f4aaa169cd9"

    # Caminho local para salvar a imagem
    local_path = "logo2.ico"

    download_image(url, local_path)
    create_toast(id_chamado, criado_por_cha, local_path)

if __name__ == "__main__":
    main()
