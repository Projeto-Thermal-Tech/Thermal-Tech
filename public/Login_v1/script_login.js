
// Add this code to the login page JavaScript file
firebase.auth().onAuthStateChanged(user => {
  if (user) {
    window.location.href = "http://localhost:5000/inicio";
  }
})

window.onload = function () {
  document.getElementById("login-form").elements[0].focus();
};

function signIn() {
  showLoading();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  localStorage.setItem("userEmail", email);
  

  firebase.auth().signInWithEmailAndPassword(email, password).then((response) => {
    hideloading();
    window.location.href = "http://localhost:5000/inicio";

    // Obtenha o usuário atualmente logado
    var user = firebase.auth().currentUser;

    if (user != null) {
      // O usuário está logado, obtenha a URL da foto do perfil
      var photoURL = user.photoURL;
      var displayName = user.displayName;

      // Armazene a URL da foto do perfil no localStorage
      localStorage.setItem("userPhotoURL", photoURL);
      localStorage.setItem("userName", displayName);
    }
  }).catch((error) => {
    hideloading();
    alert("Usuario não encontrado");
  });
}
function newCont() {
  window.location.href = "./criar.html";
}

async function register(event) {
  event.preventDefault(); // Evita o envio padrão do formulário

  await showLoading();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let fullName = document.getElementById("fullName").value;
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!email || !password || !fullName) {
      alert('Preencha todos os campos!');
      hideloading();
      return; // Retorna imediatamente se um dos campos estiver vazio
  }

  if (!passwordRegex.test(password)) {
      alert('Senha fraca! A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.');
      hideloading();
      return; // Retorna imediatamente se a senha for fraca
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
        // Usuário criado com sucesso, agora atualiza o displayName
        var user = userCredential.user;
        return user.updateProfile({
            displayName: fullName 
        }).then(() => {
            // Atualização de perfil bem-sucedida
            hideloading();
            window.location.href = '../pages/home.html';
        });
    }).catch((error) => {
        // Trata erros aqui
        hideloading();
        alert(error);
    });
}


function recoverPassword() {
  let email = document.getElementById("email").value;
  showLoading()
  firebase.auth().sendPasswordResetEmail(email).then(() => {
    hideloading()
    alert("email enviado com sucesso")
  }).catch(error => {
    hideloading();
    alert("email não encontrado")
  })

}













(function ($) {
  "use strict";

  /*==================================================================
    [ Validate ]*/
  var input = $(".validate-input .input100");

  $(".validate-form").on("submit", function () {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  });

  $(".validate-form .input100").each(function () {
    $(this).focus(function () {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr("type") == "email" || $(input).attr("name") == "email") {
      if (
        $(input)
          .val()
          .trim()
          .match(
            /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/
          ) == null
      ) {
        return false;
      }
    } else {
      if ($(input).val().trim() == "") {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass("alert-validate");
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass("alert-validate");
  }
})(jQuery);
