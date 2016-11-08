$(document).ready(function () {
    var m1 = $("#m1") //parrafo 1 de Michelle
        
        , m2 = $("#m2") //parrafo 2 de Michelle
        
        , m3 = $("#m3") //parrafo 3 de Michelle
        
        , j1 = $("#j1") //parrafo 1 de Jose
        
        , j2 = $("#j2") //parrafo 2 de Jose
        
        , j3 = $("#j3") //parrafo 3 de Jose
        
        , signinEmail = $("#el") //input email del header
        
        , signinPass = $("#pl") // input password del header
        
        , accede = $("#accl"); // boton del header accede
    var Parrafos = function () {
        var i = 0;
        setInterval(function () {
            i++;
            if (i == 1) {
                m1.css({
                    "display": "block"
                });
                j1.css({
                    "display": "block"
                });
                m2.css({
                    "display": "none"
                });
                m3.css({
                    "display": "none"
                });
                j2.css({
                    "display": "none"
                });
                j3.css({
                    "display": "none"
                });
            }
            if (i == 2) {
                m1.css({
                    "display": "none"
                });
                j1.css({
                    "display": "none"
                });
                m2.css({
                    "display": "block"
                });
                m3.css({
                    "display": "none"
                });
                j2.css({
                    "display": "block"
                });
                j3.css({
                    "display": "none"
                });
            }
            if (i == 3) {
                m3.css({
                    "display": "block"
                });
                j3.css({
                    "display": "block"
                });
                m1.css({
                    "display": "none"
                });
                j1.css({
                    "display": "none"
                });
                m2.css({
                    "display": "none"
                });
                j2.css({
                    "display": "none"
                });
                i = i - 3;
            }
        }, 7500);
    }
    var Fondo = function () {
        var i = 0;
        setInterval(function () {
            i++;
            if (i == 1) {
                $(document.body).css({
                    "background": "-webkit-linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .3)), url(resources/css/img/Hero-min2.png)"
                });
                $(document.body).css({
                    "background": "linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .3)), url(resources/css/img/Hero-min2.png)"
                });
            }
            if (i == 2) {
                $(document.body).css({
                    "background": "-webkit-linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .3)), url(resources/css/img/Hero-min3.jpg)"
                });
                $(document.body).css({
                    "background": "linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .3)), url(resources/css/img/Hero-min3.jpg)"
                });
                i = i - 2;
            }
        }, 15000);
    }
    $(document.body).css({
        "background": "-webkit-linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .3)), url(resources/css/img/Hero-min2.png)"
    });
    $(document.body).css({
        "background": "linear-gradient(rgba(0, 0, 0, .6), rgba(0, 0, 0, .3)), url(resources/css/img/Hero-min2.png)"
    });
    m1.css({
        "display": "block"
    });
    j1.css({
        "display": "block"
    });
    Fondo();
    Parrafos();
    //funcion que corrobora que se hayan incluido todos los datos del login
    var aux1 = false
        , aux2 = false
        , vacio = "";

    function checkSignin() {
        var email = signinEmail.val();
        var password = signinPass.val();
        if (email.trim() == vacio) {
            signinEmail.css({
                border: "1px solid red"
            });
            aux1 = true;
        }
        if (password.trim() == vacio) {
            signinPass.css({
                border: "1px solid red"
            });
            aux2 = true;
        }
    }
});
accede.click(function () {
    checkSignin();
    if (aux1 == false) {
        if (aux2 == false) {
            signinEmail.css({
                border: "1px solid #DBE1EB"
            });
            signinPass.css({
                border: "1px solid #DBE1EB"
            });
            console.log("Tratamos de hacer login: ");
            $.ajax({
                url: "./login"
                , type: "POST"
                , data: {
                    email: signinEmail.val()
                    , pass: signinPass.val()
                }
                , success: function (data) {}
                , error: function (err) {
                    console.log(err);
                }
            });
        }
        else {
            aux2 = false;
            signinEmail.css({
                border: "1px solid #DBE1EB"
            });
        }
    }
    else {
        if (aux2 == false) {
            aux1 = false;
            signinPass.css({
                border: "1px solid #DBE1EB"
            });
        }
        else {
            aux1 = false;
            aux2 = false;
        }
    }
}); //fin oclick ACCEDE