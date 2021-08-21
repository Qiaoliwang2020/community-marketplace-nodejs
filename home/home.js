$(document).ready(function () {
    getUserInfo = () => {
        // user info from app id
        $.getJSON('/home/api/idPayload', function (id_token) {
            $('#userNameSpan').html(id_token.name);
            $('#userNameSpan').attr('data-userid', id_token.sub);
            $('#user-icon').attr('src', id_token.picture);
            $('#cardHolderName').val(id_token.name)
            $('#email').val(id_token.email);
        });
    }
    getUserInfo();
    let errors = [];
    let title = $('#title'),
        description = $('#description');

    title.on('change', (e) => {
        validationValue({ name: 'title', value: e.target.value })
    })

    description.on('change', (e) => {
        validationValue({ name: 'description', value: e.target.value })
    })

    $('#nextStep').on('click', function () {
        if (errors.length === 0) {
            if (window.FILES) {
                uploadImages(window.FILES);
            }
            else {
                window.Toast('failed', 'Images is required');
            }
        }
    })
    backToHome = () => {
        let timer;
        timer = setTimeout((() => {
            location.replace('/');
            clearTimeout(timer);
        }), 2500)
    }

    uploadImages = (images) => {
        let files = images;
        let imagePath = [];

        for (const key in files) {

            let formData = new FormData();
            formData.append("image", files[key], files[key].name);
            //console.log(FILES[key],'key');
            $.ajax({
                url: '/upload/uploadFile',
                type: 'post',
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                processData: false,
                success: function (result) {
                    imagePath.push(result.path);
                    window.Toast('success', 'uploaded');
                    submitActivity(imagePath)
                }
            });
        }
    }

    submitActivity = (images) => {
        let data = {
            title: title[0].value,
            description: description[0].value,
            thumbs: images,
        }
        $.post('/activities/createActivities', data, (res) => {
            if (res.success) {
                window.Toast('success', res.data.info);
            }
            else {
                window.Toast('failed', res);
            }
            backToHome();
        })
    }

    validationValue = (data) => {
        errors = [];
        if (data.value === null || data.value === 'undefined' || data.value.length < 1) {
            window.Toast('failed', `${data.name} is required `);
            errors.push(data.name);
        }
    }
})





