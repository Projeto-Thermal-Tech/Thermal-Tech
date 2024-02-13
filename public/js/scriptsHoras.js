function mostrarDados(ordens){
    const selectElement = document.getElementById('selectTec'); //Pega o elemento select
    const Tecnicolecionado = selectElement.value; // pega o id do técnico selecionado
    if(Tecnicolecionado){//verifica se existe um tec 
        const ordensObj = JSON.parse(ordens); // trasnforma o 'ordens' que vem do banco, e trasnforma em objeto javascript
        const ordensFiltradas = ordensObj.filter(ordem => ordem.matricula_tec.toString() === Tecnicolecionado.toString());//aqui ele filtra as ordens que possui o tec selecionado, e tranforma os valores de número para string
        
        document.getElementById('tbody').innerHTML=''

        ordensFiltradas.forEach(ordem => {//aqui ele pega as ordens filtradas e usa um loop para criar os elementos da tabela de acordo com o número de ordens
            let tr = document.createElement('tr');
            let tdOrdem = document.createElement('td');
            let tdTipoManut = document.createElement('td');
            let tdHorasTrabalhadas = document.createElement('td');
            let tdDataInit = document.createElement('td');
            let tdDataFim = document.createElement('td');

            tdOrdem.innerHTML = ordem.id_ordem; // aqui já esta adicinando os valores em cada célula da tabela
            tdTipoManut.innerHTML = ordem.nome_manut;
            tdHorasTrabalhadas.innerHTML = ordem.horas_trabalhadas;
            tdDataInit.innerHTML = formatarData(ordem.data_ini_trab);
            tdDataFim.innerHTML = formatarData(ordem.data_fim_trab);

            tr.appendChild(tdOrdem); // aqui ele esta adicionado os elementos abaixo do tr criado
            tr.appendChild(tdTipoManut);
            tr.appendChild(tdHorasTrabalhadas);
            tr.appendChild(tdDataInit);
            tr.appendChild(tdDataFim);

            document.getElementById("tbody").appendChild(tr);//aqui coloca tudo dentro do tbody
        });
        
    }
}
function formatarData(data) {
    const dataObj = new Date(data);
    const dia = dataObj.getDate().toString().padStart(2, '0');
    const mes = (dataObj.getMonth() + 1).toString().padStart(2, '0'); // Mês começa em 0
    const ano = dataObj.getFullYear().toString();
    return `${dia}/${mes}/${ano}`;
}