function atualizarDataHora() {
    const dataOrdem = document.getElementById("data-init-ordem");
    const horaOrdem = document.getElementById("hora-init-ordem");
  
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
  setInterval(atualizarDataHora, 1000);

  // Chame a função uma vez para configurar os valores iniciais
  atualizarDataHora();  
  window.addEventListener('load', function () {
    fetch('/proximo-numero-ordem')
        .then(response => response.json())
        .then(data => {
            // Atualize o valor do campo de entrada com o próximo número da ordem
            document.getElementById('ordem').value = data.proximaOrdem;
        })
        .catch(error => console.error(error));
});
function mostrarDadosChamado(chamado, equipamentos) {
    const chamadosObj = JSON.parse(chamado);
    const equipamentosObj = JSON.parse(equipamentos);

    const numeroChamado = parseInt(document.getElementById('numeroChamado').value);

    const chamadoSelecionado = chamadosObj.find(chamado => chamado.id_chamado === numeroChamado);

    if (chamadoSelecionado) {
        // Função para formatar a data em um formato compatível com input date
        function formatarDataParaInputDate(data) {
            const dataObj = new Date(data);
            const ano = dataObj.getFullYear();
            const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0');
            const dia = dataObj.getDate().toString().padStart(2, '0');
            return `${ano}-${mes}-${dia}`;
        }

        // Encontre o equipamento correspondente com base no ID
        const idEquipamento = chamadoSelecionado.equipamento_cha;
        const equipamentoAssociado = equipamentosObj.find(equipamento => equipamento.id_equip === idEquipamento);

        if (equipamentoAssociado) {
            const prioridade = chamadoSelecionado.prioridade_cha;

            // Selecione o campo de rádio correto com base na prioridade
            if (prioridade === 1) {
                document.getElementById('priBaixa').checked = true;
            } else if (prioridade === 2) {
                document.getElementById('priMedia').checked = true;
            } else if (prioridade === 3) {
                document.getElementById('priAlta').checked = true;
            }

            // Preencha os campos do formulário com informações do chamado e equipamento
            document.getElementById('dataCampo').value = formatarDataParaInputDate(chamadoSelecionado.data_ini_cha);
            document.getElementById('horaCampo').value = chamadoSelecionado.hora_ini_cha;
            document.getElementById('descChaCampo').value = chamadoSelecionado.descricao_cha;
            document.getElementById('descricaoCampo').value = chamadoSelecionado.descri_cha;
            document.getElementById('criadorCampo').value = chamadoSelecionado.criado_por_cha;
            document.getElementById('emailCampo').value = chamadoSelecionado.email;
            document.getElementById('equipamentoCampo').value = equipamentoAssociado.tag_listequip;
            document.getElementById('setorCampo').value = equipamentoAssociado.nome_setor;
            document.getElementById('localidadeCampo').value = equipamentoAssociado.localidade_listequip;
            document.getElementById('descricaoEquipamentoCampo').value = equipamentoAssociado.descricao_listequip;
        } else {
            console.log("Equipamento não encontrado para este chamado");
            limparCampos(); // Adicionamos a limpeza dos campos aqui
        }
    } else {
        console.log("Chamado não encontrado");
        limparCampos(); // Adicionamos a limpeza dos campos aqui
    }
}
function limparCampos() {
    // Limpeza dos campos de input
    document.getElementById('dataCampo').value = '';
    document.getElementById('horaCampo').value = '';
    document.getElementById('descChaCampo').value = '';
    document.getElementById('descricaoCampo').value = '';
    document.getElementById('criadorCampo').value = '';
    document.getElementById('emailCampo').value = '';
    document.getElementById('equipamentoCampo').value = '';
    document.getElementById('setorCampo').value = '';
    document.getElementById('localidadeCampo').value = '';
    document.getElementById('descricaoEquipamentoCampo').value = '';
    // Limpeza dos campos de radio
    document.getElementById('priBaixa').checked = false;
    document.getElementById('priMedia').checked = false;
    document.getElementById('priAlta').checked = false;
}