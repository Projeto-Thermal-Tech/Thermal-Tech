# Importando as bibliotecas necessárias
import streamlit as st
import pandas as pd
import plotly.express as px
from database import get_data

# Configurando a página
st.set_page_config(layout="wide", page_title='Graficos Gerais', page_icon=":bar_chart:" )

# Definindo o estilo dos links na barra lateral
st.sidebar.markdown(
    """
    <style>
    .sidebar-link {
        display: block;
        padding: 10px 15px;
        color: white;
        text-decoration: none;
        font-size: 18px;
        margin-bottom: 10px;
        background-color:  rgba(0,212,255,1);
        border-radius: 5px;
        font-family: Arial, sans-serif;
        text-align: center; 
        transition: background-color 1.5s ease, transform 0.7s ease-in-out; 
    }
    .sidebar-link:hover {
        color: lightgray;
        background-color: rgba(9,9,121,1);
        transform: scale(1.1);  
    }
    </style>
    """,
    unsafe_allow_html=True
)

# Adicionando links na barra lateral
st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/Equipamentos" target="_self">Equipamentos</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/manutencao" target="_self">Manutenções</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/consulta_ordem" target="_self">Consultar Ordens</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/chamado" target="_self">Chamados</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/cadastro" target="_self">Cadastro Geral</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/relatorio" target="_self">Homem Hora</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="http://localhost:5000/graficos" target="_self">Gráficos gerenciais</a>', unsafe_allow_html=True)
st.sidebar.markdown('<a class="sidebar-link" href="../pages/chat.html" target="_self">Chat</a>', unsafe_allow_html=True)

# Adicionando um título à barra lateral
st.sidebar.title("Painel de Controle")

# Consulta para obter todos os valores únicos da coluna 'tag_listequip'
consulta_tags = "SELECT DISTINCT tag_listequip FROM lista_equipamentos"
resultados_tags = get_data(consulta_tags)

# Transforma os resultados em uma lista de tags
tags = [resultado[0] for resultado in resultados_tags]

# Adiciona a opção 'Gráfico Geral' à lista de tags
tags.insert(0, 'Gráfico Geral')

# Ordena a lista de tags
tags = sorted(tags, key=lambda x: (x!='Gráfico Geral', x))

# Adiciona as tags ao selectbox com 'Gráfico Geral' como valor padrão
opcao = st.sidebar.selectbox(
    'Selecione uma opção',
    tags,
    index=tags.index('Gráfico Geral'))  # Define 'Gráfico Geral' como valor padrão

# Adicionando um botão à barra lateral
botao = st.sidebar.button('Clique aqui')

coluna1, coluna2 = st.columns(2)
manutencao = pd.DataFrame()
manutencao1 = pd.DataFrame()

if opcao == 'Gráfico Geral':
    # Executa a consulta para o gráfico geral
    consulta_manutencao = "SELECT tipo_manut.nome_manut FROM ordem INNER JOIN status ON ordem.status_ord = status.id_status INNER JOIN tipo_manut ON ordem.manut_ord = tipo_manut.id_manut INNER JOIN tecnicos ON ordem.matricula_ord = tecnicos.matricula_tec ORDER BY ordem.id_ordem ASC;"
    resultados_manutencao = get_data(consulta_manutencao)
    manutencao = pd.DataFrame(resultados_manutencao, columns=["nome_manut"])
    consulta_chamados = "SELECT status.nome_status FROM chamado INNER JOIN status ON chamado.status_cha = status.id_status INNER JOIN prioridade ON chamado.prioridade_cha = prioridade.id_prioridade ORDER BY chamado.id_chamado ASC;"
    resultados_chamados = get_data(consulta_chamados)
    chamados = pd.DataFrame(resultados_chamados, columns=["nome_status"])
    consulta_tecnicos = "SELECT tecnicos.nome_tec FROM ordem INNER JOIN tecnicos ON ordem.matricula_ord = tecnicos.matricula_tec ORDER BY ordem.id_ordem ASC;"
    resultados_tecnicos = get_data(consulta_tecnicos)
    tecnicos = pd.DataFrame(resultados_tecnicos, columns=["nome_tec"])
    consulta_prioridade = "SELECT prioridade.nome_pri FROM chamado INNER JOIN prioridade ON chamado.prioridade_cha = prioridade.id_prioridade ORDER BY chamado.id_chamado ASC;"
    resultados_prioridade = get_data(consulta_prioridade)
    prioridade = pd.DataFrame(resultados_prioridade, columns=["nome_pri"])
    # Aqui você pode adicionar o código para gerar o gráfico geral
if not manutencao.empty:
    figura_manutencao = px.pie(manutencao, names="nome_manut", title="Manutenções", color="nome_manut", color_discrete_map={"Preventiva": "#1f77b4", "Corretiva": "#ff7f0e", "Preditiva": "#2ca02c"})
    figura_manutencao.update_layout(title_x=0.5, plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='white', size=14))
    coluna2.plotly_chart(figura_manutencao, use_container_width=True)
