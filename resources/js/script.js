$(document).ready(function(){$('.js--section-features').waypoint(function(direction){if(direction=="down"){$('nav').addClass('sticky');}else{$('nav').removeClass('sticky');}},{offset:'60px;'});$('.js--scroll-to-plans').click(function(){$('html, body').animate({scrollTop:$('.js--section-plans').offset().top},1000);});$('.js--scroll-to-start').click(function(){$('html, body').animate({scrollTop:$('.js--section-testimonials').offset().top},1000);});$(function(){$('a[href*=#]:not([href=#])').click(function(){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var target=$(this.hash);target=target.length?target:$('[name='+this.hash.slice(1)+']');if(target.length){$('html,body').animate({scrollTop:target.offset().top},1000);return false;}}});});$('.js--wp-1').waypoint(function(direction){$('.js--wp-1').addClass('animated fadeIn');},{offset:'50%'});$('.js--wp-2').waypoint(function(direction){$('.js--wp-2').addClass('animated fadeInUp');},{offset:'50%'});$('.js--wp-3').waypoint(function(direction){$('.js--wp-3').addClass('animated fadeIn');},{offset:'50%'});$('.js--wp-4').waypoint(function(direction){$('.js--wp-4').addClass('animated pulse');},{offset:'50%'});$('.js--nav-icon').click(function(){var nav=$('.js--main-nav');var icon=$('.js--nav-icon i');nav.slideToggle(200);if(icon.hasClass('ion-navicon-round')){icon.addClass('ion-close-round');icon.removeClass('ion-navicon-round');}else{icon.addClass('ion-navicon-round');icon.removeClass('ion-close-round');}});});var pointA=new google.maps.LatLng(10.663922,-71.608994),myOptions={zoom:16,disableDefaultUI:true,zoomControl:false,scrollwheel:false,'navigationControl':false,'draggable':false,center:pointA,mapTypeId:google.maps.MapTypeId.ROADMAP,styles:[{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#dd4b39"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway.controlled_access","elementType":"geometry.fill","stylers":[{"color":"#e3a89f"}]},{"featureType":"road.highway.controlled_access","elementType":"labels.text.fill","stylers":[{"color":"#965c5c"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#aec8d2"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#bdc2c2"}]}]};var icon={url:"resources/img/marker.png",scaledSize:new google.maps.Size(55,45),origin:new google.maps.Point(0,0),anchor:new google.maps.Point(0,0)};var map=new google.maps.Map(document.getElementById('map_canvas'),myOptions);var marker=new google.maps.Marker({position:pointA,map:map,icon:icon,title:'Otecin, C.A.'});google.maps.event.addDomListener(window,"resize",function(){var center=map.getCenter();google.maps.event.trigger(map,"resize");map.setCenter(center);});