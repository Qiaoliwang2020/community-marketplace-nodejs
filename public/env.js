$(document).ready(function(){

  const nav = document.getElementById('site-menu');
  const header = document.getElementById('top');

  window.addEventListener('scroll', function() {
    if (window.scrollY >=400) { // adjust this value based on site structure and header image height
      nav.classList.add('nav-sticky');
      header.classList.add('pt-scroll');
    } else {
      nav.classList.remove('nav-sticky');
      header.classList.remove('pt-scroll');
    }
  });

  // get user name and user icon from App Id
  $.getJSON('/home/api/idPayload', function (id_token) {
    $('#userNameSpan').html(id_token.name);
    $('#user-icon').attr('src',id_token.picture);
  });

})

navToggle=()=>{
  let btn = document.getElementById('menuBtn');
  let nav = document.getElementById('menu');

  btn.classList.toggle('open');
  nav.classList.toggle('flex');
  nav.classList.toggle('hidden');
}
