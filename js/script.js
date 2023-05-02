

const btn_sair = document.querySelector(".sair");
const btn_config = document.querySelector(".config");

btn_sair.addEventListener("click", () => {
    const confirmLogout = confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
        window.location.pathname = "../public/Login_v1/index.html"
    }
})





btn_config.addEventListener("click", () => {
    alert("aqui vai abrir as configurações")
})




// Selecionar os itens clicado
var itemMenu = document.querySelectorAll('.item-menu')
function selectlink() {
    itemMenu.forEach((item) =>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo')
}

itemMenu.forEach((item) =>
    item.addEventListener('click', selectlink)
)
//expandir o menu







// pop up de equipamento
var btnExp = document.querySelector('#btn-exp')
var menuLateral = document.querySelector('.menu-lateral')

btnExp.addEventListener('click', function () {
    menuLateral.classList.toggle('expandir')
})

function showPopup() {
    document.getElementById("popup").style.display = "block";
    document.querySelector(".overlay").style.display = "block";
}

function hidePopup() {
    document.getElementById("popup").style.display = "none";
    document.querySelector(".overlay").style.display = "none";

}

function saveEquipment() {
    var tag = document.getElementById("tag").value;
    alert("O equipamento " + tag + " foi cadastrado com sucesso!");

    hidePopup();
}



//dashboard
// Selecionar os itens clicado
var itemMenu = document.querySelectorAll('.item-menu')
function selectlink() {
    itemMenu.forEach((item) =>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo')
}

itemMenu.forEach((item) =>
    item.addEventListener('click', selectlink)
)
//expandir o menu

var btnExp = document.querySelector('#btn-exp')
var menuLateral = document.querySelector('.menu-lateral')

btnExp.addEventListener('click', function () {
    menuLateral.classList.toggle('expandir')
})  

// Seletor dos links
var links = document.querySelectorAll('.item-menu a');

// Seletor das tabelas
var tabelas = document.querySelectorAll('.tabela');

// Exibir tabela relevante quando o link for clicado
function showTabela(event) {
  // Prevenir o comportamento padrão de clicar em um link
  event.preventDefault();
  
  // Ocultar todas as tabelas
  for (var i = 0; i < tabelas.length; i++) {
    tabelas[i].style.display = 'none';
  }
  
  // Encontrar a tabela relevante para o link clicado
  var id = this.getAttribute('data-tabela');
  var tabela = document.getElementById(id);
  
  // Exibir a tabela relevante
  if (tabela) {
    tabela.style.display = 'block';
  }
}

// Vincular evento de clique a todos os links
for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', showTabela);
}

  


function converterParaMaiuscula(elemento) {
    elemento.value = elemento.value.toUpperCase();
}


// Selecionar os itens clicado
var itemMenu = document.querySelectorAll('.item-menu')
function selectlink(){
    itemMenu.forEach((item)=>
        item.classList.remove('ativo')
    )
    this.classList.add('ativo')
}

itemMenu.forEach((item)=>
    item.addEventListener('click',selectlink)
)
// Seleciona todos os links do menu lateral
const links = document.querySelectorAll('.item-menu a');

// Para cada link, adiciona um evento de clique
links.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault(); // Previne a ação padrão do link

    // Esconde todas as tabelas
    const tabelas = document.querySelectorAll('.table-container table');
    tabelas.forEach(tabela => {
      tabela.style.display = 'none';
    });

    // Exibe a tabela correspondente ao link clicado
    const tabelaSelecionada = link.dataset.table;
    const tabela = document.querySelector(`#${tabelaSelecionada}`);
    tabela.style.display = 'table';
  });
});

// Oculta todas as tabelas menos a de técnicos
const tabelas = document.querySelectorAll('.table-container table');
tabelas.forEach(tabela => {
  if (tabela.id !== 'table-tecnicos') {
    tabela.style.display = 'none';
  }
});

// selecionar tabela atraves do dashboard

var btnExp = document.querySelector('#btn-exp');
var menuLateral = document.querySelector('.menu-lateral');

btnExp.addEventListener('click', function () {
  menuLateral.classList.toggle('expandir');
});

var itemMenu = document.querySelectorAll('.menu-lateral a');

function selectLink() {
  itemMenu.forEach((item) =>
    item.classList.remove('ativo')
  )
  this.classList.add('ativo')
}

itemMenu.forEach((item) =>
  item.addEventListener('click', selectLink)
)

var MenuItem = document.querySelectorAll('.item-menu')
var tabelaTecnicosOnly = document.querySelector('.tabela-tecnicos-only')

function selectLink(){
  MenuItem.forEach((item) =>
    item.classList.remove('ativo')
  ) 
  this.classList.add('ativo')

  // verifica se o link clicado é para a tabela de técnicos e exibe ou oculta a seção correspondente
  if (this.getAttribute('data-table') === 'tabela-tecnicos') {
    tabelaTecnicosOnly.style.display = 'block'
  } else {
    tabelaTecnicosOnly.style.display = 'none'
  }
}

MenuItem.forEach((item) =>
  item.addEventListener('click', selectLink)
)

// Seleciona todos os links do menu lateral
const linksMenu = document.querySelectorAll('.item-menu a');

// Adiciona um manipulador de eventos para cada link do menu lateral
linksMenu.forEach(link => {
  link.addEventListener('click', () => {
    // Obtém o valor do atributo data-table do link
    const tabela = link.getAttribute('data-table');
    
    // Seleciona o cabeçalho de dados da seção de cadastro
    const cabecalhoTabela = document.querySelector('#cabecalho-tabela');
    
    // Seleciona o título da tabela da seção de cadastro
    const tituloTabela = document.querySelector('#titulo-tabela');
    
    // Atualiza o texto do cabeçalho de dados da seção de cadastro com base no valor do atributo data-table do link
    switch (tabela) {
      case 'tabela-tecnicos':
        cabecalhoTabela.textContent = 'Nomes dos Técnicos:';
        tituloTabela.textContent = 'Cadastrar Técnicos';
        break;
      case 'tabela-locais':
        cabecalhoTabela.textContent = 'Nomes dos Locais:';
        tituloTabela.textContent = 'Cadastrar Locais';
        break;
      case 'tabela-servicos':
        cabecalhoTabela.textContent = 'Nomes dos Serviços:';
        tituloTabela.textContent = 'Cadastrar Serviços';
        break;
      case 'tabela-tipos-arcondicionados':
        cabecalhoTabela.textContent = 'Tipos de Arcondicionados:';
        tituloTabela.textContent = 'Cadastrar Arcondicionados';
        break;
      default:
        cabecalhoTabela.textContent = 'Nomes dos Dados:';
        tituloTabela.textContent = 'Cadastrar Dados';
        break;
    }
  });
});
