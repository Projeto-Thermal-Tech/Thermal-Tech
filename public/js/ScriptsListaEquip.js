function filtrarPorTag() {
    var input, filtro, tabela, linhas, colunaTag, i, textoTag, botaoLimparFiltro;
    input = document.getElementById("tagInput");
    filtro = input.value.toUpperCase();
    tabela = document.querySelector("table");
    linhas = tabela.getElementsByTagName("tr");
    botaoLimparFiltro = document.querySelector("button[onclick='limparFiltro()']");
  
    // Verifica se o campo de entrada está vazio
    if (filtro.trim() === "") {
      alert("Por favor, insira uma tag antes de pesquisar.");
      return; // Retorna sem executar a pesquisa
    }
  
    var tagEncontrada = false; // Variável para rastrear se a tag foi encontrada
  
    for (i = 1; i < linhas.length; i++) {
      colunaTag = linhas[i].getElementsByTagName("td")[0]; // Segunda coluna (índice 1) contém a TAG
      if (colunaTag) {
        textoTag = colunaTag.textContent || colunaTag.innerText;
        if (textoTag.toUpperCase() === filtro) { // Modificado aqui
          linhas[i].style.display = "";
          tagEncontrada = true; // A tag foi encontrada
        } else {
          linhas[i].style.display = "none";
        }
      }
    }
  
    // Verifica se a tag não foi encontrada e exibe uma mensagem de erro
    if (!tagEncontrada) {
      alert("A tag de equipamento '" + filtro + "' não existe.");
      // Limpa o campo de entrada
      input.value = "";
      // Mostra todos os registros novamente
      for (i = 1; i < linhas.length; i++) {
        linhas[i].style.display = "";
      }
    } else {
      // Exibe o botão "Voltar" apenas se a tag foi encontrada
      botaoLimparFiltro.style.display = "inline-block";
    }
  }

  function limparFiltro() {
    var tabela, linhas, i;
  
    // Obtém a tabela e suas linhas
    tabela = document.querySelector("table");
    linhas = tabela.getElementsByTagName("tr");
  
    // Mostra todas as linhas da tabela
    for (i = 1; i < linhas.length; i++) {
      linhas[i].style.display = "";
    }
  
    // Limpa o campo de entrada
    document.getElementById("tagInput").value = "";
  
    // Oculta o botão "Limpar Filtro"
    document.querySelector("button[onclick='limparFiltro()']").style.display = "none";
  }
  
  function editarEquipamento(id_equip, tag, tipoNome, numeroSerie, descricao, area, localidade, setorNome, modelo) {
    // Preencha os campos do popup com os dados do equipamento
    document.getElementById('id_equip').value = id_equip;
    document.getElementById('TAG').value = tag;
    document.getElementById('N/S').value = numeroSerie;
    document.getElementById('DESC').value = descricao;
    document.getElementById('AREA').value = area;
    document.getElementById('LOCAL').value = localidade;
    document.getElementById('MODELO').value = modelo;

    // Obtenha o elemento select para o tipo
    var selectElementTipo = document.querySelector('select[name="TIPO"]');

    // Obtenha todas as opções dentro do elemento select para o tipo
    var optionsTipo = selectElementTipo.options;

    // Percorra todas as opções e defina a opção selecionada com base no nome do tipo
    for (var i = 0; i < optionsTipo.length; i++) {
        if (optionsTipo[i].getAttribute("data-nome") === tipoNome) {
            selectElementTipo.selectedIndex = i;
            break;
        }
    }

    // Obtenha o elemento select para o setor
    var selectElementSetor = document.querySelector('select[name="SETOR"]');

    // Obtenha todas as opções dentro do elemento select para o setor
    var optionsSetor = selectElementSetor.options;

    // Percorra todas as opções e defina a opção selecionada com base no nome do setor
    for (var j = 0; j < optionsSetor.length; j++) {
        if (optionsSetor[j].getAttribute("data-nome") === setorNome) {
            selectElementSetor.selectedIndex = j;
            break;
        }
    }

    showPopupEditar();
}
function Salvarequipamento() {
  document.getElementById("popoufiltro").style.display = "block";
  document.querySelector(".overlayfiltro").style.display = "block";
  document.body.style.overflow = 'hidden';
  
}
function Esconderpopou() {
  document.getElementById("popoufiltro").style.display = "none";
  document.querySelector(".overlayfiltro").style.display = "none";

}

function pedirConfirmacao() {
        // Exibe um diálogo de confirmação e armazena o resultado em uma variável
        var confirmacao = window.confirm("Tem certeza que deseja Excluir?");

}