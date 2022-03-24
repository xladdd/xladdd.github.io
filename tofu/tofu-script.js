// F I L L E R Z 
//==============

//document.getElementById('head').innerHTML =  "<title>TOFU!</title><!-- ** Favicon **<link rel='icon' type='image/x-icon' href='/images/favicon.ico'>--><meta name='viewport' content='width=device-width, initial-scale=1' /><link href='./tofu-style.css' rel='stylesheet'><!-- IDK if this does anything <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css'/> --><link href='https://fonts.googleapis.com/css2?family=Podkova:wght@400;500;600;700;800&display=swap' rel='stylesheet'><script src='./testscript.js' async></script>";

//document.getElementById('header').innerHTML = "<div class='marquee'><div class='track'><div class='content' id='marquee-content'>&nbsp;<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace</div></div></div><div id='arrow-box'><ul class='head-arrows'><li>↓</li><li>↓</li><li>↓</li></ul></div><div id='border'></div>";




//Initialising
const varMenu = document.getElementById('varMenu');
const pecMenu = document.getElementById('pecMenu');
const konMenu = document.getElementById('konMenu');
const varList = document.getElementById('varList');
const pecList = document.getElementById('pecList');
const konList = document.getElementById('konList');

let timerStrip = document.getElementById('timerStrip');
let timerStripAnim = document.getElementById('timerStrip').style.animation;
let timerText = document.getElementById('timerText');

// recognise page and customise it appropriately:
const url = window.location.href;
let identity = url.split("/tofu");
//console.log(identity);
identity = identity[1].charAt(1) + identity[1].charAt(2) + identity[1].charAt(3); 
//identity can then equal var, pec, or kon
//console.log(identity);

switch (identity) {
case 'var':
//Change marquee text (change inner url of marquee id to correct bold)
    document.getElementById('marquee-content').innerHTML = `&nbsp;<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace`;
//Set up highlight
    varList.style.display = "grid";
    varMenu.style.textDecoration = "underline";
    pecMenu.style.color = "#C8C8C8";
    konMenu.style.color = "#C8C8C8";
    break;
case 'pec':
//Change marquee text (change inner url of marquee id to correct bold)
    document.getElementById('marquee-content').innerHTML = `&nbsp;Vaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>Konzervace`;
//Set up highlight
    pecList.style.display = "grid";
    pecMenu.style.textDecoration = "underline";
    varMenu.style.color = "#C8C8C8";
    konMenu.style.color = "#C8C8C8";
    break;
case 'kon':
//Change marquee text (change inner url of marquee id to correct bold)
    document.getElementById('marquee-content').innerHTML = `&nbsp;VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>`;
//Set up highlight
    konList.style.display = "grid";
    konMenu.style.textDecoration = "underline";
    varMenu.style.color = "#C8C8C8";
    pecMenu.style.color = "#C8C8C8";
    break;
default: 
    document.getElementById('marquee-content').innerHTML = `&nbsp;VařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervace`;
    varMenu.style.color = "#3B3B3B";
    pecMenu.style.color = "#3B3B3B";
    konMenu.style.color = "#3B3B3B";
break;
}

//Hiding and showing menu
function showMenu(){
    nav.style.display = "block";
}
function hideMenu(){
    nav.style.display = "none";
}

//Toggles
//===========================================
function varToggle() {
    if (varList.style.display === "none") {
        varList.style.display = "grid";
        varMenu.style.textDecoration = "underline";
        varMenu.style.color = "#3B3B3B";
    } else {
        varList.style.display = "none";
        varMenu.style.textDecoration = "none";
    }
}
function pecToggle() {
    if (pecList.style.display === "none") {
        pecList.style.display = "grid";
        pecMenu.style.textDecoration = "underline";
        pecMenu.style.color = "#3B3B3B";
    } else {
        pecList.style.display = "none";
        pecMenu.style.textDecoration = "none";
    }
}
function konToggle() {
    if (konList.style.display === "none") {
        konList.style.display = "grid";
        konMenu.style.textDecoration = "underline";
        konMenu.style.color = "#3B3B3B";
    } else {
        konList.style.display = "none";
        konMenu.style.textDecoration = "none";
    }
}
//===========================================


function timerFunc() {
    const clicked = event.target;
    //Change style of timerTrigger
    clicked.style.textDecoration= "none";
    clicked.style.animation = "timerTrigPulse 3s infinite alternate";

    let timerTime = clicked.innerHTML; //1h 30min
    if (timerTime.length > 5) {timerTime = timerTime.split(" ");}

    if (Array.isArray(timerTime)) {
        timerTime[0] = timerTime[0].replace("h", "") * 60 * 60;
        timerTime[1] = timerTime[1].replace("min", "") * 60;
        timerTime = timerTime[0] + timerTime[1];
    } else {
        timerTime = timerTime.replace("min", "") * 60;
    }
    timerText.style.display = 'block';
    timerStrip.style.display = 'block';
    timerStrip.style.animation = `timerAnim ${timerTime + 2}s linear`;

    timerTextChange(timerTime, clicked);   
}

function timerTextChange(time, click){
    let secondsLeft = time;
    let minutes = secondsLeft / 60;
    let seconds = secondsLeft - (minutes*60);
    let timer = setInterval(function(){
        timerText.innerHTML=`${minutes}m${seconds}s`;
        secondsLeft--;
        minutes = Math.floor(secondsLeft / 60);
        seconds = secondsLeft - (minutes*60);
        if (secondsLeft < 0) {
            timerStrip.style.display = "none";
            timerText.style.display = "none";
            click.style.animation = "none";
            click.style.textDecoration = "line-through";
            click.style.color = "#3B3B3B";
            click.removeEventListener;
        }
    }, 1000);
}

//Adding event listeners
//Showing/Hiding Menu
document.getElementById('header').addEventListener('click', showMenu);
document.getElementById('hide-menu').addEventListener('click', hideMenu);
document.getElementById('blank-space').addEventListener('click', hideMenu);
varMenu.addEventListener('click', varToggle);
pecMenu.addEventListener('click', pecToggle);
konMenu.addEventListener('click', konToggle);

document.querySelectorAll('.timerTrigger').forEach(item => {
    item.addEventListener('click', timerFunc)
})






/*
function hiderFunction() {
    console.log("started hider function")
    if (Event.target.style.color = "#3B3B3B") {
    //If it's active, deactivate
    Event.target.style.color = ""#C8C8C8"";
    Event.target.style.textDecoration = "none";
    switch (Event.target.innerHTML) {
        case ('Vaření'):
            document.getElementsById('vareni-list').style.display = "none";
            break;
        case ('Pečení'):
            document.getElementsById('peceni-list').style.display = "none";
            break;
        case ('Konzervace'):
            document.getElementsById('konzervace-list').style.display = "none";
            break;
        default:
            break;   
    }
} else if (Event.target.style.color = ""#C8C8C8"") {
    //If it's NOT active, activate
    Event.target.style.color = "#3B3B3B";
    Event.target.style.textDecoration = "underline";
    switch (Event.target.innerHTML) {
        case ('Vaření'):
            document.getElementsById('vareni-list').style.display = "grid";
            break;
        case ('Pečení'):
            document.getElementsById('peceni-list').style.display = "grid";
            break;
        case ('Konzervace'):
            document.getElementsById('konzervace-list').style.display = "grid";
            break;
        default:
            break;   
    }
}
}*/