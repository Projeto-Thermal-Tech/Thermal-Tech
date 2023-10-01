firebase.auth().onAuthStateChanged(user =>{
    if(!user){
        window.location.pathname = "./Login_v1/index.html"
        var displayName = user.displayName; // Aqui você obtém o nome completo do usuário
    
        if (displayName) {
          // O usuário tem um displayName definido
          console.log('Nome completo do usuário:', displayName);
        } else {
          // O usuário não tem um displayName definido
          console.log('O usuário não tem um nome completo definido.');
        }
      } else {
        // O usuário não está autenticado
        console.log('Usuário não autenticado.');
    }
    
})