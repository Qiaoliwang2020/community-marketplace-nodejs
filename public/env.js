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
    let authed = `<div class="flex py-1">
        <span class="user-icon center">
            <img class="rounded-full" id="user-icon" src="${id_token.picture ? id_token.picture : '/assets/icon/user.png'}" width="25" height="25">
        </span>
        <div class="ml-2"><span id="userNameSpan">${id_token.name}</span></div>
    </div>`
    $('.menu-auth').empty();
    if(id_token){
      $('.menu-auth').append(authed)
    }
  });
})

navToggle=()=>{
  let btn = document.getElementById('menuBtn');
  let nav = document.getElementById('menu');

  btn.classList.toggle('open');
  nav.classList.toggle('flex');
  nav.classList.toggle('hidden');
}
