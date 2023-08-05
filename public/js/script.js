
const btn_config = document.querySelector(".config");
// const btn_sair = document.querySelector(".sair");


btn_config.addEventListener("click", () => {
    alert("aqui vai abrir as configurações")
})

document.addEventListener("DOMContentLoaded", function() {
  // Recupera o email armazenado no localStorage
  var userEmail = localStorage.getItem("userEmail");

  // Insere o email no elemento HTML correspondente
  document.getElementById("userEmail").textContent = userEmail;
});



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
}
function showElements() {
  var elements = document.querySelectorAll('.section_chamado');
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('display_none');
  }
}

function deletar(){
  confirm("Tem certeza que deseja excluir o chamado?")


}

