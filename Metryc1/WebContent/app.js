var app = angular.module("featapp", ["ui.router"]);
app.config(["$stateProvider", "$urlRouterProvider",

    function ($state, $url) {
        $url.otherwise("/home");
        // $url.when("/home", "/home/index");
        $state.state("home", {
            "url": "/home"
            , "templateUrl": "views/feat-principal.html"
            , "controller": "HomeCtrl"
        }).state("about", {
            "url": "/about"
            , "templateUrl": "views/feat-conocenos.html"
            , "controller": "AboutCtrl"
        }).state("desktop", {
            "url": "/desktop"
            , "templateUrl": "views/feat-editor.html"
            , "controller": "DesktopCtrl"
        })
    }
]);
app.controller("HomeCtrl", ["$scope", "$http", "$state", function ($scope, $http, $state) {
        $(document).ready(() => {
            var regLogName = $("#login-name"), // input nombre
                regLogLastn = $("#login-lastname"), // input apellido
                row1 = $("#r1"), // row de los input nombre y apellido
                regLogEmail = $("#login-username"), // input email
                row2 = $("#r2"), // row del input email
                regLogc1 = $("#login-pass1"), // input contraseña 1
                row3 = $("#r3"), // row del input contraseña 1
                regLogc2 = $("#login-pass2"), // input contraseña 2
                row4 = $("#r4"), // row del input contraseña 2
                row5 = $("#r5"), // row del boton registrate
                registrar = $("#r5b"), // boton registrate
                row6 = $("#r6"), // row del boton continuar registro
                conregistrar = $("#r6b"), // boton continuar registro
                logEmail = $("#enter-email"), // input email login
                logPass = $("#enter-pass"), // input contraseña login
                acceder = $("#accede"), // boton para acceder o hacer login
                alert1 = $("#alert1"), // wrong nombre y apellido en registro
                alert2 = $("#alert2"), // wrong email en registro
                alert3 = $("#alert3"), // wrong password en registro
                alert4 = $("#alert4"), // wrong email y password en inicio
                conocenos = $("#conocenos"); // boton para ir a la pantalla
												// de conocenos
            // click en el boton de conocenos
            conocenos.click(() => {
                $state.go('about');
            });
            // funcion que corrobora que se hayan incluido todos los datos para
			// darle
            // click al boton de registrar
            var aux1 = false
                , aux2 = false
                , aux3 = false
                , vacio = "";

           checkReg1= () => {
                var regname = regLogName.val()
                    , reglastn = regLogLastn.val()
                    , regemail = regLogEmail.val()
                    , pattemail = new RegExp("^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$")
                    , pattnames = new RegExp("^[A-Za-z]{3,15}$");
                if (regname.trim() == vacio) {
                    regLogName.css({
                        "border": "1px solid #d9534f"
                    });
                    alert1.css({
                        "display": "block"
                    });
                    aux1 = true;
                }
                else if (pattnames.test(regname.trim()) == false) {
                    regLogName.css({
                        "border": "1px solid #d9534f"
                    });
                    alert1.css({
                        "display": "block"
                    });
                    aux1 = true;
                }
                if (reglastn.trim() == vacio) {
                    regLogLastn.css({
                        "border": "1px solid #d9534f"
                    });
                    alert1.css({
                        "display": "block"
                    });
                    aux2 = true;
                }
                else if (pattnames.test(reglastn.trim()) == false) {
                    regLogLastn.css({
                        "border": "1px solid #d9534f"
                    });
                    alert1.css({
                        "display": "block"
                    });
                    aux2 = true;
                }
                if (regemail.trim() == vacio) {
                    regLogEmail.css({
                        "border": "1px solid #d9534f"
                    });
                    alert2.css({
                        "display": "block"
                    });
                    aux3 = true;
                }
                else if (pattemail.test(regemail.trim()) == false) {
                    regLogEmail.css({
                        "border": "1px solid #d9534f"
                    });
                    alert2.css({
                        "display": "block"
                    });
                    aux3 = true;
                }
            }
            registrar.click(() => {
                checkReg1();
                if (aux1 == false) {
                    if (aux2 == false) {
                        if (aux3 == false) {
                            alert1.css({
                                "display": "none"
                            });
                            alert2.css({
                                "display": "none"
                            });
                            var emailr1 = regLogEmail.val().trim().toLowerCase()
                                , request = {
                                    low: {
                                        package: 'jmlv.org.Metryc.SignUp'
                                        , method: 'CheckEmail(String)'
                                        , data: [emailr1]
                                    }
                                }
                            $.ajax({
                                url: "./Feat"
                                , type: "POST"
                                , dataType: "json"
                                , data: {
                                    request: JSON.stringify(request)
                                }
                                , success: data => {
                                    if (data.response.email[0].count == 0) {
                                        console.log("no existe el email");
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
                                    }
                                    else {
                                        console.log("existe el email");
                                        alert1.css({
                                            "display": "none"
                                        });
                                        regLogEmail.css({
                                            "border": "1px solid #d9534f"
                                        });
                                        alert2.css({
                                            "display": "block"
                                        });
                                    }
                                }
                                , error: err => {
                                    console.log(err); // err
                                }
                            });
                        }
                        else {
                            regLogLastn.css({
                                "border": "1px solid #cccccc"
                            });
                            regLogName.css({
                                "border": "1px solid #cccccc"
                            });
                            alert1.css({
                                "display": "none"
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
                            alert2.css({
                                "display": "none"
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
                            alert2.css({
                                "display": "none"
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
                            alert2.css({
                                "display": "none"
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
            // funcion que corrobora que se hayan incluido todos los datos para
			// darle
            // click al boton de continuar con el registro
            var aux4 = false
                , aux5 = false;

            checkReg2= () => {
                var regcon1 = regLogc1.val()
                    , regcon2 = regLogc2.val()
                    , pattpass = new RegExp("(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,12})$");
                if (regcon1.trim() == vacio) {
                    regLogc1.css({
                        "border": "1px solid #d9534f"
                    });
                    alert3.css({
                        "display": "block"
                    });
                    aux4 = true;
                }
                else if (pattpass.test(regcon1.trim()) == false) {
                    regLogc1.css({
                        "border": "1px solid #d9534f"
                    });
                    alert3.css({
                        "display": "block"
                    });
                    console.log(pattpass.test(regcon1.trim()));
                    aux4 = true;
                }
                if (regcon2.trim() == vacio) {
                    regLogc2.css({
                        "border": "1px solid #d9534f"
                    });
                    alert3.css({
                        "display": "block"
                    });
                    aux5 = true;
                }
                else if (pattpass.test(regcon2.trim()) == false) {
                    regLogc2.css({
                        "border": "1px solid #d9534f"
                    });
                    alert3.css({
                        "display": "block"
                    });
                    aux5 = true;
                }
                if (regcon2.trim() != regcon1.trim()) {
                    regLogc1.css({
                        "border": "1px solid #d9534f"
                    });
                    regLogc2.css({
                        "border": "1px solid #d9534f"
                    });
                    alert3.css({
                        "display": "block"
                    });
                    aux5 = true;
                    aux4 = true;
                }
            }
            conregistrar.click(() => {
                checkReg2();
                if (aux4 == false) {
                    if (aux5 == false) {
                        alert3.css({
                            "display": "none"
                        });
                        regLogc1.css({
                            "border": "1px solid #cccccc"
                        });
                        regLogc2.css({
                            "border": "1px solid #cccccc"
                        });
                        var namer2 = regLogName.val().trim().toLowerCase()
                            , lastnr2 = regLogLastn.val().trim().toLowerCase()
                            , emailr2 = regLogEmail.val().trim().toLowerCase()
                            , passr2 = regLogc1.val().trim()
                            , request2 = {
                                low: {
                                    package: 'jmlv.org.Metryc.SignUp'
                                    , method: 'Register(String, String, String, String)'
                                    , data: [namer2, lastnr2, emailr2, passr2]
                                }
                            }
                        $.ajax({
                            url: "./Feat"
                            , type: "POST"
                            , dataType: "json"
                            , data: {
                                request: JSON.stringify(request2)
                            }
                            , success: data => {
                            	console.log(data);
                            	data = data.response.result[0];
                            	 window.localStorage.setItem("id", data.id_users);
                                 window.localStorage.setItem("lastname", lastnr2);
                                 window.localStorage.setItem("name", namer2);
                                $state.go('desktop');
                            }
                            , error: err => {
                                console.log(err); // err
                                alert3.css({
                                    "display": "block"
                                });
                                regLogc1.css({
                                    "border": "1px solid #d9534f"
                                });
                                regLogc2.css({
                                    "border": "1px solid #d9534f"
                                });
                            }
                        });
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
            // funcion que corrobora que se hayan incluido todos los datos para
			// darle
            // click al boton de acceder
            var aux6 = false
                , aux7 = false;

            checkLogin= () => {
                var logemail = logEmail.val().toLowerCase()
                    , logcon = logPass.val()
                    , pattemail2 = new RegExp("^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$")
                    , pattpass2 = new RegExp("(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,12})$");
                if (logemail.trim() == vacio) {
                    logEmail.css({
                        "border": "1px solid #d9534f"
                    });
                    alert4.css({
                        "display": "block"
                    });
                    aux6 = true;
                }
                else if (pattemail2.test(logemail.trim()) == false) {
                    logEmail.css({
                        "border": "1px solid #d9534f"
                    });
                    alert4.css({
                        "display": "block"
                    });
                    aux6 = true;
                }
                if (logcon.trim() == vacio) {
                    logPass.css({
                        "border": "1px solid #d9534f"
                    });
                    alert4.css({
                        "display": "block"
                    });
                    aux7 = true;
                }
                else if (pattpass2.test(logcon.trim()) == false) {
                    logPass.css({
                        "border": "1px solid #d9534f"
                    });
                    alert4.css({
                        "display": "block"
                    });
                    aux7 = true;
                }
            }
            acceder.click(() => {
                checkLogin();
                if (aux6 == false) {
                    if (aux7 == false) {
                        var emaill = logEmail.val().trim().toLowerCase()
                            , passl = logPass.val().trim()
                            , request3 = {
                                low: {
                                    package: 'jmlv.org.Metryc.Login'
                                    , method: 'login(String,String)'
                                    , data: [emaill, passl]
                                }
                            }
                        $.ajax({
                            url: "./Feat"
                            , type: "POST"
                            , dataType: "json"
                            , data: {
                                request: JSON.stringify(request3)
                            }
                            , success: data => {
                            	 data = data.response.result[0];
                                alert4.css({
                                    "display": "none"
                                });
                                logEmail.css({
                                    "border": "1px solid #cccccc"
                                });
                                logPass.css({
                                    "border": "1px solid #cccccc"
                                });
                                
                                if (data.count == 1) {
                                	 window.localStorage.setItem("id", data.id_users);
                                     window.localStorage.setItem("lastname", data.lastname_user);
                                     window.localStorage.setItem("name", data.name_user);
                                    $state.go('desktop');
                                }
                                else {
                                    alert4.css({
                                        "display": "block"
                                    });
                                    logEmail.css({
                                        "border": "1px solid #d9534f"
                                    });
                                    logPass.css({
                                        "border": "1px solid #d9534f"
                                    });
                                }
                            }
                            , error: err => {
                                alert4.css({
                                    "display": "block"
                                });
                                logEmail.css({
                                    "border": "1px solid #d9534f"
                                });
                                logPass.css({
                                    "border": "1px solid #d9534f"
                                });
                                console.log(err); // err
                            }
                        });
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
            // ADICIONAL
            // funcion para cambio de comentarios
            var m1 = $("#m1")
                , m2 = $("#m2")
                , m3 = $("#m3")
                , j1 = $("#j1")
                , j2 = $("#j2")
                , j3 = $("#j3")
                , i = 0;
            comentarios = () => {
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
        }); // fin ready
    }
]);

app.controller("AboutCtrl", ["$scope", "$http", "$state", function ($scope, $http, $state) {
	
	$scope.gohome = function(){
		$state.go("home");
	}
	
	$scope.register = function(){
		$state.go("home");
	}
	
	request4 = {
            low: {
                package: 'jmlv.org.Metryc.About'
                , method: 'getInfo()'
                , data: []
            }
        }
    $.ajax({
        url: "./Feat"
        , type: "POST"
        , dataType: "json"
        , data: {
            request: JSON.stringify(request4)
        }
        , success: data => {
        	data = data.response.Info[0];
        	document.getElementById("about-u").innerHTML = '<strong class="fnmb" >'+data.usercount+'</strong>usuarios'
        	document.getElementById("about-d").innerHTML = '<strong class="fnmb" >'+data.documentcount+'</strong>documentos creados'
        }
        , error: err => {
            console.log(err); // err
        }
    });
}
	]);


app.controller("DesktopCtrl", ["$scope", "$http", "$state", function ($scope, $http, $state) {
	var cambiesc = $("#cambiesc"), //boton para salir del editor
	 editor1 = $("#editor"), //row del editor
	 escritorio1 = $("#escritorio"), //row del escritorio
	 dname = $("#editor-dname"); //input para crear el editor
	 
	
	//funciones para plasmar el nombre  y titulo de archivo en el editor
	MaysPrimera = (cadena) => cadena.charAt(0).toUpperCase() + cadena.slice(1); 
	plasmarN = () => {
		if(window.localStorage.getItem("id")){
			var nameu = window.localStorage.getItem("name"),
				lastnu = window.localStorage.getItem("lastname");
			document.getElementById("editor-n").innerHTML = "Hola, <em>"+MaysPrimera(nameu.toLowerCase())+" "+MaysPrimera(lastnu.toLowerCase())+"</em>";
		}else{
			$state.go("home");
		}
	}
	plasmarNyT = (titulo) => {
		if(window.localStorage.getItem("id")){
			var nameu = window.localStorage.getItem("name"),
				lastnu = window.localStorage.getItem("lastname");
			document.getElementById("editor-n").innerHTML = "Hola, <em>"+MaysPrimera(nameu.toLowerCase())+" "+MaysPrimera(lastnu.toLowerCase())+". Colabora en la edición del archivo: "+titulo+"</em>";
		}else{
			$state.go("home");
		}
	}
	
	//inicio de sesion
	plasmarN();
	
	//crear archivo
	$scope.create = () =>{	
	var titulo = dname.val().split(' ').join('_'); //nombre del archivo a crear
		if(titulo!=""){
			request5 = {
		            low: {
		                package: 'jmlv.org.Metryc.Desktop'
		                , method: 'newDocument(String, Integer)'
		                , data: [titulo, window.localStorage.getItem("id")]
		            }
		        }
		    $.ajax({
		        url: "./Feat"
		        , type: "POST"
		        , dataType: "json"
		        , data: {
		            request: JSON.stringify(request5)
		        }
		        , success: data => {
		        	data = data.response.result;
		        	if(data==0){
		        		alert("el archivo ya existe");//agregar la notificacion en el html
		        		editor1.css({
		                    "display": "none"
		                });
		    			escritorio1.css({
		                    "display": "block"
		                });
		    			plasmarN();
		        	}
		        	if(data==1){
		        		alert("Creado con exito");//agregar la notificacion en el html
		        		escritorio1.css({
		                    "display": "none"
		                });
		        		editor1.css({
		                    "display": "block"
		                });
		        		plasmarNyT(titulo);
		    			
		        	}

		        }
		        , error: err => {
		            console.log(err); // err
		        }
		    });
		}
		;
	}
	
	$scope.signout = function(){
		window.localStorage.removeItem("id");
		window.localStorage.removeItem("name");
		window.localStorage.removeItem("lastname");
		$state.go("home");
	}
	
	
	//funcion del row editor para cambiar al escritorio 
	 cambiesc.click(() => {
		 var mensaje = confirm("¿Desea salir del editor?");
		if(mensaje){
			var mensaje2 = confirm("Antes de salir del editor, ¿desea guardar los cambios?");
			if(mensaje2){
				alert("guardar cambios");
				editor1.css({
                    "display": "none"
                });
				escritorio1.css({
                    "display": "block"
                });
				plasmarN();
			}else{
				alert("no guardar cambios");
				editor1.css({
                    "display": "none"
                });
				escritorio1.css({
                    "display": "block"
                });
				plasmarN();
			}
		}else{
			alert("no irse");
			editor1.css({
                "display": "block"
            });
			escritorio1.css({
                "display": "none"
            });
		}
	 });	
	
}
	]);