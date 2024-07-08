function showLoading() {
    const div = document.createElement("div");
    div.classList.add("loading");
    
    const span = document.createElement("span");
    span.classList.add("carregando");
    
    div.appendChild(span);
    document.body.insertBefore(div, document.body.firstChild);
    // document.getElementById('popup-edit').style.display = 'none';
  }
  
  
function hideloading(){
    const loadings = document.getElementsByClassName("loading");
    if(loadings.length){
        loadings[0].remove()
    }
}