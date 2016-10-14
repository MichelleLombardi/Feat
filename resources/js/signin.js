var submit2 = document.getElementById('login-button');
var user = document.getElementById('login-username');
var pass = document.getElementById('login-password');


submit2.onclick = function onPost() {
    $.ajax({
        url: "login.php",
        type: "POST",
        data: {
            username: user.value, // input  firt name del modal2
            password: pass.value, // input last name
            type: 1,
        },
        success: function(data) {
            console.log(data);
            data = JSON.parse(data);
            if (data.response == 1)
                window.location.href = 'admin.html';
        },
        error: function(err) {
            console.log('error');
        }

    });
}

window.onload = function onPost2() {
    $.ajax({
        url: "login.php",
        type: "POST",
        data: {
            type: 2
        },
        success: function(data) {
            data = JSON.parse(data);
            if (data.response == 1)
                window.location.href = 'admin.html';
        },
        error: function(err) {
            console.log('error');
        }

    });
}