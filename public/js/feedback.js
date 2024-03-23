var isAnonymous = false;

function AbrirPopupFeedback() {
  document.getElementById("popupfeedback").style.display = "block";
  document.querySelector(".overlayFeedback").style.display = "block";
}

function SalvarFeedback() {
  isAnonymous = false;
  resetForm();
  document.getElementById("popupfeedback").style.display = "none";
  document.querySelector(".overlayFeedback").style.display = "none";
}
function AbrirPopupSuporte() {
  document.getElementById("popupSuporte").style.display = "block";
  document.querySelector(".overlaySuporte").style.display = "block";
}

function SalvarSuporte() {
  document.getElementById("popupSuporte").style.display = "block";
  document.querySelector(".overlaySuporte").style.display = "block";
}

function EsconderpopouSuporte() {
  document.getElementById("popupSuporte").style.display = "none";
  document.querySelector(".overlaySuporte").style.display = "none";
}

function enableAnonymous() {
  isAnonymous = true;
  document.getElementById('NomeFeedback').style.display = 'none';
  document.getElementById('NomeFeedbackLabel').style.display = 'none';
  document.getElementById('emailFeed').style.display = 'none';
  document.getElementById('emailLabelFeed').style.display = 'none';
}

function resetForm() {
  if (!isAnonymous) {
    document.getElementById('NomeFeedback').style.display = 'block';
    document.getElementById('NomeFeedbackLabel').style.display = 'block';
    document.getElementById('emailFeed').style.display = 'block';
    document.getElementById('emailLabelFeed').style.display = 'block';
  }
}