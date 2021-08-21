const toast = (type,info)=>{
    let timer;
    let sucess =`<div class="toast absolute top-20 right-10 flex item-center bg-white rounded border shadow-md p-2">
    <svg class="h-6 w-6 fill-stroke text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>  <polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <div class="ml-2 text-green-500">${info} success</div>
    </div>`;

    let failed = `<div class="toast absolute top-20 right-10 flex item-center bg-white rounded border shadow-md p-2">
    <svg class="h-6 w-6 text-red-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="10" />  <line x1="15" y1="9" x2="9" y2="15" />  <line x1="9" y1="9" x2="15" y2="15" /></svg>
    <div class="ml-2 text-red-500">${info} failed</div>
    </div>`

    if(type == 'sucess'){
        $('body').append(sucess);
        timer =setTimeout(function(){ 
            $('.toast').remove(); 
            clearTimeout(timer);
        }, 1000);
    }
    else if (type == 'failed'){
        $('body').append(failed);
        timer =setTimeout(function(){ 
            $('.toast').remove(); 
            clearTimeout(timer);
        }, 1000);
    }
}

window.Toast = toast;
