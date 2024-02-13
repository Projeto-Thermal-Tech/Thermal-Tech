const escolha = document.getElementById("escolha");
const tabelas = document.querySelectorAll("table");

escolha.addEventListener("change", function () {
  const valorEscolhido = escolha.value;

  tabelas.forEach(function (tabela) {
    tabela.style.display = "none"; // Oculta todas as tabelas
  });

  document.getElementById(valorEscolhido).style.display = "table"; // Exibe a tabela selecionada
});

// Chame a função change para exibir a tabela inicialmente
escolha.dispatchEvent(new Event("change"));

function mostrarCadastro() {
  document.querySelector('.overlay').style.display = 'block'
  if (escolha.value === 'tabela_tec') {
    document.getElementById('popup-tec').style.display = 'block'
  }
  if (escolha.value === 'tabela_loc') {
    document.getElementById('popup-loc').style.display = 'block'
  }
  if (escolha.value === 'tabela_equip') {
    document.getElementById('popup-equip').style.display = 'block'
  }
}
function EsconderPopupTec() {
var popup = document.getElementById('popup-tec');
popup.style.display = 'none';
var overlay = document.querySelector('.overlay');
overlay.style.display = 'none';
}

function EsconderPopupLoc() {
var popup = document.getElementById('popup-loc');
popup.style.display = 'none';
var overlay = document.querySelector('.overlay');
overlay.style.display = 'none';
}

function EsconderPopupEquip() {
var popup = document.getElementById('popup-equip');
popup.style.display = 'none';
var overlay = document.querySelector('.overlay');
overlay.style.display = 'none';
}


function EsconderPopupEditTec() {
  document.getElementById('popup-tecnico').style.display = 'none'
  // document.querySelectorAll('.overlay-tec').style.display = 'none'
  document.querySelector('.overlay-tec').style.display='none'
}
function EsconderPopupEditLocal(){
  document.getElementById('popup-setores').style.display = 'none'
  document.querySelector('.overlay-setores').style.display = 'none'
}
function EsconderPopupEditTipo(){
  document.getElementById('popup-Tipos').style.display = 'none'
  document.querySelector('.overlay-Tipos').style.display = 'none'
}

function editarTecnico(matricula_tec,  nome_tec, email ) {
  document.getElementById('matricula_tec').value = matricula_tec;
  document.getElementById('nome_tec').value = nome_tec;
  document.getElementById('email').value = email;


showPopupEditarTec();
}
function editarSetores(id_setor, nome_setor) {
document.getElementById('id_setor').value = id_setor;
document.getElementById('nome_setor').value = nome_setor;
showPopupEditarSetor();
}
function editarTipos(id_tipar, tipos_arcondicionado_tipar) {
document.getElementById('id_tipar').value = id_tipar;
document.getElementById('tipos_arcondicionado_tipar').value = tipos_arcondicionado_tipar;
showPopupEditartipoEquip();
}
function pedirConfirmacao() {
    // Exibe um diálogo de confirmação e armazena o resultado em uma variável
    var confirmacao = window.confirm("Tem certeza que deseja Excluir?");

}

function FiltrarTec() {
document.getElementById("popoufiltro-tec").style.display = "block";
document.querySelector(".overlayfiltro-tec").style.display = "block";
}

function EsconderpopouTecnico() {
document.getElementById("popoufiltro-tec").style.display = "none";
document.querySelector(".overlayfiltro-tec").style.display = "none"; // Corrigido o seletor
}
function FiltrarLocais() {
document.getElementById("popoufiltro-locais").style.display = "block";
document.querySelector(".overlayfiltro-locais").style.display = "block";
}

function EsconderpopouLocais() {
document.getElementById("popoufiltro-locais").style.display = "none";
document.querySelector(".overlayfiltro-locais").style.display = "none"; // Corrigido o seletor
}

function FiltrarTiposEquipamentos() {
document.getElementById("popoufiltro-Equipamentos").style.display = "block";
document.querySelector(".overlayfiltro-Equipamentos").style.display = "block";
}

