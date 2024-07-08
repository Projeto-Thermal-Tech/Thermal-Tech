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
  
function editarEquipamento(id_equip, tag, tipoNome, numeroSerie, descricao, area, localidade, setorNome, modelo, linkPDF) {
  // Preencha os campos do popup com os dados do equipamento
  document.getElementById('id_equip').value = id_equip;
  document.getElementById('TAG').value = tag;
  document.getElementById('N/S').value = numeroSerie;
  document.getElementById('DESC').value = descricao;
  document.getElementById('AREA').value = area;
  document.getElementById('LOCAL').value = localidade;
  document.getElementById('MODELO').value = modelo;
  document.getElementById('visualizadorPdf').src = linkPDF; 

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

  // Verifica se existe um PDF anexado
  if (linkPDF && linkPDF.trim() !== "") {
    document.getElementById('mostrarIframe').style.display = 'inline';
    document.getElementById('labelVisualizarPdf').style.display = 'inline';
  } else {
    document.getElementById('mostrarIframe').style.display = 'none';
    document.getElementById('labelVisualizarPdf').style.display = 'none';
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
  var confirmacao = window.confirm("Tem certeza que deseja Excluir?");

}

document.getElementById('mostrarIframe').addEventListener('click', function() {
  document.querySelector('.ViewsPdf').style.display = 'flex';
})

document.addEventListener('click', function(event) {
  var cliqueDentro = document.querySelector('.ViewsPdf').contains(event.target);
  var botãoIframe = document.getElementById('mostrarIframe').contains(event.target);

  // Se o clique foi fora do .ViewsPdf e não foi no botão que mostra o iframe
  if (!cliqueDentro && !botãoIframe) {
    document.querySelector('.ViewsPdf').style.display = 'none';
  }
});

// quando o input file for anexado algo chamar um função
document.getElementById('AnexarPDF').addEventListener('change', function() {
  showLoading()
  document.getElementById('popup-edit').style.display = 'none';
  const pdfExistente = document.getElementById('visualizadorPdf').src
  if (pdfExistente.includes("firebasestorage.googleapis.com")) {
    const storageRef = firebase.storage().refFromURL(pdfExistente)
    storageRef.delete().then(() => {
      console.log('PDF antigo excluído com sucesso!')
    }).catch((error) => {
      console.error('Erro ao excluir o PDF antigo:', error)
    })
  }
  var nomeArquivo = this.files[0].name;
  var file = this.files[0];
  var storageRef = firebase.storage().ref('AnexosEquipamentos/' + nomeArquivo);
  storageRef.put(file).then(function(snapshot) {
     storageRef.getDownloadURL().then(function(url) {
    document.getElementById('visualizadorPdf').src = url;
    document.getElementById('linkPDF').value = url;
    document.getElementById('namePDF').value = nomeArquivo;
    document.getElementById('popup-edit').style.display = 'block';
    hideloading()
  });
  });
 
  
  
});