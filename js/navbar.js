const setNavBar = () => {
    const hamburger = document.getElementById('hamburger');
    const brand = document.getElementById('navbar-brand');
    const menu = document.getElementById('navbar-menu');
    if(window.innerWidth > 850) {
        hamburger.style.display = 'none';
        menu.style.display = 'block';
    }else {
        hamburger.style.display = 'block';
        menu.style.display = 'none';
        brand.style.display = 'block';
        brand.style.marginLeft = '50px';
    }

}

const showMenu = () => {
    const menu = document.getElementById('navbar-menu');
    const hamIcon = document.getElementById('hamIcon');
    if(menu.style.display === 'none') {
        menu.style.display = 'block';
        hamIcon.src = "https://img.icons8.com/ios-filled/50/ffffff/delete-sign--v1.png";
    }else {
        hamIcon.src = "https://img.icons8.com/material-rounded/48/ffffff/menu--v4.png";
        menu.style.display = 'none';
    }
}



window.addEventListener('load', setNavBar);
window.addEventListener('resize', setNavBar);