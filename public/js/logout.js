



function logout(){
  
    const confirmLogout = confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
      firebase.auth().signOut().then(()=>{
        window.location.href = "../Login_v1/index.html"
      }).catch(()=>{
        alert("erro ao fazer logout")
      })
    }
  
  
  }