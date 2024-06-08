# Python
import os
import pdfkit
import sys

numeroOrdem = sys.argv[1]
dir_path = os.path.dirname(os.path.abspath(__file__))
path_to_wkhtmltopdf = os.path.join(dir_path, './wkhtmltopdf/bin/wkhtmltopdf.exe')
config = pdfkit.configuration(wkhtmltopdf=path_to_wkhtmltopdf)

output_file = f"Ordem {numeroOrdem}.pdf"
pdfkit.from_url(f"http://localhost:5000/view/ordem/{numeroOrdem}", output_file, configuration=config)

print(output_file)  # Imprime o caminho do arquivo PDF gerado