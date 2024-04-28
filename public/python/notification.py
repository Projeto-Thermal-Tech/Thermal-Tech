import sys
from win11toast import toast

# Se um argumento foi passado para o script, ele será usado como o ID do chamado
print(sys.argv[0])
id_chamado = sys.argv[0]

# A mensagem da notificação incluirá o ID do chamado
message = 'Novo Chamado Criado: ' + id_chamado
toast(message)