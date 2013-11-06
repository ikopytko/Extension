var defaultOptions = {
    login: 'Your login',
    password: 'Your password'
};

(function() {

if (!('login' in localStorage))
        localStorage['login'] = defaultOptions['login'];
if (!('password' in localStorage))
        localStorage['password'] = defaultOptions['password'];

var inputLogin = document.querySelector('input[name="login"]');
inputLogin.value = localStorage['login'];
inputLogin.addEventListener('change', function() {
    localStorage['login'] = this.value;
}, false);

var inputPassw = document.querySelector('input[name="password"]');
inputPassw.value = localStorage['password'];
inputPassw.addEventListener('change', function() {
    localStorage['password'] = this.value;
}, false);

})();