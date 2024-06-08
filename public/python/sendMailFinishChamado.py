# Python
import smtplib
import sys
import pdfkit
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
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

numeroOrdem = sys.argv[1]
tecnico = sys.argv[3]
chamado = sys.argv[2]
email = sys.argv[4]

#configurações do servidor SMTP
server_smtp = 'smtp.gmail.com'
port = 587
sender_email = "cloudthermaltech2@gmail.com"
password = "tzjvpbvvpblcgyqh"

#configurações do e-mail
receive_email = email
subject = "Seu chamado foi encerrado."
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

    </style>
</head>
<body class="body">
    <img class="user-image" src="https://firebasestorage.googleapis.com/v0/b/thermal-tech-57a87.appspot.com/o/logo.png?alt=media&token=0cd54494-7088-48fd-bdfc-16f7712b6171" alt="Logo">
    <table class="email-table">
        <tr>
            <td class="email-content">
                <h1 class="email-heading">{saudacao}</h1>
                <p class="email-text">Temos o prazer de informar que o seu chamado foi concluído com sucesso.</p>
                <p class="email-text">Identificação do Chamado: {chamado}</p>
                <p class="email-text">Número da Ordem: {numeroOrdem}</p>
                <p class="email-text">O chamado foi atendido pelo técnico: {tecnico}</p>
            </td>
        </tr>
    </table>
</body>
</html>
"""

#criando o email
dir_path = os.path.dirname(os.path.abspath(__file__))
path_to_wkhtmltopdf = os.path.join(dir_path, './wkhtmltopdf/bin/wkhtmltopdf.exe')
config = pdfkit.configuration(wkhtmltopdf=path_to_wkhtmltopdf)

output_file = f"Ordem {numeroOrdem}.pdf"
pdfkit.from_url(f"http://localhost:5000/view/ordem/{numeroOrdem}", output_file, configuration=config)


message = MIMEMultipart()
message["from"] = sender_email
message["to"] = receive_email
message["subject"] = subject
message.attach(MIMEText(body, "html"))

# Aqui está o novo código que anexa o PDF ao e-mail
mime_type = "application/pdf"  # Use "application/pdf" para .pdf

current_dir = os.path.dirname(os.path.realpath(__file__))

# Constrói o caminho completo para o arquivo
filename = os.path.join(current_dir, '..', '..', f'Ordem {numeroOrdem}.pdf')

if os.path.isfile(filename):
    with open(filename, "rb") as attachment:
        part = MIMEBase(*mime_type.split('/'))
        part.set_payload(attachment.read())
    encoders.encode_base64(part)
    part.add_header(
        "Content-Disposition",
        f"attachment; filename= {os.path.basename(filename)}",  # Use o nome do arquivo, não o caminho completo
    )
    message.attach(part)
    os.remove(filename)  # Exclui o arquivo depois de anexá-lo
else:
    print(f"O arquivo {filename} não existe")

# Conectando o servidor SMTP
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