function EsconderpopouTiposEquipamentos() {
document.getElementById("popoufiltro-Equipamentos").style.display = "none";
document.querySelector(".overlayfiltro-Equipamentos").style.display = "none"; // Corrigido o seletor
}

window.onload = function() {
const tabelaSelect = document.getElementById("escolha");
const botoesFiltro = {
    'tabela_tec': document.querySelector(".filtroTec"),
    'tabela_loc': document.querySelector(".filtroLocais"),
    'tabela_equip': document.querySelector(".filtroEquipamentos")
};

tabelaSelect.addEventListener("change", function () {
    const valorEscolhido = tabelaSelect.value;

    // Oculta todos os botões de filtro
    for (let botao in botoesFiltro) {
        botoesFiltro[botao].style.display = "none";
    }

    // Exibe o botão de filtro correspondente à tabela selecionada
    if (botoesFiltro[valorEscolhido]) {
        botoesFiltro[valorEscolhido].style.display = "inline-block";
    }
});

// Chame a função para configurar o filtro inicialmente
tabelaSelect.dispatchEvent(new Event("change"));
}

document.getElementById('escolha').addEventListener('change', function() {
// Ocultar todos os elementos primeiro
document.querySelector('.matricula_tecnico').style.display = 'none';
document.querySelector('.local_setor').style.display = 'none';
document.querySelector('.tipo_equip').style.display = 'none';

// Mostrar o elemento correspondente com base na opção selecionada
if (this.value === 'tabela_tec') {
    document.querySelector('.matricula_tecnico').style.display = 'block';
} else if (this.value === 'tabela_loc') {
    document.querySelector('.local_setor').style.display = 'block';
} else if (this.value === 'tabela_equip') {
    document.querySelector('.tipo_equip').style.display = 'block';
}
});



function filtrarPorTecnico() {
var input, filtro, tabela, linhas, colunaMatricula, i, textoMatricula, botaoVoltar;
input = document.getElementById("matricula_tecnico");
filtro = input.value.toUpperCase();
tabela = document.querySelector("table");
linhas = tabela.getElementsByTagName("tr");
botaoVoltar = document.querySelector("button[onclick='limparFiltroTecnico()']");

// Verifica se o campo de entrada está vazio
if (filtro.trim() === "") {
alert("Por favor, insira um número de matrícula antes de pesquisar.");
return; // Retorna sem executar a pesquisa
}

var matriculaEncontrada = false; // Variável para rastrear se a matrícula foi encontrada

for (i = 1; i < linhas.length; i++) {
colunaMatricula = linhas[i].getElementsByTagName("td")[0]; // Primeira coluna (índice 0) contém a matrícula
if (colunaMatricula) {
  textoMatricula = colunaMatricula.textContent || colunaMatricula.innerText;
  if (textoMatricula.toUpperCase() === filtro) {
    linhas[i].style.display = "";
    matriculaEncontrada = true; // A matrícula foi encontrada
  } else {
    linhas[i].style.display = "none";
  }
}
}

// Verifica se a matrícula não foi encontrada e exibe uma mensagem de erro
if (!matriculaEncontrada) {
alert("A matrícula '" + filtro + "' não existe.");
// Limpa o campo de entrada
input.value = "";
// Mostra todos os registros novamente
for (i = 1; i < linhas.length; i++) {
  linhas[i].style.display = "";
}
} else {
// Exibe o botão "Voltar" apenas se a matrícula foi encontrada
botaoVoltar.style.display = "inline-block";
}
}

function limparFiltroTecnico() {
var tabela, linhas, i;

// Obtém a tabela e suas linhas
tabela = document.querySelector("table");
linhas = tabela.getElementsByTagName("tr");

// Mostra todas as linhas da tabela
for (i = 1; i < linhas.length; i++) {
linhas[i].style.display = "";
}

// Limpa o campo de entrada
document.getElementById("matricula_tecnico").value = "";

// Oculta o botão "Voltar"
document.querySelector("button[onclick='limparFiltroTecnico()']").style.display = "none";
}


