import streamlit as st
import pandas as pd
import plotly.express as px
from database import get_data

st.set_page_config(layout="wide", page_title='Meu Painel', page_icon=":bar_chart:")

# Adicione um título ao painel
st.sidebar.title("Painel de Controle")

# Adicione um seletor de opções ao painel
opcao = st.sidebar.selectbox(
    'Selecione uma opção',
    ('Opção 1', 'Opção 2', 'Opção 3'))

# Adicione um botão ao painel
botao = st.sidebar.button('Clique aqui')

# Obtenha os dados do banco de dados
chamados_query = "SELECT status.nome_status FROM chamado INNER JOIN status ON chamado.status_cha = status.id_status INNER JOIN prioridade ON chamado.prioridade_cha = prioridade.id_prioridade ORDER BY chamado.id_chamado ASC;"
chamados_results = get_data(chamados_query)
chamados = pd.DataFrame(chamados_results, columns=["nome_status"])

manutencao_query = "SELECT tipo_manut.nome_manut FROM ordem INNER JOIN status ON ordem.status_ord = status.id_status INNER JOIN tipo_manut ON ordem.manut_ord = tipo_manut.id_manut INNER JOIN tecnicos ON ordem.matricula_ord = tecnicos.matricula_tec ORDER BY ordem.id_ordem ASC;"
manutencao_results = get_data(manutencao_query)
manutencao = pd.DataFrame(manutencao_results, columns=["nome_manut"])

tecnicos_query = "SELECT tecnicos.nome_tec FROM ordem INNER JOIN tecnicos ON ordem.matricula_ord = tecnicos.matricula_tec ORDER BY ordem.id_ordem ASC;"
tecnicos_results = get_data(tecnicos_query)
tecnicos = pd.DataFrame(tecnicos_results, columns=["nome_tec"])

prioridade_query = "SELECT prioridade.nome_pri FROM chamado INNER JOIN prioridade ON chamado.prioridade_cha = prioridade.id_prioridade ORDER BY chamado.id_chamado ASC;"
prioridade_results = get_data(prioridade_query)
prioridade = pd.DataFrame(prioridade_results, columns=["nome_pri"])

# Crie as colunas para os dois primeiros gráficos
col1, col2 = st.columns(2)

# Agora você pode usar os dados das variáveis chamados e manutencao para criar seus gráficos
# Por exemplo, aqui está como você pode criar um gráfico de barras com os dados de chamados
# Modifique o DataFrame chamados para incluir uma contagem de cada status
chamados['count'] = 1
chamados_grouped = chamados.groupby("nome_status").count().reset_index()

# Use a contagem como o valor y no gráfico de barras
fig_chamados = px.bar(chamados_grouped, x="nome_status", y="count", title="Chamados por status", color="nome_status", color_discrete_sequence=px.colors.qualitative.Plotly)
fig_chamados.update_layout(title_x=0.5, plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='black', size=12), yaxis_title="Count", xaxis_title="Status")
col1.plotly_chart(fig_chamados, use_container_width=True)

# E aqui está como você pode criar um gráfico de pizza com os dados de manutencao
fig_manutencao = px.pie(manutencao, names="nome_manut", title="Manutenções", color="nome_manut", color_discrete_sequence=px.colors.qualitative.D3)
fig_manutencao.update_layout(title_x=0.5, plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='black', size=12))
col2.plotly_chart(fig_manutencao, use_container_width=True)

# Crie uma nova linha de colunas para os gráficos de técnicos e prioridade
col3, col4 = st.columns(2)

# E aqui está como você pode criar um gráfico de rosca com os dados dos técnicos
tecnicos['count'] = 1
tecnicos_grouped = tecnicos.groupby("nome_tec").count().reset_index()
fig_tecnicos = px.pie(tecnicos_grouped, names="nome_tec", values="count", title="Técnicos", hole=.3, color="nome_tec", color_discrete_sequence=px.colors.qualitative.G10)
fig_tecnicos.update_layout(title_x=0.5, plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='black', size=12))
col3.plotly_chart(fig_tecnicos, use_container_width=True)

# E aqui está como você pode criar um gráfico de barras horizontais com os dados de prioridade
prioridade['count'] = 1
prioridade_grouped = prioridade.groupby("nome_pri").count().reset_index()
fig_prioridade = px.bar(prioridade_grouped, x="count", y="nome_pri", title="Prioridades", orientation='h', color="nome_pri", color_discrete_sequence=px.colors.qualitative.T10)
fig_prioridade.update_layout(title_x=0.5, plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='black', size=12), xaxis_title="Count", yaxis_title="Prioridade")
col4.plotly_chart(fig_prioridade, use_container_width=True)

# Você pode mostrar a opção selecionada na página principal
st.write(f'Você selecionou a {opcao}')
