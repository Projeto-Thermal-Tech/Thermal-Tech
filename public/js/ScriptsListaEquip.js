

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
    document.getElementById('mostrarAnexo').style.display = 'inline';
  } else {
    document.getElementById('mostrarAnexo').style.display = 'none';
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

function ExcluirEquipamento(id_equip,tag) {
  var confirmacao = window.confirm("Tem certeza que deseja excluir o equipamento "+tag +" ?");
  if (confirmacao == true) {
    if (id_equip) {
      fetch('/deletar/equipamento/' + id_equip, {
        method: 'POST'
      }).then(function(response) {
        if (response.ok) {
          const pdfExistente = document.getElementById('visualizadorPdf').src
          if (pdfExistente.includes("firebasestorage.googleapis.com")) {
          const storageRef = firebase.storage().refFromURL(pdfExistente)
          storageRef.delete().then(() => {
            console.log('PDF antigo excluído com sucesso!')
          }).catch((error) => {
            console.error('Erro ao excluir o PDF antigo:', error)
          })
          window.location.reload();
        } else {
          alert('Erro ao excluir o equipamento.');
        }
    }});
    }
    
  }
}

document.getElementById('mostrarAnexo').addEventListener('click', function() {
  const checkboxes = document.querySelectorAll('.file-select');
  let checkboxChecked = false; // Variável para rastrear se algum checkbox foi selecionado
  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      // Cria um elemento <a> temporário para abrir o PDF em uma nova aba
      const link = document.createElement('a');
      link.href = checkbox.value; // Define o URL do PDF
      link.target = '_blank'; // Instrui o navegador a abrir o link em uma nova aba

      // Adiciona o elemento ao corpo do documento para torná-lo funcional
      document.body.appendChild(link);

      // Aciona a abertura em nova aba
      link.click();

      // Remove o elemento do documento
      document.body.removeChild(link);

      checkboxChecked = true; // Atualiza a variável se um checkbox estiver marcado
    }
  });
  if (!checkboxChecked) { // Se após verificar todos, nenhum estiver marcado, exibe o alerta
    alert('Selecione um anexo para visualizar.');
  }
});

document.getElementById('Img-Anexo').addEventListener('click', function() {
    document.getElementById('AnexarPDF').click(); // Aciona o clique no input file oculto
});
document.getElementById('AnexarPDF').addEventListener('change', function() {
  alert('Arquivo carregado, mas não salvo. Clique em "Salvar" para anexar o arquivo.');
})


document.getElementById('btnSalvarAnexo').addEventListener('click', function() {
  showLoading();
  document.querySelector('.AnexoDoc').style.display = 'none';
  const criado_por = localStorage.getItem("userName");
  var fileInput = document.getElementById('AnexarPDF');
  if (fileInput.files.length > 0) {
    const createdAt = Date.now();
    var nomeArquivo = fileInput.files[0].name;
    var file = fileInput.files[0];
    var storageRef = firebase.storage().ref('AnexosEquipamentos/' + `${createdAt}_${nomeArquivo}`);
    storageRef.put(file).then(function(snapshot) {
      storageRef.getDownloadURL().then(function(url) {
        fetch('/atualizar/anexo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_equip: document.getElementById('id_equipAnexo').value,
            linkAnexo: url,
            nomeArquivo: nomeArquivo,
            createdAt: createdAt,
            criado_por:criado_por,
          })
        }).then(function(response) {
          if (response.ok) {
            alert('Anexo criado com sucesso!');
            hideloading();
            window.location.href = '/equipamentos';
          } else {
            alert('Erro ao anexar o PDF.');
          }
        });
      });
    });
  }else{
    alert('Nenhum anexo foi criado!');
    hideloading();
    document.querySelector('.AnexoDoc').style.display = 'block';
  }
});

function FecharPopupAnexo() {
  document.getElementById('PopupAnexo').style.display = 'none';
  document.querySelector('.overlay-edit').style.display = 'none';
  const tbody = document.querySelector('.tbodyAnexos')
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild)
  }
  
}

