function show(event){
    event.stopPropagation();
    mobileLinks.classList.toggle('show');
}

function hide(){
    mobileLinks.classList.remove('show');
}

function showModal(){
    document.body.classList.add('no-scroll');
    LoginModal.classList.add('show');  
}

function hideModal(){
    document.body.classList.remove('no-scroll');
    LoginModal.classList.remove('show');
    RegisterModal.classList.remove('show');
}

function ChangeModal(){
    LoginModal.classList.remove('show');
    RegisterModal.classList.add('show');
}

function backtologin(){
    LoginModal.classList.add('show');
    RegisterModal.classList.remove('show');   
}

const burgerMenu = document.querySelector('#burger-menu');
const mobileLinks = document.querySelector('#mobile-links');
burgerMenu.addEventListener('click', show);
document.addEventListener('click', hide);

const user = document.querySelectorAll('.user');
for (let i=0; i < user.length; i++){
    user[i].addEventListener('click', showModal);
}
const RegisterModal = document.querySelector('#register-modal');
const LoginModal = document.querySelector('#login-modal');
const closeModal = document.querySelectorAll('.modal-close');
for (i=0; i < closeModal.length; i++){
    closeModal[i].addEventListener('click', hideModal);
}
const changeModal = document.querySelector('#change-modal');
changeModal.addEventListener('click', ChangeModal);
const back = document.querySelector('#back');
back.addEventListener('click', backtologin);