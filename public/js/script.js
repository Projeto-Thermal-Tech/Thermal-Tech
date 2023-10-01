
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



