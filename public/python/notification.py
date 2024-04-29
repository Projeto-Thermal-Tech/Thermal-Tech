import sys
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
toast(message)