function verAnexos(id,tag){
  document.getElementById('id_equipAnexo').value = id;
  document.querySelector('input[data-custom-id="TagEquip"]').value = tag;
  document.getElementById('PopupAnexo').style.display = 'block';
  document.querySelector('.overlay-edit').style.display = 'block';
fetch('/view/anexo/equipamento',{
  method:'POST',
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify({
    id_equip:id
  })
}).then(function(response){
  if(response.ok){
    response.json().then(function(data) {
      console.log(data);
      const anexos = data
      // quero que anexos[i].createdat retorne uma data formatada
      Data = new Date(anexos[0].createdat);
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      const dataFormatada =  anexos[0].createdat = Data.toLocaleDateString('pt-BR', options);
      for (let i = 0; i < anexos.length; i++) {
        const tbody = document.querySelector('.tbodyAnexos')
        const tr = document.createElement('tr')
        tr.classList.add('last-row')
        const td = document.createElement('td')
        const input = document.createElement('input')
        input.type = 'checkbox'
        input.classList.add('file-select')
        input.value = anexos[i].link
        input.setAttribute('data-custom-id', anexos[i].id)
        input.setAttribute('data-custom-name',anexos[i].name_anexo )
        td.appendChild(input)
        tr.appendChild(td)
        const td2 = document.createElement('td')
        td2.textContent = anexos[i].name_anexo
        tr.appendChild(td2)
        const TdCriadoPor = document.createElement('td')
        TdCriadoPor.textContent = anexos[i].criado_por
        tr.appendChild(TdCriadoPor)
        const td3 = document.createElement('td')
        td3.textContent = dataFormatada
        tr.appendChild(td3)
        tbody.appendChild(tr)
      }
      const checkboxes = document.querySelectorAll('.file-select');
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', function() {
            // Se o checkbox atual foi marcado, desmarque todos os outros
            if (checkbox.checked) {
                checkboxes.forEach(function(otherCheckbox) {
                    if (otherCheckbox !== checkbox) {
                        otherCheckbox.checked = false;
                    }
                });
            }
        });
    });
      hideloading();
    });
  } else {
    alert('Erro ao ver o PDF.');
  }
})
}
function deletarAnexo() {
  const checkboxes = document.querySelectorAll('.file-select');
  let anyChecked = false;

  checkboxes.forEach(function(checkbox) {
    if (checkbox.checked) {
      anyChecked = true;
      let url = checkbox.value;
      let checkboxChecked = checkbox.getAttribute('data-custom-id');
      deletarAnexoEquipamento(checkboxChecked,url);
    }
  });

  if (!anyChecked) {
    alert('Selecione um anexo para excluir.');
  }
}

function deletarAnexoEquipamento(checkboxChecked,url) {
  const confirmDelete = confirm('Tem certeza que deseja excluir o anexo?');
  if (!confirmDelete) {
    return;
  }
  const id = checkboxChecked;
  if (id) {
          const storageRef = firebase.storage().refFromURL(url)
          storageRef.delete().then(() => {
            console.log('PDF antigo excluído com sucesso!')
          }).catch((error) => {
            console.error('Erro ao excluir o PDF antigo:', error)
          })
    fetch('/deletar/anexo/equipamento/' + id, {
      method: 'POST'
    }).then(function(response) {
      if (response.ok) {
        alert('Anexo excluído com sucesso!');
        window.location.reload();
      } else {
        alert('Erro ao excluir o anexo.');
      }
    });
  
}}

  document.getElementById('dowloadAnexo').addEventListener('click', function() {
    async function baixarImagem(url, nomeDoArquivo) {
      try {
          // Chama a rota do backend passando a URL da imagem como parâmetro
          const resposta = await fetch(`/baixar-imagem?url=${encodeURIComponent(url)}`);
          if (!resposta.ok) throw new Error('Falha ao baixar a imagem');
          const blobImagem = await resposta.blob();
          const urlBlob = URL.createObjectURL(blobImagem);
  
          const link = document.createElement('a');
          link.href = urlBlob;
          link.download = nomeDoArquivo;
          document.body.appendChild(link);
          link.click();
  
          document.body.removeChild(link);
          URL.revokeObjectURL(urlBlob);
      } catch (error) {
          console.error('Erro ao baixar a imagem:', error);
      }
  }     
  const checkboxes = document.querySelectorAll('.file-select');
    let checkboxChecked = false; // Variável para rastrear se algum checkbox foi selecionado
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        baixarImagem(checkbox.value, checkbox.getAttribute('data-custom-name'));
        checkboxChecked = true; // Atualiza a variável se um checkbox estiver marcado
      }
  })})