import os
import pdfkit
import sys

numerochamado = sys.argv[1]
dir_path = os.path.dirname(os.path.abspath(__file__))
path_to_wkhtmltopdf = os.path.join(dir_path, './wkhtmltopdf/bin/wkhtmltopdf.exe')
config = pdfkit.configuration(wkhtmltopdf=path_to_wkhtmltopdf)

pdfkit.from_url(f"http://localhost:5000/view/chamado/{numerochamado}", f"chamado {numerochamado}.pdf", configuration=config)