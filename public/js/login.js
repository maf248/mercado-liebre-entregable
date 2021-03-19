const qs = (text) => document.querySelector(text);
const qsa = (text) => document.querySelectorAll(text);

const loginForm = qs("#loginForm")

const user = qs('#user')
const userError = qs('#userError')
const password = qs('#password')
const passwordError = qs('#passwordError')

var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var passwordformat = /^(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

user.addEventListener('change', (e) => {
    if (!user.value.match(mailformat)) {
        userError.innerHTML = `<p> Debe ingresar un mail valido </p>`
        userError.style.textAlign = "center"
        userError.style.color = "red"
        userError.style.fontSize = "1.5rem"

    } else {
        userError.innerHTML = "" 
    }
})
password.addEventListener('change', (e) => {
    if (!password.value.match(passwordformat)) {
        passwordError.innerHTML = `<p> Debe tener 8 caracteres, incluyendo una mayúscula, una minúscula, un numero y un simbolo </p>`
        passwordError.style.textAlign = "center"
        passwordError.style.color = "red"
        passwordError.style.fontSize = "1.5rem"

    } else {
    
        passwordError.innerHTML = "" 
    }
})

loginForm.addEventListener('submit', (e) => {

    if(!user.value.match(mailformat) || !password.value.match(passwordformat)) {
        e.preventDefault()
       if(!password.value.match(passwordformat)) {
        passwordError.innerHTML = `<p> Debe tener 8 caracteres, incluyendo una mayúscula, una minúscula, un numero y un simbolo </p>`
        passwordError.style.textAlign = "center"
        passwordError.style.color = "red"
        passwordError.style.fontSize = "1.5rem"
       }
    } 

})

/*---Show/hide password---*/
const showPassword = qs('#showPassword')

showPassword.addEventListener('mousedown', () => {
    if(password.getAttribute('type') == 'password') {
        password.setAttribute('type', 'text')
        showPassword.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        password.setAttribute('type', 'password')
        showPassword.innerHTML = '<i class="fas fa-eye"></i>';
    }
});

password.addEventListener('blur', () => {
    if(password.getAttribute('type') != 'password') {
        password.setAttribute('type', 'password')
        showPassword.innerHTML = '<i class="fas fa-eye"></i>';
    } 
    
});