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