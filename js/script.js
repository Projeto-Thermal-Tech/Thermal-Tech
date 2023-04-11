
const btn_sair = document.querySelector(".sair");

      btn_sair.addEventListener("click", ()=>{
        const confirmLogout = confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
        window.location.pathname ="../public/Login_v1/index.html"
       
    }
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

var btnExp = document.querySelector('#btn-exp')
var menuLateral = document.querySelector('.menu-lateral')

btnExp.addEventListener('click',function(){
    menuLateral.classList.toggle('expandir')
})   