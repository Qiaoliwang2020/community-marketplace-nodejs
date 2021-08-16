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

     let title = $('#title'),
     description = $('#description');

     title.on('change',(e)=>{
        console.log(e.target.value,'title');
     })

     description.on('change',(e)=>{
        console.log(e.target.value,'des');
     })

     $('#nextStep').on('click',function(){

        let images = $('#gallery').attr("images").split(",");
        console.log(images,'img');

         let data={
             title:title[0].value,
             description:description[0].value,
             thumbs:images,
         }
         $.post('/activities/createActivities',data,(res)=>{
             console.log(res,'res');
         })
     })
})





