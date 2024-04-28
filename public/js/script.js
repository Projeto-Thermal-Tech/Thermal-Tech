
function mostrarUser() {
  const userEmail = localStorage.getItem("userEmail");
  const EmailCriador = document.getElementById("email")

  // Insere o email no elemento HTML correspondente
  document.getElementById("userEmail").innerHTML = userEmail;
  EmailCriador.value = userEmail;
}
mostrarUser()
let lastNotification = null;

async function fetchNotification() {
    const response = await fetch('http://localhost:5000/notification');
    const data = await response.json();

    if (data && data !== lastNotification) {
      const message = "Novo chamado criado: " + data.id_chamado;       
         $.notify(message, "success");
         fetch('http://localhost:5000/executarPython')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao executar o script Python');
        }
        console.log('Script Python executado com sucesso');
    })
    .catch(error => console.error(error));
        lastNotification = data;
    }
}

setInterval(fetchNotification, 5000);


const btn_config = document.querySelector(".config");
const dados_chamado =document.querySelectorAll(".section_chamado").style.display="none"


btn_config.addEventListener("click", () => {
    alert("aqui vai abrir as configurações")
})

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
function saveTecnico() {
  var nome_tec = document.getElementById("tag").value;
  alert("O Técnico " + nome_tec + " foi cadastrado com sucesso!");
  hidePopup();
}
function saveType() {
  var nome_Type = document.getElementById("nome_tipo").value;
  alert("O Tipo de equipamento " + nome_Type + " foi cadastrado com sucesso!");
  hidePopup();
}
function saveSetor() {
  var nome_setor = document.getElementById("nome").value;
  alert("O Setor " + nome_setor + " foi cadastrado com sucesso!");
  hidePopup();
}
function saveEquipmentEdit(){
  var tag = document.getElementById("tag").value;
  alert("O equipamento " + tag + " foi atualizado com sucesso!");
  hidePopup();
}
function saveTecEdit() {
  var nome_tec = document.getElementById("nome_tec").value;
  alert("O Tipo de equipamento " + nome_tec + " foi cadastrado com sucesso!");
  hidePopup();
}
function saveSetorEdit() {
  var nome_tec = document.getElementById("nome_setor").value;
  alert("O Tipo de equipamento " + nome_tec + " foi cadastrado com sucesso!");
  hidePopup();
}
function saveEquipEdit(){
  var tag = document.getElementById("tipos_arcondicionado_tipar").value;
  alert("O equipamento " + tag + " foi atualizado com sucesso!");
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
  localStorage.setItem('Chamado', 'true');
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
  document.body.style.overflow = 'hidden';
}

function hidePopupOrdem() {
  document.getElementById("popupOrdem").style.display = "none";
  document.querySelector(".overlayOrdem").style.display = "none";
  document.body.style.overflow = 'auto'

}

function preencherNomeTec(listaTecs) {
  if (!listaTecs) {
      console.error('listaTecs está vazia');
      return;
  }
  let tecnicos;
  try {
      tecnicos = JSON.parse(decodeURIComponent(listaTecs));
  } catch (error) {
      console.error('Erro ao analisar listaTecs:', error);
      return;
  }
  const idTec = parseInt(document.getElementById('matricula').value);
  const tecnico = tecnicos.find(tec => tec.matricula_tec === idTec);
  if (tecnico) {
      document.getElementById('nomeTec').value = tecnico.nome_tec;
  } else {
      document.getElementById('nomeTec').value = '';
  }
}

window.addEventListener('load', function () {
  fetch('/proximo-numero-ordem')
      .then(response => response.json())
      .then(data => {
          // Atualize o valor do campo de entrada com o próximo número da ordem
          document.getElementById('ordem').value = data.proximaOrdem;
      })
      .catch(error => console.error(error));
});




