#GMAIL
import smtplib
import sys
from email.mime.text import MIMEText
from  email.mime.multipart import MIMEMultipart
from datetime import datetime

# Obter a hora atual
hora_atual = datetime.now().hour

# Determinar a saudação apropriada
if 6 <= hora_atual < 12:
    saudacao = "Bom dia"
elif 12 <= hora_atual < 18:
    saudacao = "Boa tarde"
else:
    saudacao = "Boa noite"

# #Informações sobre o chamado
# id_chamado = sys.argv[1]
# criador, horaInicio, dataInicio,  = sys.argv[2].split('|')
# email = sys.argv[3]
# # Remova os segundos da hora
# horaInicio = horaInicio[:-3]

# # Reformatar a data
# ano, mes, dia = dataInicio.split('-')
# dataInicio = f'{dia}/{mes}/{ano}'
email = sys.argv[2]
id_chamado = sys.argv[3]
numeroOrdem = sys.argv[1]


#configurações do servidor SMTP
server_smtp = 'smtp.gmail.com'
port = 587
sender_email = "cloudthermaltech2@gmail.com"
password = "tzjvpbvvpblcgyqh"

#configurações do e-mail
receive_email = email
subject = "Seu chamado esta em andamento."
body = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Teste</title>
 <style>

        .body {{
            font-family:B612; 
            margin: 0;
            padding: 0;
            background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
        }}

        .email-table {{
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.1);
        }}

        .email-content{{
            padding: 20px;
            text-align: center;
        }}

        .email-heading {{
            color: #ffffff;
        }}

        .email-text {{
            text-align: center;
            line-height: 1.5;
            color: #ffffff;
            font-size: 18px;
            margin-bottom: 30px;
        }}

        .user-image {{
            width: 300px;
            height: 200px;
        }}

        .user-image img {{
            width: 300px;
            height: 200px;
        }}

         .button {{
            background-color: #ffffff;
            color: #000000;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            text-decoration: none;
            font-size: 1em;
            margin-top: 20px;
            transition: all 0.3s ease-out;
        }}

        .button:hover {{
            background-color: #f8f8f8;
            transform: scale(1.05);
        }}

        .email-text a {{
            color: white;
        }}
    </style>
</head>
<body class="body">
    <img class="user-image" src="https://firebasestorage.googleapis.com/v0/b/thermal-tech-57a87.appspot.com/o/logo.png?alt=media&token=0cd54494-7088-48fd-bdfc-16f7712b6171" alt="Logo">
    <table class="email-table">
        <tr>
            <td class="email-content">
                 <h1 class="email-heading">{saudacao}</h1>
                <p class="email-text">Temos o prazer de informar que o seu chamado está atualmente em andamento.</p>
                <p class="email-text">Identificação do Chamado: {id_chamado}</p>
                <p class="email-text">Número da Ordem: {numeroOrdem}</p>
                <p class="email-text">O chamado foi criado por: {email}</p>
            </td>
        </tr>
    </table>
</body>
</html>
"""

#criando o email
message = MIMEMultipart()
message["from"] = sender_email
message["to"] = receive_email
message["subject"] = subject
message.attach(MIMEText(body, "html"))

#Conectando o servidor SMTP
try:
    server = smtplib.SMTP(server_smtp, port)
    server.starttls()
    server.login(sender_email, password)
    server.sendmail(sender_email, receive_email, message.as_string())
    print("Email enviado com sucesso")
except Exception as e:
    print(f'Houve algum erro: {e}')
finally:
    server.quit()