import streamlit as st
import pandas as pd
import plotly.express as px
from database import get_data

st.set_page_config(layout="wide", page_title='Meu Painel', page_icon=":bar_chart:")

st.sidebar.markdown(
    """
    <style>
    .sidebar-link {
        display: block;
        padding: 8px 0;
        color: white;
        text-decoration: none;
        font-size: 16px;
        margin-bottom: 8px;
    }
    .sidebar-link:hover {
        color: lightgray;
    }
    </style>
    """,
    unsafe_allow_html=True
)

st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/Equipamentos" target="_self">Equipamentos</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/manutencao" target="_self">Manutenções</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/consulta_ordem" target="_self">Consultar Ordens</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/chamado" target="_self">Chamados</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/cadastro" target="_self">Cadastro Geral</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/relatorio" target="_self">Homem Hora</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/graficos" target="_self">Gráficos gerenciais</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="../pages/chat.html" target="_self">Chat</a>', unsafe_allow_html=True)

# Adicione um título ao painel
st.sidebar.title("Painel de Controle")

# Adicione um seletor de opções ao painel
opcao = st.sidebar.selectbox(
    'Selecione uma opção',
    ('Grafico Geral', 'tag ASC-2021', 'tag ASC-2022'))

# Adicione um botão ao painel
botao = st.sidebar.button('Clique aqui')

# dados do banco de dados
consulta_chamados = "SELECT status.nome_status FROM chamado INNER JOIN status ON chamado.status_cha = status.id_status INNER JOIN prioridade ON chamado.prioridade_cha = prioridade.id_prioridade ORDER BY chamado.id_chamado ASC;"
resultados_chamados = get_data(consulta_chamados)
chamados = pd.DataFrame(resultados_chamados, columns=["nome_status"])

consulta_manutencao = "SELECT tipo_manut.nome_manut FROM ordem INNER JOIN status ON ordem.status_ord = status.id_status INNER JOIN tipo_manut ON ordem.manut_ord = tipo_manut.id_manut INNER JOIN tecnicos ON ordem.matricula_ord = tecnicos.matricula_tec ORDER BY ordem.id_ordem ASC;"
resultados_manutencao = get_data(consulta_manutencao)
manutencao = pd.DataFrame(resultados_manutencao, columns=["nome_manut"])

consulta_tecnicos = "SELECT tecnicos.nome_tec FROM ordem INNER JOIN tecnicos ON ordem.matricula_ord = tecnicos.matricula_tec ORDER BY ordem.id_ordem ASC;"
resultados_tecnicos = get_data(consulta_tecnicos)
tecnicos = pd.DataFrame(resultados_tecnicos, columns=["nome_tec"])

consulta_prioridade = "SELECT prioridade.nome_pri FROM chamado INNER JOIN prioridade ON chamado.prioridade_cha = prioridade.id_prioridade ORDER BY chamado.id_chamado ASC;"
resultados_prioridade = get_data(consulta_prioridade)
prioridade = pd.DataFrame(resultados_prioridade, columns=["nome_pri"])

# colunas para os dois primeiros gráficos
coluna1, coluna2 = st.columns(2)

chamados['contagem'] = 1
chamados_agrupados = chamados.groupby("nome_status").count().reset_index()

# contagem como o valor y no gráfico de barras
figura_chamados = px.bar(chamados_agrupados, x="nome_status", y="contagem", title="Chamados por status", color="nome_status", color_discrete_map={"Em andamento": "#1f77b4", "Concluído": "#ff7f0e", "Pendente": "#2ca02c", "Cancelado": "#d62728"})
figura_chamados.update_layout(title_x=0.5, plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='white', size=14), yaxis_title="Contagem", xaxis_title="Status")
figura_chamados.update_traces(hovertemplate='Status: %{x}<br>Contagem: %{y}')
figura_chamados.update_yaxes(showgrid=True, gridwidth=1, gridcolor='LightGray')
figura_chamados.update_xaxes(showgrid=True, gridwidth=1, gridcolor='LightGray')
coluna1.plotly_chart(figura_chamados, use_container_width=True)

# gráfico de pizza com os dados de manutencao
figura_manutencao = px.pie(manutencao, names="nome_manut", title="Manutenções", color="nome_manut", color_discrete_map={"Preventiva": "#1f77b4", "Corretiva": "#ff7f0e", "Preditiva": "#2ca02c"})
figura_manutencao.update_layout(title_x=0.5, plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='white', size=14))
coluna2.plotly_chart(figura_manutencao, use_container_width=True)

# nova linha de colunas para os gráficos de técnicos e prioridade
coluna3, coluna4 = st.columns(2)

# gráfico de rosca com os dados dos técnicos
tecnicos['contagem'] = 1
tecnicos_agrupados = tecnicos.groupby("nome_tec").count().reset_index()
figura_tecnicos = px.pie(tecnicos_agrupados, names="nome_tec", values="contagem", title="Técnicos", hole=.3, color="nome_tec", color_discrete_map={"João": "#1f77b4", "Maria": "#ff7f0e", "José": "#2ca02c"})
figura_tecnicos.update_layout(title_x=0.5, plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='white', size=14))
coluna3.plotly_chart(figura_tecnicos, use_container_width=True)

# gráfico de barras horizontais com os dados de prioridade
prioridade['contagem'] = 1
prioridade_agrupada = prioridade.groupby("nome_pri").count().reset_index()
figura_prioridade = px.bar(prioridade_agrupada, x="contagem", y="nome_pri", title="Prioridades", orientation='h', color="nome_pri", color_discrete_map={"Alta": "#1f77b4", "Média": "#ff7f0e", "Baixa": "#2ca02c"})
figura_prioridade.update_layout(title_x=0.5, plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='white', size=14), xaxis_title="Contagem", yaxis_title="Prioridade")
coluna4.plotly_chart(figura_prioridade, use_container_width=True)

# opção selecionada na página principal
st.write(f'Você selecionou a {opcao}')