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
        description = $('#description'),
        retailerLocation = $('#location'),
        sectors = $('#sectors');
    let activityFiles = {}, itemFiles = {};    

    title.on('change', (e) => {
        validationValue({ name: 'title', value: e.target.value })
    })

    description.on('change', (e) => {
        validationValue({ name: 'description', value: e.target.value })
    })
    retailerLocation.on('change', (e) => {
        validationValue({ name: 'location', value: e.target.value })
    })

    sectors.on('change', (e) => {
        validationValue({ name: 'industry sectors', value: e.target.value })
    })

    // initialize activity images upload
    let uploadOptions = {
        galleryID:"gallery",
        overlayID:"overlay",
        fileInputID:"hidden-input",
        addButtonID:"addImage",
    }
    function getActivityFiles(files) {
        activityFiles ={};
        activityFiles = files;
        console.log(activityFiles,'11111');
     }
    clientUpload(uploadOptions,getActivityFiles);

    // initialize items images upload
    let productUpload = {
        galleryID:"item-gallery",
        overlayID:"item-overlay",
        fileInputID:"item-file-input",
        addButtonID:"item-add-image",
    }

    function getItemFiles(files) {
        itemFiles = {};
        itemFiles = files;
     }
    clientUpload(productUpload,getItemFiles);

    $('#nextStep').on('click', function () {
        validationValue({ name: 'industry sectors', value: sectors[0].value  });
        validationValue({ name: 'location', value: retailerLocation[0].value });
        validationValue({ name: 'description', value: description[0].value });
        validationValue({ name: 'title', value: title[0].value });

        if (errors.length === 0) {
            if (activityFiles) {
                uploadImages(activityFiles);
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
                    submitActivity(imagePath);
    
                }
            });
        }
    }

    submitActivity = (images) => {       
        let data = {
            title: title[0].value,
            description: description[0].value,
            thumbs: images,
            location:retailerLocation[0].value,
            sectors:sectors[0].value,
        }
        $.ajax({
            url: '/activities/createActivities',
            type: 'post',
            data: data,
            success: function (res) {
                if (res.success) {
                    window.Toast('success', res.data.info);
                }
                else {
                    window.Toast('failed', res);
                }
                backToHome();
            }
        });
    }

    validationValue = (data) => {
        errors = [];
        if (data.value === null || data.value === 'undefined' || data.value.length < 1) {
            window.Toast('failed', `${data.name} is required `);
            errors.push(data.name);
        }
    }

    addItems =()=>{
        const modal = document.querySelector('.modal')
        modal.classList.toggle('opacity-0')
        modal.classList.toggle('pointer-events-none')
        body.classList.toggle('modal-active')
    }
})





