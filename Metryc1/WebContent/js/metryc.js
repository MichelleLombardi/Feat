function Metryc() {
    var ws, Hcallbacks = new Array()
        , Lcallbacks = new Array();
    this.setconnection = URL => {
        if ('WebSocket' in window) {
            ws = new WebSocket(URL);
        }
        else if ('MozWebSocket' in window) {
            ws = new MozWebSocket(URL);
        }
        else {
            alert('Tu navegador no soporta WebSockets');
            return;
        }
        ws.onopen = () => {
            // pintamos mensaje
            console.log('Concectado!');
        };
        ws.onmessage = event => {
            var data = event.data;
            // pintamos mensaje
            var request = JSON.parse(data);
            var r = JSON.stringify(request);
            callFunct = new Function(request.callback + "(" + r + ')');
            callFunct();
            //            if (request.high != null) {
            //                callFunct = new Function(Hcallbacks[0]);
            //                Hcallbacks.splice(0, 1);
            //                callFunct();
            //            }
            //            else if (request.low != null) {
            //                callFunct = new Function(Lcallbacks[0]);
            //                Lcallbacks.splice(0, 1);
            //                callFunct();
            //            }
        };
        ws.onclose = () => {
            // pintamos mensaje
            console.log('Desconectado!');
        };
        ws.onerror = event => {
            console.log('Se produjo un error! ');
        };
    }
    this.sendMessage = (message) => {
        if (ws != null) {
            //            var request = JSON.parse(message);
            //            if (request.high != null) {
            //                Hcallbacks[Hcallbacks.length] = func;
            //            }
            //            else if (request.low != null) {
            //                Lcallbacks[Lcallbacks.length] = func;
            //            }
            //            else {
            //                console.log("error en tipo de solicitud (request)");
            //            }
            ws.send(message);
        }
    }
}