function mostrarUser() {
    const userEmail = localStorage.getItem("userEmail");
    const EmailCriador = document.getElementById("email")
  
    // Insere o email no elemento HTML correspondente
    document.getElementById("userEmail").innerHTML = userEmail;
    EmailCriador.value = userEmail;
  }
  mostrarUser()