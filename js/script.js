
const btn_config = document.querySelector(".config");
// const btn_sair = document.querySelector(".sair");





btn_config.addEventListener("click", () => {
    alert("aqui vai abrir as configurações")
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




