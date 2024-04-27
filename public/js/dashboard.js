function AbrirDashboard() {
    const dashboard = document.getElementById("dashboard");
    if (dashboard.style.display === "none") {
        dashboard.style.display = "block";
    } else {
        dashboard.style.display = "none";
    }
}

function closeDashboard() {
    var dashboard = document.getElementById('dashboard');
    dashboard.style.display = 'none';
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('preview');
        output.src = reader.result;
        output.style.display = 'block';
  
        // Esconde o ícone do usuário
        const icone = document.getElementById('icone');
        icone.style.display = 'none';
    };
    reader.readAsDataURL(event.target.files[0]);
  }

function AbiriPopupPerfilUsuario() {
  document.getElementById('userModal').style.display = 'block';
}

function FecharPopupPerfilUsuario() {
  document.getElementById('userModal').style.display = 'none';
}

document.getElementsByClassName('user-close')[0].onclick = function() {
  FecharPopupPerfilUsuario();
}

window.onclick = function(event) {
  if (event.target == document.getElementById('userModal')) {
    FecharPopupPerfilUsuario();
  }
}

document.getElementById('userPhone').addEventListener('input', function (e) {
    const target = e.target, position = target.selectionEnd, length = target.value.length;
    
    target.value = target.value.replace(/\D/g, '');
    target.value = target.value.replace(/^(\d{2})(\d)/g, "($1) $2");
    target.value = target.value.replace(/(\d)(\d{4})$/, "$1-$2");
    
    if (position !== length) {
      target.setSelectionRange(position, position);
    }
});