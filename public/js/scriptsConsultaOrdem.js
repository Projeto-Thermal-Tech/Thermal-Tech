document.addEventListener('DOMContentLoaded', function () {
    const filterSelect = document.getElementById('estaOrd');
    const dataTable = document.getElementById('filtro_ord').getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    filterSelect.addEventListener('change', function () {
      const selectedValue = filterSelect.value;

      for (const row of dataTable) {
        const statusCell = row.querySelector('td:nth-child(5)').textContent.toLowerCase();

        if (selectedValue === 'aberto' && statusCell === 'aberto') {
          row.style.display = 'table-row';
        } else if (selectedValue === 'encerrada' && statusCell === 'encerrada') {
          row.style.display = 'table-row';
        } else if (selectedValue === 'andamento' && statusCell === 'andamento') {
          row.style.display = 'table-row';
        } else if (selectedValue === 'todos') {
          row.style.display = 'table-row';
        } else {
          row.style.display = 'none';
        }
      }
    });
  });

  var estadoAnteriorTabela = null;

  function pesquisarOrdem() {
    var numeroOrdem = document.getElementById("numeroOrdem").value;

    // Verificar se o campo de entrada está vazio
    if (!numeroOrdem) {
      alert("Por favor, insira um número de ordem para pesquisar.");
      return; // Não execute a pesquisa
    }

    var table = document.getElementById("filtro_ord");
    var rows = table.getElementsByTagName("tr");

    if (estadoAnteriorTabela === null) {
      // Salvar o estado anterior da tabela
      estadoAnteriorTabela = [];
      for (var i = 1; i < rows.length; i++) {
        estadoAnteriorTabela.push(rows[i].style.display);
      }
    }

    var ordemExiste = false;

    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var cell = row.getElementsByTagName("td")[1]; // Coluna do Nº Chamado

      if (cell) {
        var ordem = cell.innerText;
        if (ordem === numeroOrdem) {
          row.style.display = "";
          ordemExiste = true;
        } else {
          row.style.display = "none";
        }
      }
    }

    // Verifica se a tag não foi encontrada e exibe uma mensagem de erro
    if (!ordemExiste) {
      alert("Esse número de ordem não existe.");
      // Limpa o campo de entrada
      document.getElementById("numeroOrdem").value = "";
      // Mostra todos os registros novamente
      for (i = 1; i < rows.length; i++) {
        rows[i].style.display = "";
      }
    } else {
      // Exibe o botão "Voltar" apenas se a tag foi encontrada
      document.querySelector('#limpar-filtro').style.display = "inline-block";
    }
  }


  // Exibir ou ocultar o botão "Limpar Filtro" com base no filtroAtivo
  var botaoLimparFiltro = document.querySelector('#limpar-filtro');
  if (filtroAtivo) {
    botaoLimparFiltro.style.display = "inline-block";
  } else {
    botaoLimparFiltro.style.display = "none";
  }


  // Exibir ou ocultar o botão "Limpar Filtro" com base no filtroAtivo
  var botaoLimparFiltro = document.querySelector('#limpar-filtro');
  if (filtroAtivo) {
    botaoLimparFiltro.style.display = "inline-block";
  } else {
    botaoLimparFiltro.style.display = "none";
  }


  // Função para limpar o filtro
  function limparFiltro() {
    if (estadoAnteriorTabela !== null) {
      var table = document.getElementById("filtro_ord");
      var rows = table.getElementsByTagName("tr");

      // Restaurar o estado anterior da tabela
      for (var i = 1; i < rows.length; i++) {
        rows[i].style.display = estadoAnteriorTabela[i - 1];
      }

      estadoAnteriorTabela = null;
    }

    // Limpar o valor do input de número de chamado
    const inputnumeroOrdem = document.querySelector('.num');
    inputnumeroOrdem.value = '';

    // Ocultar o botão "Limpar Filtro"
    var botaoLimparFiltro = document.querySelector('#limpar-filtro');
    botaoLimparFiltro.style.display = "none";
  }
