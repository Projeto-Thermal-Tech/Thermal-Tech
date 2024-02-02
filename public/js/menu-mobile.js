let btnMenu = document.getElementById('btn-menu');
let btnFechar = document.getElementById('btn-fechar');
let menu = document.getElementById('menu-mobile');

btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu');
    btnFechar.classList.remove('hide');
});

btnFechar.addEventListener('click', () => {
    menu.classList.remove('abrir-menu');
    btnFechar.classList.add('hide');
});

// Adicione este evento para fechar o menu ao clicar no overlay
let overlayMenu = document.querySelector('.overlay-menu');
overlayMenu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu');
    btnFechar.classList.add('hide');
});

// Adicione este evento para fechar o menu ao clicar em um link do menu
let linksMenu = document.querySelectorAll('.menu-mobile a');
linksMenu.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('abrir-menu');
        btnFechar.classList.add('hide');
    });
});
