
const btn_config = document.querySelector(".config");
// const btn_sair = document.querySelector(".sair");

const dados_chamado =document.querySelectorAll(".section_chamado").style.display="none"

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


  // Função para gerar o PDF
  function generatePDF() {
    // Capturar a área específica da página que você deseja incluir no PDF.
    // Neste exemplo, iremos capturar todo o corpo da página, mas você pode ajustar
    // o seletor CSS para capturar apenas a área desejada.
    const element = document.body;

    // Opções de configuração do html2canvas
    const options = {
      scale: 2, // Aumentar a escala para melhor qualidade de imagem (opcional)
      useCORS: true // Permitir o uso de recursos externos (opcional)
    };

    // Capturar a imagem da página usando o html2canvas
    html2canvas(element, options).then(canvas => {
      // Obter os dados da imagem do canvas
      const imgData = canvas.toDataURL("image/png");

      // Configurar o tamanho do PDF para corresponder à imagem capturada
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4"
      });

      // Adicionar a imagem ao PDF
      pdf.addImage(imgData, "PNG", 0, 0);

      // Salvar o PDF (neste exemplo, o nome do arquivo será "pagina.pdf")
      pdf.save("pagina.pdf");
    });
  }

  // Vincular o botão ao evento de clique
  document.getElementById("btnGeneratePDF").addEventListener("click", generatePDF);
 }
function imprimir(){
  print()
}

function salvarChamado(){
  const inputs = document.querySelectorAll(".data-chamado")
  alert("Chamado criado com sucesso!")
  inputs.forEach(function(input) {
    input.value = '';
  });
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