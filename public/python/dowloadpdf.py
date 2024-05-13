from flask import Flask, render_template, request, make_response
from weasyprint import HTML

app = Flask(__name__)

@app.route('/')
def index():
    # Renderiza o arquivo .ejs
    return render_template('viewchamado.ejs')

@app.route('/gerar_pdf', methods=['POST'])
def gerar_pdf():
    # Obtém o HTML da página atual
    html_content = request.data.decode("utf-8")
    
    # Gera o PDF a partir do HTML
    pdf = HTML(string=html_content).write_pdf()

    # Retorna o PDF como uma resposta
    response = make_response(pdf)
    response.headers['Content-Type'] = 'application/pdf'
    response.headers['Content-Disposition'] = 'attachment; filename=output.pdf'
    return response

if __name__ == '__main__':
    app.run(debug=True)
