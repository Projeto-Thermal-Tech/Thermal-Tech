import sys
import os
import requests
from win11toast import toast

# Se dois argumentos foram passados para o script, eles serão usados como o ID do chamado e criado_por_cha
if len(sys.argv) > 2:
    id_chamado = sys.argv[1]
    criado_por_cha = ' '.join(sys.argv[2:])
else:
    id_chamado = "Nenhum ID fornecido"
    criado_por_cha = "Nenhum nome fornecido"

# A mensagem da notificação incluirá o ID do chamado e criado_por_cha
message = 'Novo Chamado Criado: ' + id_chamado + ', Criado por: ' + criado_por_cha

# URL da imagem
url = "https://firebasestorage.googleapis.com/v0/b/thermal-tech-57a87.appspot.com/o/logo2.ico?alt=media&token=2658deae-dbca-4703-ab5b-5f4aaa169cd9"

# Caminho local para salvar a imagem
local_path = "logo2.ico"

# Baixe a imagem
response = requests.get(url)

# Salve imagem localmente
with open(local_path, 'wb') as file:
    file.write(response.content)

# Use o caminho local para a imagem como ícone
toast(message, icon=os.path.realpath(local_path), on_click=f'http://localhost:5000/view/chamado/{id_chamado}')