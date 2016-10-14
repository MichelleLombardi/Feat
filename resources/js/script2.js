window.onload = function onGet() {
       $.ajax({
           url: "login.php",
           type: "POST",
           data: {type:2},
           success: function(data) {
               data = JSON.parse(data);
               if (data.response == 1)
                   document.getElementById('login').style.display="block";
               else
                   window.location.href = 'login.html';
           },
           error: function(err) {
               console.log('error');
           }

       });
   }  

var label = document.getElementById("labelup");
   var img = document.getElementById('img');
   var wrap = document.getElementById("wrap");
   img.style.display = "none";
   wrap.style.display = "none";
   var filebtn = document.getElementById("myFile");
   filebtn.addEventListener("change", capturePhoto);

   function capturePhoto() {
       readURL(this);
   }

   function readURL(input) {
       if (input.files && input.files[0]) {
           var reader = new FileReader();

           reader.onload = function(e) {
               var file = filebtn.files[0].type;
               file = file.split("/");
               file = file[0];
               if (file == "image") {
                   label.style.display = "none";
                   img.style.display = "block";
                   wrap.style.display = "block";
                   img.style.height = "50%";
                   img.style.width = "50%";
                   document.getElementById('wrap2').style.marginTop = '-15%';
                   wrap.style.marginBottom = '-10%';
                   wrap.style.marginLeft = '8%';
                   document.getElementById('1').style.marginLeft = '8%';
                   document.getElementById('2').style.marginLeft = '8%';
                   document.getElementById('3').style.marginLeft = '8%';
                   document.getElementById('4').style.marginLeft = '8%';
                   $('#img').attr('src', e.target.result);
               }
           }
           reader.readAsDataURL(input.files[0]);
       }
   }

