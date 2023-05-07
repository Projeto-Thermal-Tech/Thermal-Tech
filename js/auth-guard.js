firebase.auth().onAuthStateChanged(user =>{
    if(!user){
        window.location.pathname = "../public/Login_v1/index.html"
    }
   
})