function filtrarPorLocal() {
var input, filtro, tabela, linhas, colunaLocal, i, textoLocal, botaoVoltar;
input = document.getElementById("local_setor");
filtro = input.value.trim().toUpperCase();

if (filtro === "") {
alert("Por favor, insira um nome de local antes de pesquisar.");
return;
}

tabela = document.getElementById("tabela_loc");
linhas = tabela.getElementsByTagName("tr");
botaoVoltar = document.getElementById("botaoVoltar");

var localEncontrado = false;

for (i = 1; i < linhas.length; i++) {
colunaLocal = linhas[i].getElementsByTagName("td")[1];
if (colunaLocal) {
  textoLocal = colunaLocal.textContent || colunaLocal.innerText;
  textoLocal = textoLocal.trim().toUpperCase();

  if (textoLocal === filtro) {
    linhas[i].style.display = "";
    localEncontrado = true;
  } else {
    linhas[i].style.display = "none";
  }
}
}

if (!localEncontrado) {
alert("O local '" + filtro + "' não foi encontrado.");
input.value = "";
for (i = 1; i < linhas.length; i++) {
  linhas[i].style.display = "";
}
} else {
botaoVoltar.style.display = "inline-block";
}
}

function limparFiltroLocal() {
var tabela, linhas, i;
tabela = document.getElementById("tabela_loc");
linhas = tabela.getElementsByTagName("tr");
var input = document.getElementById("local_setor");
var botaoVoltar = document.getElementById("botaoVoltar");

input.value = "";

for (i = 1; i < linhas.length; i++) {
linhas[i].style.display = "";
}

botaoVoltar.style.display = "none";
}


// Função para filtrar por equipamento
function filtrarPorEquipamento() {
var input, filtro, tabela, linhas, colunaEquipamento, i, textoEquipamento, botaoVoltar;
input = document.getElementById("tipo_equip");
filtro = input.value.trim().toUpperCase();

if (filtro === "") {
alert("Por favor, insira um tipo de equipamento antes de pesquisar.");
return;
}

tabela = document.getElementById("tabela_equip");
linhas = tabela.getElementsByTagName("tr");
botaoVoltar = document.getElementById("botaoVoltar_equip"); // Usando o botaoVoltar_equip para pesquisa por equipamento

var equipamentoEncontrado = false;

for (i = 1; i < linhas.length; i++) {
colunaEquipamento = linhas[i].getElementsByTagName("td")[1]; // Assumindo que a segunda coluna contém o tipo de equipamento
if (colunaEquipamento) {
  textoEquipamento = colunaEquipamento.textContent || colunaEquipamento.innerText;
  textoEquipamento = textoEquipamento.trim().toUpperCase();

  if (textoEquipamento === filtro) {
    linhas[i].style.display = "";
    equipamentoEncontrado = true;
  } else {
    linhas[i].style.display = "none";
  }
}
}

if (!equipamentoEncontrado) {
alert("O equipamento '" + filtro + "' não foi encontrado.");
input.value = "";
for (i = 1; i < linhas.length; i++) {
  linhas[i].style.display = "";
}
} else {
botaoVoltar.style.display = "inline-block";
}
}

// Função para limpar o filtro e mostrar todos os registros de equipamento
function limparFiltroEquipamento() {
var tabela, linhas, i;
tabela = document.getElementById("tabela_equip");
linhas = tabela.getElementsByTagName("tr");
var input = document.getElementById("tipo_equip");
var botaoVoltar = document.getElementById("botaoVoltar_equip"); // Usando o botaoVoltar_equip para pesquisa por equipamento

input.value = "";

for (i = 1; i < linhas.length; i++) {
linhas[i].style.display = "";
}

botaoVoltar.style.display = "none";
}