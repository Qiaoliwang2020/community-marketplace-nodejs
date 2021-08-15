$(document).ready(function() {
    getUserInfo =()=>{
        // user info from app id
        $.getJSON('/home/api/idPayload', function (id_token) {
            $('#userNameSpan').html(id_token.name);
            $('#userNameSpan').attr('data-userid',id_token.sub);
            $('#user-icon').attr('src',id_token.picture);
            $('#cardHolderName').val(id_token.name)
            $('#email').val(id_token.email);
        });
     }
     getUserInfo();

    //  $('#uploadImg').on('click',function(){
    //      console.log('iiiiiii');
    //  })
})





