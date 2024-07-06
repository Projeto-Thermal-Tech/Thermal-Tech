function AbrirPopupFeedback() {
  document.getElementById('feedbackModal').style.display = 'block';
}
function FecharPopupFeedback() {
  document.getElementById('feedbackModal').style.display = 'none';
}

function AbrirPopupSuporte() {
  document.getElementById('suporteModal').style.display = 'block';
}
function FecharPopupSuporte() {
  document.getElementById('suporteModal').style.display = 'none';
}

document.getElementsByClassName('feedback-close')[0].onclick = function() {
  FecharPopupFeedback();
}
document.getElementsByClassName('suporte-close')[0].onclick = function() {
  FecharPopupSuporte();
}

window.onclick = function(event) {
  if (event.target == document.getElementById('feedbackModal')) {
      FecharPopupFeedback();
  }
}

window.onclick = function(event) {
  if (event.target == document.getElementById('suporte-close')) {
    FecharPopupSuporte();
  }
}



document.addEventListener("DOMContentLoaded", function() {
  var isAnonymous = false;

  function enableAnonymous(event) {
    event.preventDefault();
    isAnonymous = true;
    document.getElementById('NomeFeedback').value = ''; // Limpa o campo de nome
    document.getElementById('userEmailInput').value = ''; // Limpa o campo de e-mail
    document.getElementById('NomeFeedback').style.display = 'none';
    document.querySelector('label[for="userName"]').style.display = 'none';
    document.getElementById('userEmailInput').style.display = 'none';
    document.querySelector('label[for="userEmailInput"]').style.display = 'none';
  }

  function resetForm() {
    isAnonymous = false;
    document.getElementById('NomeFeedback').value = ''; // Limpa o campo de nome
    document.getElementById('userEmailInput').value = ''; // Limpa o campo de e-mail
    document.getElementById('NomeFeedback').style.display = 'block';
    document.querySelector('label[for="userName"]').style.display = 'block';
    document.getElementById('userEmailInput').style.display = 'block';
    document.querySelector('label[for="userEmailInput"]').style.display = 'block';
  }

  const anonymousButton = document.getElementById("EnviarAnonimamenteButton");
  const closeFeedbackButton = document.querySelector(".feedback-close");

  if (anonymousButton) {
    anonymousButton.onclick = enableAnonymous;
  }

  if (closeFeedbackButton) {
    closeFeedbackButton.onclick = function() {
      feedbackModal.style.display = "none";
      resetForm();
    };
  }
});

function EnviadoFeedback() {
  alert("Seu feedback foi enviado com sucesso!");
  hidePopup();
}

function EnviadoSuporte() {
  alert("Obrigado por relatar o problema! Nossa equipe já está investigando e trabalhando para corrigi-lo.");
}

document.getElementById('suporteArquivos').addEventListener('change', function() {
  var fileInput = this;
  var imagePreviewContainer = document.getElementById('imagePreviewContainer');
  imagePreviewContainer.innerHTML = ''; // Limpa a pré-visualização anterior

  // Verifica se o navegador suporta FileReader e se um arquivo foi selecionado
  if (window.FileReader && fileInput.files && fileInput.files[0]) {
    var file = fileInput.files[0];

    // Verifica se o arquivo é um PDF
    if (file.type === 'application/pdf') {
      alert('Formato PDF não é válido. Por favor, selecione um arquivo de imagem.');
      fileInput.value = ''; // Limpa o input de arquivo
      return; // Interrompe a execução da função
    }

    var reader = new FileReader();

    // Função que será chamada quando o FileReader terminar de ler o arquivo
    reader.onload = function(e) {
      var img = new Image();
      img.src = e.target.result;
      img.style.maxWidth = '200px';
      img.style.maxHeight = '200px';
      imagePreviewContainer.appendChild(img);
    };
    reader.readAsDataURL(file);
  }
});