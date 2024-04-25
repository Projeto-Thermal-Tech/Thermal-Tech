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

document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("userModal");
    const openModalLink = document.querySelector(".links-dash a"); 
    const closeModalButton = modal.querySelector(".user-close"); 
  
    if (modal && openModalLink && closeModalButton) {
      openModalLink.onclick = function() {
        modal.style.display = "block";
      };
  
      closeModalButton.onclick = function() {
        modal.style.display = "none";
      };
  
      window.onclick = function(event) {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      };
    }
  });  

document.getElementById('userPhone').addEventListener('input', function (e) {
    const target = e.target, position = target.selectionEnd, length = target.value.length;
    
    target.value = target.value.replace(/\D/g, '');
    target.value = target.value.replace(/^(\d{2})(\d)/g, "($1) $2");
    target.value = target.value.replace(/(\d)(\d{4})$/, "$1-$2");
    
    if (position !== length) {
      target.setSelectionRange(position, position);
    }
});