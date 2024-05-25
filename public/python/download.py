import pdfkit
import sys

numerochamado = sys.argv[1]
path_to_wkhtmltopdf = r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe'  # Altere para o caminho correto no seu sistema
config = pdfkit.configuration(wkhtmltopdf=path_to_wkhtmltopdf)

pdfkit.from_url(f"http://localhost:5000/view/chamado/{numerochamado}", "teste.pdf", configuration=config)
