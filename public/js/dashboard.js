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

document.addEventListener("DOMContentLoaded", function () {
  // Obtenha a URL da foto do perfil do localStorage
  var photoURL = localStorage.getItem("userPhotoURL");

  // Verifique se a URL da foto do perfil existe
  if (photoURL === 'null') {
      // Se a URL da foto do perfil não existir, defina a URL padrão
      console.log("URL da foto do perfil não encontrada");
      var imgTag = document.querySelector('#icone');

      imgTag.scr = "../assets/icons8-usuário-50.png";
  } else {
      // Encontre a tag img que você deseja alterar
      var imgTag = document.querySelector('#icone');
      // Defina o atributo src da tag img para a URL da foto do perfil
      imgTag.src = photoURL;
      console.log("URL da foto do perfil encontrada");
  }
});

// function setUserImageOnLogin() {
//   // Obtém a URL da imagem do localStorage
//   const userPhotoURL = localStorage.getItem('userPhotoURL');

//   if (userPhotoURL) {
//       // Define a imagem de perfil do usuário
//       const output = document.getElementById('preview');
//       output.src = userPhotoURL;
//       output.style.display = 'block';

//       // Esconde o ícone do usuário
//       const icone = document.getElementById('icone');
//       icone.style.display = 'none';
//   }
// }

function previewImage(event) {
  const reader = new FileReader();
  reader.onload = function() {
      showLoading();
      const output = document.getElementById('preview');
      output.src = reader.result;
      output.style.display = 'block';

      // Esconde o ícone do usuário
      const icone = document.getElementById('icone');
      icone.style.display = 'none';

      // Salva a imagem no Firebase Storage
      const storageRef = firebase.storage().ref();
      const fileRef = storageRef.child('images/' + event.target.files[0].name);
      fileRef.put(event.target.files[0]).then(function(snapshot) {
          console.log('Imagem carregada com sucesso!');
          
          // Obtém a URL da imagem e salva no localStorage
          fileRef.getDownloadURL().then(function(url) {
              localStorage.setItem('userPhotoURL', url);
              const user = firebase.auth().currentUser;
              user.updateProfile({
                  photoURL: url
              }).then(function() {
                  console.log('Foto de perfil atualizada com sucesso');
                  alert('Foto de perfil atualizada com sucesso');
                  hideloading();
              }).catch(function(error) {
                  console.log('Erro ao atualizar a foto de perfil', error);
              });
          });
      });
  };
  reader.readAsDataURL(event.target.files[0]);
}