
const btn_sair = document.querySelector(".sair");

      btn_sair.addEventListener("click", ()=>{
        const confirmLogout = confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
        window.location.pathname ="../public/Login_v1/index.html"
       
    }
      })

