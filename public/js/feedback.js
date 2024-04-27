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
    document.getElementById('NomeFeedback').style.display = 'none';
    document.querySelector('label[for="userName"]').style.display = 'none';
    document.getElementById('userEmailInput').style.display = 'none';
    document.querySelector('label[for="userEmailInput"]').style.display = 'none';
  }

  function resetForm() {
    isAnonymous = false;
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
