$(document).ready(() => {
    var regLogName = $("#login-name") //input nombre
        
        , regLogLastn = $("#login-lastname") //input apellido
        
        , row1 = $("#r1") //row de los input nombre y apellido
        
        , regLogEmail = $("#login-username") //input email
        
        , row2 = $("#r2") //row del input email
        
        , regLogc1 = $("#login-pass1") //input contraseña 1
        
        , row3 = $("#r3") //row del input contraseña 1
        
        , regLogc2 = $("#login-pass2") //input contraseña 2
        
        , row4 = $("#r4") //row del input contraseña 2
        
        , row5 = $("#r5") //row del boton registrate
        
        , registrar = $("#r5b") // boton registrate
        
        , row6 = $("#r6") //row del boton continuar registro
        
        , conregistrar = $("#r6b") //boton continuar registro
        
        , logEmail = $("#enter-email") //input email login
        
        , logPass = $("#enter-pass") //input contraseña login
        
        , acceder = $("#accede"); //boton para acceder o hacer login
    //funcion que corrobora que se hayan incluido todos los datos para darle click al boton de registrar
    var aux1 = false
        , aux2 = false
        , aux3 = false
        , vacio = "";

    function checkReg1() {
        var regname = regLogName.val();
        var reglastn = regLogLastn.val();
        var regemail = regLogEmail.val();
        if (regname.trim() == vacio) {
            regLogName.css({
                "border": "1px solid #d9534f"
            });
            aux1 = true;
        }
        if (reglastn.trim() == vacio) {
            regLogLastn.css({
                "border": "1px solid #d9534f"
            });
            aux2 = true;
        }
        if (regemail.trim() == vacio) {
            regLogEmail.css({
                "border": "1px solid #d9534f"
            });
            aux3 = true;
        }
    }
    registrar.click(() => {
        checkReg1();
        if (aux1 == false) {
            if (aux2 == false) {
                if (aux3 == false) {
                    row1.css({
                        "display": "none"
                    });
                    row2.css({
                        "display": "none"
                    });
                    row3.css({
                        "display": "block"
                    });
                    row4.css({
                        "display": "block"
                    });
                    row5.css({
                        "display": "none"
                    });
                    row6.css({
                        "display": "block"
                    });
                    //chequear el email
                }
                else {
                    regLogLastn.css({
                        "border": "1px solid #cccccc"
                    });
                    regLogName.css({
                        "border": "1px solid #cccccc"
                    });
                    aux3 = false;
                }
            }
            else {
                if (aux3 == false) {
                    regLogName.css({
                        "border": "1px solid #cccccc"
                    });
                    regLogEmail.css({
                        "border": "1px solid #cccccc"
                    });
                    aux2 = false;
                }
                else {
                    regLogName.css({
                        "border": "1px solid #cccccc"
                    });
                    aux2 = false;
                    aux3 = false;
                }
            }
        }
        else {
            if (aux2 == false) {
                if (aux3 == false) {
                    regLogLastn.css({
                        "border": "1px solid #cccccc"
                    });
                    regLogEmail.css({
                        "border": "1px solid #cccccc"
                    });
                    aux1 = false;
                }
                else {
                    regLogLastn.css({
                        "border": "1px solid #cccccc"
                    });
                    aux1 = false;
                    aux3 = false;
                }
            }
            else {
                if (aux3 == false) {
                    regLogEmail.css({
                        "border": "1px solid #cccccc"
                    });
                    aux1 = false;
                    aux2 = false;
                }
                else {
                    aux1 = false;
                    aux2 = false;
                    aux3 = false;
                }
            }
        }
    });
    //funcion que corrobora que se hayan incluido todos los datos para darle click al boton de continuar con el registro
    var aux4 = false
        , aux5 = false;

    function checkReg2() {
        var regcon1 = regLogc1.val();
        var regcon2 = regLogc2.val();
        if (regcon1.trim() == vacio) {
            regLogc1.css({
                "border": "1px solid #d9534f"
            });
            aux4 = true;
        }
        if (regcon2.trim() == vacio) {
            regLogc2.css({
                "border": "1px solid #d9534f"
            });
            aux5 = true;
        }
    }
    conregistrar.click(() => {
        checkReg2();
        if (aux4 == false) {
            if (aux5 == false) {
                regLogc1.css({
                    "border": "1px solid #cccccc"
                });
                regLogc2.css({
                    "border": "1px solid #cccccc"
                });
                //se registra
                alert(regLogName.val() + "," + regLogLastn.val() + "," + regLogEmail.val() + "," + regLogc1.val() + "," + regLogc2.val());
            }
            else {
                regLogc1.css({
                    "border": "1px solid #cccccc"
                });
                aux5 = false;
            }
        }
        else {
            if (aux5 == false) {
                regLogc2.css({
                    "border": "1px solid #cccccc"
                });
                aux4 = false;
            }
            else {
                aux4 = false;
                aux5 = false;
            }
        }
    });
    //funcion que corrobora que se hayan incluido todos los datos para darle click al boton de acceder
    var aux6 = false
        , aux7 = false;

    function checkLogin() {
        var logemail = logEmail.val();
        var logcon = logPass.val();
        if (logemail.trim() == vacio) {
            logEmail.css({
                "border": "1px solid #d9534f"
            });
            aux6 = true;
        }
        if (logcon.trim() == vacio) {
            logPass.css({
                "border": "1px solid #d9534f"
            });
            aux7 = true;
        }
    }
    acceder.click(() => {
        checkLogin();
        if (aux6 == false) {
            if (aux7 == false) {
                logEmail.css({
                    "border": "1px solid #cccccc"
                });
                logPass.css({
                    "border": "1px solid #cccccc"
                });
                //se hace login
                alert(logEmail.val() + "," + logPass.val());
            }
            else {
                logEmail.css({
                    "border": "1px solid #cccccc"
                });
                aux7 = false;
            }
        }
        else {
            if (aux7 == false) {
                logPass.css({
                    "border": "1px solid #cccccc"
                });
                aux6 = false;
            }
            else {
                aux6 = false;
                aux7 = false;
            }
        }
    });
    //ADICIONAL
    //funcion para cambio de comentarios
    var m1 = $("#m1")
        , m2 = $("#m2")
        , m3 = $("#m3")
        , j1 = $("#j1")
        , j2 = $("#j2")
        , j3 = $("#j3")
        , i = 0;
    var comentarios = () => {
        setInterval(() => {
            i++;
            if (i == 1) {
                m2.css({
                    "display": "block"
                });
                m3.css({
                    "display": "none"
                });
                m1.css({
                    "display": "none"
                });
                j2.css({
                    "display": "block"
                });
                j3.css({
                    "display": "none"
                });
                j1.css({
                    "display": "none"
                });
            }
            else if (i == 2) {
                m3.css({
                    "display": "block"
                });
                m1.css({
                    "display": "none"
                });
                m2.css({
                    "display": "none"
                });
                j3.css({
                    "display": "block"
                });
                j1.css({
                    "display": "none"
                });
                j2.css({
                    "display": "none"
                });
            }
            else {
                m1.css({
                    "display": "block"
                });
                m2.css({
                    "display": "none"
                });
                m3.css({
                    "display": "none"
                });
                j1.css({
                    "display": "block"
                });
                j2.css({
                    "display": "none"
                });
                j3.css({
                    "display": "none"
                });
                i = i - 3;
            }
        }, 10500);
    }
    setTimeout(() => {
        comentarios();
    }, 500);
}); //fin ready