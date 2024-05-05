#GMAIL
import smtplib
import sys
from email.mime.text import MIMEText
from  email.mime.multipart import MIMEMultipart

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
        .button {{
            background-color: gray;
            border: 1px solid white;
            border-radius: 10px;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
            transition: background-color 3s ease;
        }}
        .button:hover {{
            transform: scale(1.1);
            background-color: #ffffff;
            color: gray;
        }}
        p {{
            margin-bottom: 30px;
        }}
        .user-image {{
            width: 150px;
            height: 100px;
}}

        .user-image img {{
            width: 150px;
            height: 100px;
}}
    </style>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);">
    <img class="user-image" src="https://firebasestorage.googleapis.com/v0/b/thermal-tech-57a87.appspot.com/o/logo.png?alt=media&token=0cd54494-7088-48fd-bdfc-16f7712b6171" alt="Logo">
    <table style="width: 100%; max-width: 600px; margin: 0 auto; box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.1);">
        <tr>
            <td style="padding: 40px; text-align: center;">
                <h1 style="color: #ffffff;">Olá,</h1>
                <p style="line-height: 1.5; color: #ffffff; font-size: 18px;">Seu chamado está em andamento.</p>
                <p style="line-height: 1.5; color: #ffffff; font-size: 18px;">Chamado: {id_chamado}</p>
                <p style="line-height: 1.5; color: #ffffff; font-size: 18px;">Ordem: {numeroOrdem}</p>
                <p style="line-height: 1.5; color: #ffffff; font-size: 18px;">Criador do chamado: {email}</p>
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