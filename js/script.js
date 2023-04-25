

const btn_sair = document.querySelector(".sair");
const btn_config = document.querySelector(".config");

btn_sair.addEventListener("click", ()=>{
    const confirmLogout = confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
        window.location.pathname ="../public/Login_v1/index.html"   
    }
    })


    
btn_config.addEventListener("click", ()=>{
    alert("aqui vai abrir as configurações")
    })    




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
//expandir o menu







// pop up de manutenção
var btnExp = document.querySelector('#btn-exp')
var menuLateral = document.querySelector('.menu-lateral')

btnExp.addEventListener('click',function(){
    menuLateral.classList.toggle('expandir')
})   

function showPopup() {
    document.getElementById("popup").style.display= "block";
    document.querySelector(".overlay").style.display = "block";
}

function hidePopup() {
    document.getElementById("popup").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
    
}

function saveEquipment() {
    
    alert("O equipamento foi cadastrado com sucesso na categoria " );

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