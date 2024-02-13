function pesquisar() {
    const numeroOrdem = document.getElementById('numeroOrdem').value;
  
    // Verificar se o campo de entrada está vazio
    if (!numeroOrdem) {
      alert("Por favor, insira um número de ordem para pesquisar.");
      return; // Não execute a pesquisa
    }
  
    const tabela = document.getElementById('tabelaManutencoes');
    const linhas = tabela.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const limparFiltroButton = document.querySelector('button[onclick="limparFiltro()"]');
    
    let ordemExiste = false;
  
    for (let i = 0; i < linhas.length; i++) {
      const colunaOrdem = linhas[i].getElementsByTagName('td')[0];
      if (colunaOrdem) {
        const textoOrdem = colunaOrdem.textContent || colunaOrdem.innerText;
        if (textoOrdem === numeroOrdem) {
          linhas[i].style.display = '';
          limparFiltroButton.style.display = 'block'; // Mostrar o botão "Limpar Filtro"
          ordemExiste = true;
        } else {
          linhas[i].style.display = 'none';
        }
      }
    }
  
    if (!ordemExiste) {
      alert("Essa ordem de equipamento não existe.");
      document.getElementById('numeroOrdem').value = ''; // Limpa o campo de entrada
      // Restaurar todas as linhas para visível
      for (let i = 0; i < linhas.length; i++) {
        linhas[i].style.display = '';
      }
      return; // Não execute a pesquisa
    }
  }

  function limparFiltro() {
    const tabela = document.getElementById('tabelaManutencoes');
    const linhas = tabela.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const limparFiltroButton = document.querySelector('button[onclick="limparFiltro()"]');
  
    for (let i = 0; i < linhas.length; i++) {
      linhas[i].style.display = '';
    }
    
    document.getElementById('numeroOrdem').value = ''; // Limpa o campo de pesquisa
    limparFiltroButton.style.display = 'none'; // Oculta o botão "Limpar Filtro"
  }