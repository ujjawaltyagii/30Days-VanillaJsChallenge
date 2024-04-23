const opac = document.querySelector(".modal");
const overl = document.querySelector(".overlay");

function openModal(){
    opac.classList.add("active");
    overl.classList.add("overlayactive");
};

function closeModal(){
    opac.classList.remove("active");
    overl.classList.remove("overlayactive");
};