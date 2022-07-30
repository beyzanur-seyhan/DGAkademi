const user = {
    name:"Beyzanur",
    password:"1234",
};

function DoLoginSystem(){

    ValidateUserLogin() ? alert("Giriş Başarılı!") : alert("Giriş Başarısız!")
    
}

function ValidateUserLogin(){

    let userName = document.getElementById("userName");

    let password = document.getElementById("password");

    let result;

    userName.value === user.name && password.value === user.password ? result = true : result = false

    return result;

}