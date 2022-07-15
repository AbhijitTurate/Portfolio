const hamburger=document.querySelector('.hamburger');
const navlinks = document.querySelector('.navLinks');
const links = document.querySelectorAll('navLinks li');
const logo=document.querySelector('.logo');
const navbar=document.querySelector('.navBar');
const cta=document.querySelector('.cta');


hamburger.addEventListener("click", () => {
    navlinks.classList.toggle('click')
    logo.classList.toggle('click')
    navbar.classList.toggle('click')
    cta.classList.toggle('click')
});