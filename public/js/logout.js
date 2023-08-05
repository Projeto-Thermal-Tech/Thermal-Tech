



function logout(){
  
    const confirmLogout = confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
      firebase.auth().signOut().then(()=>{
        window.location.href = "http://localhost:5000/login"
      }).catch(()=>{
        alert("erro ao fazer logout")
      })
    }
  
  
  }