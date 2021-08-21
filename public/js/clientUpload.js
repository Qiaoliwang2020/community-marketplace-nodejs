const clientUpload = ({galleryID,overlayID,fileInputID,addButtonID},callBack)=>{

    const imageTempl = document.getElementById("image-template");

    // use to store pre selected files
    let FILES = {};
    
    // check if file is of type image and prepend the initialied
    // template to the target element
    function addFile(target, file) {
        const isImage = file.type.match("image.*"),
            objectURL = URL.createObjectURL(file);
    
        const clone = isImage
            ? imageTempl.content.cloneNode(true)
            : imageTempl.content.cloneNode(false);
    
        clone.querySelector("h1").textContent = file.name;
        clone.querySelector("li").id = objectURL;
        clone.querySelector(".delete").dataset.target = objectURL;
        clone.querySelector(".size").textContent =
            file.size > 1024
                ? file.size > 1048576
                ? Math.round(file.size / 1048576) + "mb"
                : Math.round(file.size / 1024) + "kb"
                : file.size + "b";
    
        isImage &&
        Object.assign(clone.querySelector("img"), {
            src: objectURL,
            alt: file.name
        });
    
        target.prepend(clone);
    
        FILES[objectURL] = file;

        callBack(FILES);

    }
    
    const gallery = document.getElementById(galleryID),
        overlay = document.getElementById(overlayID);
    
    // click the hidden input of type file if the visible button is clicked
    // and capture the selected files
    const hidden = document.getElementById(fileInputID);
    document.getElementById(addButtonID).onclick = () => hidden.click();
    hidden.onchange = (e) => {
        for (const file of e.target.files) {
            addFile(gallery, file);
        }
    };
    
    // use to check if a file is being dragged
    const hasFiles = ({ dataTransfer: { types = [] } }) =>
        types.indexOf("Files") > -1;
    
    // use to drag dragenter and dragleave events.
    // this is to know if the outermost parent is dragged over
    // without issues due to drag events on its children
    let counter = 0;
    
    // reset counter and append file to gallery when file is dropped
    function dropHandler(ev) {
        ev.preventDefault();
        for (const file of ev.dataTransfer.files) {
            addFile(gallery, file);
            overlay.classList.remove("draggedover");
            counter = 0;
        }
    }
    
    // only react to actual files being dragged
    function dragEnterHandler(e) {
        e.preventDefault();
        if (!hasFiles(e)) {
            return;
        }
        ++counter && overlay.classList.add("draggedover");
    }
    
    function dragLeaveHandler(e) {
        1 > --counter && overlay.classList.remove("draggedover");
    }
    
    function dragOverHandler(e) {
        if (hasFiles(e)) {
            e.preventDefault();
        }
    }
    
    // event delegation to caputre delete events
    // fron the waste buckets in the file preview cards
    gallery.onclick = ({ target }) => {
        if (target.classList.contains("delete")) {
            const ou = target.dataset.target;
            document.getElementById(ou).remove(ou);
            gallery.children.length === 1;
            delete FILES[ou];
        }
    };
}

// window.FILES = FILES;
window.clientUpload = clientUpload;