else:
    # Executa a consulta para o gráfico específico do equipamento
    consulta_manutencao1 = f"SELECT tipo_manut.nome_manut FROM ordem INNER JOIN tipo_manut ON ordem.manut_ord = tipo_manut.id_manut INNER JOIN chamado ON ordem.numero_cha = chamado.id_chamado INNER JOIN lista_equipamentos ON chamado.equipamento_cha = lista_equipamentos.id_equip WHERE lista_equipamentos.tag_listequip = '{opcao}' ORDER BY ordem.id_ordem ASC"
    resultados_manutencao1 = get_data(consulta_manutencao1)
    manutencao1 = pd.DataFrame(resultados_manutencao1, columns=["nome_manut"])
    consulta_chamados = f"SELECT status.nome_status FROM chamado INNER JOIN status ON chamado.status_cha = status.id_status INNER JOIN lista_equipamentos ON chamado.equipamento_cha = lista_equipamentos.id_equip WHERE lista_equipamentos.tag_listequip = '{opcao}' ORDER BY chamado.id_chamado ASC"
    resultados_chamados = get_data(consulta_chamados)
    chamados = pd.DataFrame(resultados_chamados, columns=["nome_status"])
    consulta_tecnicos = f"SELECT tecnicos.nome_tec FROM ordem INNER JOIN tecnicos ON ordem.matricula_ord = tecnicos.matricula_tec INNER JOIN chamado ON ordem.numero_cha = chamado.id_chamado INNER JOIN lista_equipamentos ON chamado.equipamento_cha = lista_equipamentos.id_equip WHERE lista_equipamentos.tag_listequip = '{opcao}' ORDER BY ordem.id_ordem ASC"
    resultados_tecnicos = get_data(consulta_tecnicos)
    tecnicos = pd.DataFrame(resultados_tecnicos, columns=["nome_tec"])
    consulta_prioridade = f"SELECT prioridade.nome_pri FROM chamado INNER JOIN prioridade ON chamado.prioridade_cha = prioridade.id_prioridade INNER JOIN lista_equipamentos ON chamado.equipamento_cha = lista_equipamentos.id_equip WHERE lista_equipamentos.tag_listequip = '{opcao}' ORDER BY chamado.id_chamado ASC"
    resultados_prioridade = get_data(consulta_prioridade)
    prioridade = pd.DataFrame(resultados_prioridade, columns=["nome_pri"])
if not manutencao1.empty:
    figura_manutencao1 = px.pie(manutencao1, names="nome_manut", title=f"Manutenções do equipamento {opcao}", color="nome_manut", color_discrete_map={"Preventiva": "#1f77b4", "Corretiva": "#ff7f0e", "Preditiva": "#2ca02c"})
    figura_manutencao1.update_layout(title_x=0.5, plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='white', size=14))
    coluna2.plotly_chart(figura_manutencao1, use_container_width=True)
if not chamados.empty:
    chamados['contagem'] = 1
    chamados_agrupados = chamados.groupby("nome_status").count().reset_index()
    figura_chamados = px.bar(chamados_agrupados, x="nome_status", y="contagem", title="Status dos Chamados", color="nome_status", color_discrete_map={"Aberto": "#1f77b4", "Fechado": "#ff7f0e", "Em andamento": "#2ca02c"})
    figura_chamados.update_layout(title_x=0.5, plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='white', size=14))
    coluna1.plotly_chart(figura_chamados, use_container_width=True)
if not tecnicos.empty:
    # Criando novas colunas para os gráficos de técnicos e prioridade
    coluna3, coluna4 = st.columns(2)
    tecnicos['contagem'] = 1
    tecnicos_agrupados = tecnicos.groupby("nome_tec").count().reset_index()
    figura_tecnicos = px.pie(tecnicos_agrupados, names="nome_tec", values="contagem", title="Técnicos", hole=.3, color="nome_tec", color_discrete_map={"João": "#1f77b4", "Maria": "#ff7f0e", "José": "#2ca02c"})
    figura_tecnicos.update_layout(title_x=0.5, plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='white', size=14))
    coluna3.plotly_chart(figura_tecnicos, use_container_width=True)
if not prioridade.empty:
    # Criando um gráfico de barras horizontais com os dados de prioridade
    prioridade['contagem'] = 1
    prioridade_agrupada = prioridade.groupby("nome_pri").count().reset_index()
    figura_prioridade = px.bar(prioridade_agrupada, x="contagem", y="nome_pri", title="Prioridades", orientation='h', color="nome_pri", color_discrete_map={"Alta": "#1f77b4", "Média": "#ff7f0e", "Baixa": "#2ca02c"} ,labels={"nome_pri": "Prioridade"})
    figura_prioridade.update_layout(title_x=0.5, plot_bgcolor='rgba(0,0,0,0)', paper_bgcolor='rgba(0,0,0,0)', font=dict(color='white', size=14), xaxis_title="Contagem", yaxis_title="Prioridade")
    coluna4.plotly_chart(figura_prioridade, use_container_width=True)

# Exibindo a opção selecionada na página principal
st.write(f'Você selecionou a {opcao}')