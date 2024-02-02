
const btn_config = document.querySelector(".config");
// const btn_sair = document.querySelector(".sair");

const dados_chamado =document.querySelectorAll(".section_chamado").style.display="none"

btn_config.addEventListener("click", () => {
    alert("aqui vai abrir as configurações")
})


  // Recupera o email armazenado no localStorage

  


// functions



function showPopup() {
  document.getElementById("popup").style.display = "block";
  document.querySelector(".overlay").style.display = "block";
  document.body.style.overflow = 'hidden';  // Desabilita a rolagem do corpo da página
}

function showPopupEditar() {
  document.getElementById("popup-edit").style.display = "block";
  document.querySelector(".overlay-edit").style.display = "block";
}
function showPopupEditarTec() {
  document.getElementById("popup-tecnico").style.display = "block";
  document.querySelector(".overlay-tec").style.display = "block";
}

function showPopupEditarSetor() {
  document.getElementById("popup-setores").style.display = "block";
  document.querySelector(".overlay-setores").style.display = "block";
}

function showPopupEditartipoEquip() {
  document.getElementById("popup-Tipos").style.display = "block";
  document.querySelector(".overlay-Tipos").style.display = "block";
}


function hidePopup() {
  document.getElementById("popup").style.display = "none";
  document.querySelector(".overlay").style.display = "none";
  document.body.style.overflow = 'auto'; 
  document.getElementById("popup-edit").style.display = "none";
  document.querySelector(".overlay-edit").style.display = "none";
}

function saveEquipment() {
  var tag = document.getElementById("tag").value;
  alert("O equipamento " + tag + " foi cadastrado com sucesso!");
  hidePopup();
}

function hideElements() {
  var elements = document.querySelectorAll('.section_chamado');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add('display_none');
  }
  var elements = document.querySelector('.section_order').classList.remove("display_none");
}
function showElements() {
  var elements = document.querySelectorAll('.section_chamado');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('display_none');
  }
  var elements = document.querySelector('.section_order').classList.add("display_none");
  
}


function deletar(){
  confirm("Tem certeza que deseja excluir o chamado?")
  // Vincular o botão ao evento de clique
  document.getElementById("btnGeneratePDF").addEventListener("click", generatePDF);
 }
function imprimir(){
  print()
}

function salvarChamado(){
  const inputs = document.querySelectorAll(".data-chamado")
  alert("Chamado criado com sucesso!")
  setTimeout(() => {
    inputs.forEach(function(input) {
      input.value = '';
    });
  }, 2000);
  
}
function deletarChamado(){
  const inputs = document.querySelectorAll(".data-chamado")
  confirmDelete = confirm("Tem certeza que deseja excluir esse chamado?") 
  if(confirmDelete = true){
    inputs.forEach(function(input) {
      input.value = '';
    });
  }
  
}

function salvarOrdem(){
  const inputs = document.querySelectorAll(".data-chamado")
  alert("Ordem criado com sucesso!")
  setTimeout(() => {
    inputs.forEach(function(input) {
      input.value = '';
    });
  }, 2000);
  
}
function deletarOrdem(){
  const inputs = document.querySelectorAll(".data-chamado")
  confirmDelete = confirm("Tem certeza que deseja excluir esse chamado?") 
  if(confirmDelete = true){
    inputs.forEach(function(input) {
      input.value = '';
    });
  }
}

function deletarOrdem(){
  confirm("Tem certeza que deseja excluir a ordem?")
  // Vincular o botão ao evento de clique
  document.getElementById("btnGeneratePDF").addEventListener("click", generatePDF);
 }
function imprimirOrdem(){
  print()
}


function showPopupOrdem() {
  document.getElementById("popupOrdem").style.display = "block";
  document.querySelector(".overlayOrdem").style.display = "block";
  document.body.style.overflow = 'hidden';
}


function showPopupOrdem() {
  document.getElementById("popupOrdem").style.display = "block";
  document.querySelector(".overlayOrdem").style.display = "block";
}
function hidePopupOrdem() {
  document.getElementById("popupOrdem").style.display = "none";
  document.querySelector(".overlayOrdem").style.display = "none";
  document.body.style.overflow = 'auto'

}
