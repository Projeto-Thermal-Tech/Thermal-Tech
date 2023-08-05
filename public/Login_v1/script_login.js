
// Add this code to the login page JavaScript file
firebase.auth().onAuthStateChanged(user => {
  if (user) {
      window.location.href = "../pages/home.html";
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
    }).catch((error) => {
      hideloading();
      alert("Usuario não encontrado");
    });
}
function newCont() {
  window.location.href = "./criar.html";
}

// function register() {
//     showLoading();
//     let email = document.getElementById("email").value;
//     let password = document.getElementById("password").value;
//     firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
//         hideloading()
//         window.location.href ='../pages/home.html'
//     }).catch(error =>{
//         hideloading()
//         alert(error)
//     })
//   }

function register() {
    showLoading();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (!passwordRegex.test(password)) {
      alert('Senha fraca! A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.');
  } else{
    firebase.auth().createUserWithEmailAndPassword(email,password).then(()=>{
      hideloading()
      window.location.href ='../pages/home.html'
  }).catch(error =>{
      hideloading()
      alert(error)
  })
  }

}













function recoverPassword(){
    let email = document.getElementById("email").value;
    showLoading()
    firebase.auth().sendPasswordResetEmail(email).then(()=>{
        hideloading()
        alert("email enviado com sucesso")
    }).catch(error =>{
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
