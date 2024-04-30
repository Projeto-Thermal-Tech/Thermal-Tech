#GMAIL
import smtplib
import sys
from email.mime.text import MIMEText
from  email.mime.multipart import MIMEMultipart

#Informações sobre o chamado
id_chamado = sys.argv[1]
criador, horaInicio, dataInicio = sys.argv[2].split('|')

# Remova os segundos da hora
horaInicio = horaInicio[:-3]

# Reformatar a data
ano, mes, dia = dataInicio.split('-')
dataInicio = f'{dia}/{mes}/{ano}'


#configurações do servidor SMTP
server_smtp = 'smtp.gmail.com'
port = 587
sender_email = "cloudthermaltech2@gmail.com"
password = "tzjvpbvvpblcgyqh"

#configurações do e-mail
receive_email = "ens-eduardowagner@ugv.edu.br"
subject = "NOVO CHAMADO CRIADO"
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
    </style>
</head>
<body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);">
    <img src="../assets/icon_logo.jpg" alt="Logo" style="width: 100px;">
    <table style="width: 100%; max-width: 600px; margin: 0 auto; box-shadow: 0px 3px 5px 0px rgba(0,0,0,0.1);">
        <tr>
            <td style="padding: 40px; text-align: center;">
                <h1 style="color: #ffffff;">Olá,</h1>
                <p style="line-height: 1.5; color: #ffffff; font-size: 18px;">Um novo chamado foi criado.</p>
                <p style="line-height: 1.5; color: #ffffff; font-size: 18px;">Chamado: {id_chamado}</p>
                <p style="line-height: 1.5; color: #ffffff; font-size: 18px;">Criado por: {criador}</p>
                <p style="line-height: 1.5; color: #ffffff; font-size: 18px;">Criado às: {horaInicio} no dia: {dataInicio}</p>
                <p style="line-height: 1.5; color: #ffffff; font-size: 18px;">Agradecemos por ter recebido este e-mail de teste.</p>
                <p style="line-height: 1.5; color: #ffffff; font-size: 18px;">Este e-mail foi enviado apenas para fins de demonstração e teste.</p>
                <a href="http://localhost:5000/chamado"{id_chamado} class="button">Clique Aqui Pra Vizualizar o Chamado</a>
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

# import smtplib
# from email.mime.text import MIMEText
# from  email.mime.multipart import MIMEMultipart


# # HOTMAIL

# #configurações do servidor SMTP
# server_smtp = 'smtp-mail.outlook.com'
# port = 587
# sender_email = "cloudthermaltech2@gmail.com"
# password = "#thermaltech1"

# #configurações do e-mail
# receive_email = "ens-victorbueno@ugv.edu.br"
# subject = "Teste E-mail automático"
# body = """
# <!DOCTYPE html>
# <html lang="en">
# <head>
#     <meta charset="UTF-8">
#     <meta http-equiv="X-UA-Compatible" content="IE=edge">
#     <meta name="viewport" content="width=device-width, initial-scale=1.0">
#     <title>Email Teste</title>
# </head>
# <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f2f2f2;">
#     <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f2f2f2;">
#         <tr>
#             <td align="center">
#                 <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff;">
#                     <tr>
#                         <td align="center" style="padding: 40px 0;">
#                             <img src="https://img.freepik.com/fotos-gratis/paisagem-de-nevoeiro-matinal-e-montanhas-com-baloes-de-ar-quente-ao-nascer-do-sol_335224-794.jpg" alt="Paisagem" width="400" style="display: block; margin: 0 auto;">
#                             <p style="margin-top: 20px; text-align: center;">Olá,</p>
#                             <p style="text-align: center;">Este é um e-mail de teste com uma imagem anexada.</p>
#                             <p style="text-align: center;">Agradecemos por ter recebido este e-mail de teste.</p>
#                             <p style="text-align: center;">Este e-mail foi enviado apenas para fins de demonstração e teste.</p>
#                         </td>
#                     </tr>
#                 </table>
#             </td>
#         </tr>
#     </table>
# </body>
# </html>
# """

# #criando o email
# message = MIMEMultipart()
# message["from"] = sender_email
# message["to"] = receive_email
# message["subject"] = subject
# message.attach(MIMEText(body, "html"))

# #Conectando o servidor SMTP
# try:
#     server = smtplib.SMTP(server_smtp, port)
#     server.starttls()

#     server.login(sender_email, password)

#     server.sendmail(sender_email, receive_email, message.as_string())
#     print("Email enviado com sucesso")
# except Exception as e:
#     print(f'Houve algum erro: {e}')
# finally:
#     server.quit()
