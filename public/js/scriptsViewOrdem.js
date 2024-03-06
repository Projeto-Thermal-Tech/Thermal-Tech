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
  
