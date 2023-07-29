firebase.auth().onAuthStateChanged(user =>{
    if(!user){
        window.location.pathname = "./Login_v1/index.html"
    }
   
})