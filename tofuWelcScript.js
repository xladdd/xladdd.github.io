function toggleMenu() {
    const navDisp = document.getElementById('nav').style.display;
    if (navDisp === "block") {
        navDisp = "none";
    } else {
        navDisp = "block";
    }
};

//document.querySelectorAll('.welcMenu').forEach(item => {item.addEventListener('click', toggleMenu);

//document.getElementById('page-wrap').querySelectorAll('h3').forEach(item=>{item.addEventListener('click', function toggle() {document.getElementById('nav').style.display="block"})})