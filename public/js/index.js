$(document).ready(function(){

    getAllActivities();

    $('.tab .tab-item').on('click',function (){
        tabChangeStyle($(this));
    })

    const card_open = document.getElementById('card_open')
    const card_close = document.getElementById('card_close')
    const card_panel = document.getElementById('card_panel')

    function modalState() {
        if(card_panel.classList.contains('hidden')) {
            // Show modal
            card_panel.classList.remove('hidden')
            card_panel.classList.add('block')

            // Delete button
            card_open.classList.add('hidden')
            card_open.classList.remove('block')

            // Start animation open
            card_panel.classList.add('card_open')
        } else {
            // Delete modal
            card_panel.classList.add('hidden')
            card_panel.classList.remove('block')

            // Show button
            card_open.classList.remove('hidden')
            card_open.classList.add('block')

            // Remove animation open
            card_panel.classList.remove('card_open')
        }
    }

    card_open.addEventListener('click', modalState)
    card_close.addEventListener('click', modalState)
});

getAllActivities = () =>{
    loading();
    $.get('/activities/getActivities',(result)=>{
        if(result.success){
            renderStoreList(result.data);
        }
    })
}
renderStoreList = (data) =>{
    $('.store-list').empty();
    if(data.length > 0){
        for(let i = 0 ; i <  data.length; i++) {
            let imgSrc= data[i].thumbs[0].replace('public/','/');
            let list = `<div class="store-item-vertical mt-5">
                    <div class="max-w-2xl mx-auto bg-white rounded-row-item shadow-md overflow-hidden">
                        <div class="flex md:block">
                            <div class="flex-shrink-0">
                                <img class="h-36 w-36  object-cover md:w-full" src="${imgSrc}" alt="${data[i].title}">
                            </div>
                            <div class="p-4">
                                <a href="/activity?id=${data[i]._id}" class="block mt-1 text-lg leading-tight capitalize font-medium text-black hover:underline">${data[i].title}</a>
                                <p class="mt-2 text-gray-500">${data[i].description}</p>
                                <p class="mt-2 text-gray-500 capitalize flex items-center">
                                <svg class="h-4 w-4 text-gray-500 mr-1"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                ${data[i].location}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>`
            $('.store-list').append(list);

        } 
    }else{
        $('.store-list').append('<div class="w-full h-32 text-center text-gray-500">No Actities</div>');
    }
}
listLoading = ()=>{
    $('.store-list').empty();
    for(let i = 0 ; i <  3; i++){
        let listLoading = `<div class="mt-4 border border-gray-100 shadow rounded-row-item p-4 max-w-sm w-full mx-auto">
                <div class="animate-pulse flex space-x-4">
                    <div class="bg-gray-400 h-12 w-12"></div>
                    <div class="flex-1 space-y-4 py-1">
                        <div class="h-4 bg-gray-400 rounded w-3/4"></div>
                        <div class="space-y-2">
                            <div class="h-4 bg-gray-400 rounded"></div>
                            <div class="h-4 bg-gray-400 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            </div>`;
        $('.store-list').append(listLoading);
    }

}

loading = ()=>{
    $('.store-list').empty();
    let loading = `<div class="flex justify-center">
        <div class="spinner">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
    </div>`
    $('.store-list').append(loading);
}

tabChangeStyle = (tab)=>{
    tab.addClass('text-white').removeClass('text-gray-600');
    tab.addClass('bg-black');
    tab.siblings().removeClass('text-white');
    tab.siblings().removeClass('bg-black');
}