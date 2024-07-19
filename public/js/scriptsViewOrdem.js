function atualizarDataHoraOrdem() {
    const dataOrdem = document.getElementById("data_fim");
    const horaOrdem = document.getElementById("hora_fim");
    if (dataOrdem.value !== '' && horaOrdem.value !== '') {
        return;
    }
    const agora = new Date();

    // Formate a data no formato "yyyy-MM-dd" para o campo de data
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    const dataFormatada = `${ano}-${mes}-${dia}`;
    dataOrdem.value = dataFormatada;

    // Formate a hora no formato "HH:mm" para o campo de hora
    const horaFormatada = agora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    horaOrdem.value = horaFormatada;
}

atualizarDataHoraOrdem();
  



function verAnexosChamado() {
    document.getElementById('PopupAnexoChamado').style.display = 'block';
  }
  
function FecharPopupAnexoChamado() {
    document.getElementById('PopupAnexoChamado').style.display = 'none';
  }

document.getElementById('Img-Anexo').addEventListener('click', function() {
    document.getElementById('AnexarPDF').click(); // Aciona o clique no input file oculto
});

document.getElementById('AnexarPDF').addEventListener('change', function() {
    alert('Arquivo carregado, mas não salvo. Clique em "Salvar" para anexar o arquivo.');
  });

  document.getElementById('btnSalvarAnexo').addEventListener('click', function() {
    showLoading();
    document.querySelector('.AnexoDoc').style.display = 'none';
    const criado_por = localStorage.getItem('userName');
    var fileInput = document.getElementById('AnexarPDF');
    if (fileInput.files.length > 0) {
      const createdAt = Date.now();
      var nomeArquivo = fileInput.files[0].name;
      var file = fileInput.files[0];
      var storageRef = firebase.storage().ref('AnexosOrdem/' + `${createdAt}_${nomeArquivo}`);
      storageRef.put(file).then(function(snapshot) {
        storageRef.getDownloadURL().then(function(url) {
          fetch('/atualizar/anexoOrdem', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              id_ordem: document.getElementById('idOrdem').value,
              linkAnexo: url,
              nomeArquivo: nomeArquivo,
              createdAt: createdAt,
              criado_por_ord: criado_por,
            })
          }).then(function(response) {
            if (response.ok) {
              alert('Anexo criado com sucesso!');
              hideloading();         
              window.location.reload();
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
  function verAnexos(id_ordem){
    document.getElementById('PopupAnexo').style.display = 'block';
    document.querySelector('.overlay-edit').style.display = 'block';
  fetch('/view/anexo/Ordem',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({
      id_ordem:id_ordem
    })
  }).then(function(response){
    if(response.ok){
      response.json().then(function(data) {
        console.log(data);
        const anexos = data
        // quero que anexos[i].createdat retorne uma data formatada
        Data = new Date(anexos[0].createdat_ord);
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
          input.setAttribute('data-custom-name',anexos[i].name_anexo_ord )
          td.appendChild(input)
          tr.appendChild(td)
          const td2 = document.createElement('td')
          td2.textContent = anexos[i].name_anexo_ord
          tr.appendChild(td2)
          const TdCriadoPor = document.createElement('td')
          TdCriadoPor.textContent = anexos[i].criado_por_ord
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
  function FecharPopupAnexo() {
    document.getElementById('PopupAnexo').style.display = 'none';
    document.querySelector('.overlay-edit').style.display = 'none';
    const tbody = document.querySelector('.tbodyAnexos')
    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild)
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
  function deletarAnexo() {
    const checkboxes = document.querySelectorAll('.file-select');
    let anyChecked = false;
  
    checkboxes.forEach(function(checkbox) {
      if (checkbox.checked) {
        anyChecked = true;
        let url = checkbox.value;
        let checkboxChecked = checkbox.getAttribute('data-custom-id');
        deletarAnexoChamado(checkboxChecked,url);
      }
    });
  
    if (!anyChecked) {
      alert('Selecione um anexo para excluir.');
    }
  }
  
  function deletarAnexoChamado(checkboxChecked,url) {
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
      fetch('/deletar/anexo/ordem/' + id, {
        method: 'POST'
      }).then(function(response) {
        if (response.ok) {
          alert('Anexo excluído com sucesso!');
          window.location.reload();
        } else {
          alert('Erro ao excluir o anexo.');
        }
      });
    }
  }
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
  
