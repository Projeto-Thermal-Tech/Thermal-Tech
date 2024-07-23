document.getElementById("equipamento").addEventListener("change", function () {
  const selectedOption = this.options[this.selectedIndex];
  const localidade = selectedOption.getAttribute("data-localidade");
  const setor = selectedOption.getAttribute("data-setor");
  const descricao = selectedOption.getAttribute("data-descricao");

  // Preencha os campos com os valores do equipamento selecionado
  document.getElementById("localidade").value = localidade;
  document.getElementById("setor").value = setor;
  document.getElementById("descricao").value = descricao;
});
 
 function atualizarDataHoraChamado() {
    const dataChamado = document.getElementById("dataChamado");
    const horaChamado = document.getElementById("horaChamado");
  
    const agora = new Date();
  
    // Formate a data no formato "yyyy-MM-dd" para o campo de data
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    const dataFormatada = `${ano}-${mes}-${dia}`;
    dataChamado.value = dataFormatada;
  
    // Formate a hora no formato "HH:mm" para o campo de hora
    const horaFormatada = agora.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    horaChamado.value = horaFormatada;
    
  }
  atualizarDataHoraChamado();

  document.getElementById('Img-Anexo').addEventListener('click', function() {
    document.getElementById('AnexarPDF').click(); // Aciona o clique no input file oculto
});
  // document.getElementById('btnSalvarAnexo').addEventListener('click', function() {
  //   showLoading();
  //   document.querySelector('.AnexoDoc').style.display = 'none';
  //   const criado_por = localStorage.getItem('userName');
  //   var fileInput = document.getElementById('AnexarPDF');
  //   if (fileInput.files.length > 0) {
  //     const createdAt = Date.now();
  //     var nomeArquivo = fileInput.files[0].name;
  //     var file = fileInput.files[0];
  //     var storageRef = firebase.storage().ref('AnexosChamados/' + `${createdAt}_${nomeArquivo}`);
  //     storageRef.put(file).then(function(snapshot) {
  //       storageRef.getDownloadURL().then(function(url) {
  //         fetch('/atualizar/anexoChamado', {
  //           method: 'POST',
  //           headers: {
  //             'Content-Type': 'application/json'
  //           },
  //           body: JSON.stringify({
  //             id_chamado: document.getElementById('idChamado').value,
  //             linkAnexo: url,
  //             nomeArquivo: nomeArquivo,
  //             createdAt: createdAt,
  //             criado_por_cha: criado_por,
  //           })
  //         }).then(function(response) {
  //           if (response.ok) {
  //             alert('Anexo criado com sucesso!');
  //             hideloading();         
  //             window.location.reload();
  //           } else {
  //             alert('Erro ao anexar o PDF.');
  //           }
  //         });
  //       });
  //     });
  //   }else{
  //     alert('Nenhum anexo foi criado!');
  //     hideloading();
  //     document.querySelector('.AnexoDoc').style.display = 'block';
  //   }
  // });
  var anexos = [];

function verAnexos(id_chamado) {
  document.getElementById('PopupAnexo').style.display = 'block';
  document.querySelector('.overlay-edit').style.display = 'block';

  const fileInput = document.getElementById('AnexarPDF');

  // Remove o event listener anterior, se existir
  fileInput.removeEventListener('change', handleFileChange);

  // Adiciona o event listener
  fileInput.addEventListener('change', handleFileChange);
}

let indiceAnexo =0
function handleFileChange() {
  alert('Arquivo carregado, mas não salvo. Clique em "Salvar" para anexar o arquivo.');
  var fileInput = document.getElementById('AnexarPDF');
  var createdAt = Date.now();
  var nomeArquivo = fileInput.files[0].name;
  var criado_por = localStorage.getItem('userName');
  const date = new Date(parseInt(createdAt)); // Converte o timestamp para um objeto Date
  const DateString = date.toISOString();
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const formattedDate = date.toLocaleDateString('pt-BR', options);
  const tbody = document.querySelector('.tbodyAnexos');
  const tr = document.createElement('tr');
  tr.classList.add('last-row');
  const td = document.createElement('td');
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.classList.add('file-select');
  input.value = nomeArquivo;
  input.setAttribute('data-custom-indice', indiceAnexo++);
  td.appendChild(input);
  tr.appendChild(td);
  const td2 = document.createElement('td');
  td2.textContent = nomeArquivo;
  tr.appendChild(td2);
  const TdCriadoPor = document.createElement('td');
  TdCriadoPor.textContent = criado_por;
  tr.appendChild(TdCriadoPor);
  const td3 = document.createElement('td');
  td3.textContent = formattedDate;
  tr.appendChild(td3);
  tbody.appendChild(tr);
  const anexo = {
    nomeArquivo: nomeArquivo,
    criadoPor: criado_por,
    dataCriacao: formattedDate,
    file: fileInput.files[0]
  };

  // Adicionando o objeto ao array de anexos
  anexos.push(anexo);
}
  
  function FecharPopupAnexo() {
    document.getElementById('PopupAnexo').style.display = 'none';
    document.querySelector('.overlay-edit').style.display = 'none';
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
        let checkboxChecked = checkbox.getAttribute('data-custom-indice');
        deletarAnexoChamado(checkboxChecked);
      }
    });
  
    if (!anyChecked) {
      alert('Selecione um anexo para excluir.');
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

async function salvarChamado() {
  showLoading()  
  const status = document.getElementsByName('status')[0].value;
  const chamado = document.getElementsByName('chamado')[0].value;
  const tag = document.getElementsByName('tag')[0].value;
  const prioridade = document.getElementsByName('prioridade')[0].value;
  const criador = document.getElementsByName('criador')[0].value;
  const email = document.getElementsByName('email')[0].value;
  const dataChamado = document.getElementsByName('dataChamado')[0].value;
  const horaChamado = document.getElementsByName('horaChamado')[0].value;
  const titleDesc = document.getElementsByName('titleDesc')[0].value;
  const desc = document.getElementsByName('desc')[0].value;

  // Validação de campos
  if (!status || !chamado || !tag || !prioridade || !criador || !email || !dataChamado || !horaChamado || !titleDesc || !desc) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  try {
    const response = await fetch('/cadastro/chamado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: status,
        chamado: chamado,
        tag: tag,
        titleDesc: titleDesc,
        prioridade: prioridade,
        criador: criador,
        email: email,
        dataChamado: dataChamado,
        horaChamado: horaChamado,
        desc: desc
      })
    });

    if (response.ok) {
      for (const anexo of anexos) {
        let timestamp = Date.now();
        var storageRef = firebase.storage().ref('AnexosChamados/' + `${timestamp}_${anexo.nomeArquivo}`);
        let file = anexo.file;
        await storageRef.put(file);
        let url = await storageRef.getDownloadURL();
        let anexoResponse = await fetch('/atualizar/anexoChamado', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_chamado: chamado,
            linkAnexo: url,
            nomeArquivo: anexo.nomeArquivo,
            createdAt: timestamp,
            criado_por_cha: anexo.criadoPor,
          })
        });

        if (!anexoResponse.ok) {
          alert('Erro ao anexar o PDF.');
        }
      }
      hideloading();
      alert('Chamado criado com sucesso!');
      window.location.reload();
    } else {
      alert('Erro ao criar o chamado.');
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Ocorreu um erro ao criar o chamado.');
  }

  const inputs = document.querySelectorAll(".data-chamado");
  setTimeout(() => {
    inputs.forEach(function(input) {
      input.value = '';
    });
  }, 2000);
}