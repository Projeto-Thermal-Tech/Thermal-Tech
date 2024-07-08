function logout(){
  
    const confirmLogout = confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
      localStorage.removeItem('uid');
      firebase.auth().signOut().then(()=>{
        window.location.href = "../Login_v1/index.html"
      }).catch(()=>{
        alert("erro ao fazer logout")
      })
    }
  
  
  }
  function logout404(){
  
    const confirmLogout = confirm("Você será redirecionado para tela de login");
    if (confirmLogout) {
      firebase.auth().signOut().then(()=>{
        window.location.href = "../Login_v1/index.html"
      }).catch(()=>{
        alert("erro ao fazer logout")
      })
    }
  
  
  }