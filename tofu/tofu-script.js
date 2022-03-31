// F I L L E R Z 
//==============


document.getElementById('header').innerHTML = `
<div class='marquee' role="presentation">
        <div class='track' role="presentation">
          <div class='content' id='marquee-content' role="presentation">&nbsp;<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace
            </div>
        </div>
    </div>

    <div id='arrow-box' role="presentation">
        <ul class='head-arrows'><li>↓</li><li>↓</li><li>↓</li></ul>
    </div>

    <div id='border' role="presentation"></div>
`;

document.getElementById('nav').innerHTML = `
<div id='nav-box' role="presentation">
        <div id='page-wrap' role="presentation">

            <h1 id="varMenu">Vaření</h1>
            <div id="varList" class="menuList">
                <a href="/tofu/vareni/livance.html">livance!</a>
                <a href="/tofu/vareni/trhanec.html">trhanec!</a>
                <a href="/tofu/vareni/tofu-mlety.html">tofu mlety!</a>
                <a href="/tofu/vareni/dusena-mrkev.html">dušena mrkev!</a>
                <a href="/tofu/vareni/kyselo-kari.html">kyselosladké kari!</a>
                <a href="/tofu/vareni/mleka.html">mléka!</a>
                <a href="/tofu/vareni/zaklady.html">základy!</a>
            </div>

            <h1 id="pecMenu">Pečení</h1>
            <div id="pecList" class="menuList">
                <a href="/tofu/peceni/babka.html">babka!</a>
                <a href="/tofu/peceni/bananabread.html">bananabread!</a>
                <a href="/tofu/peceni/veliko-buchta.html">velikonoční buchta!</a>
                <a href="/tofu/peceni/housky.html">housky!</a>
                <a href="/tofu/peceni/raw-kulicky.html">sladké raw kuličky!</a>
            </div>

            <h1 id="konMenu">Konzervace</h1>
            <div id="konList" class="menuList">
                <a href="/tofu/konzervace/kimci.html">kimči a laktofermentace!</a>
                <a href="/tofu/konzervace/nakladani.html">nakládaní!</a>
                <a href="/tofu/konzervace/kombuca.html">kombůča!</a>
             </div>

        <button id="hide-menu">↑</button>

        </div>
    </div>
    <div id='border'></div>
    <div id='blank-space'></div>
`

document.getElementById('footer').innerHTML = `<p><b>T O F U !</b><br>
Pro líné vegany &#128154;<br><br>
<i>...a další <a href="http://vladdjpg.github.io/">Lahůdky</a></i>`;


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
document.getElementById('marquee-content').innerHTML=`&nbsp;<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace<b>Vaření</b>PečeníKonzervace;`
//Set up highlight
    varList.style.display = "grid";
    varMenu.style.textDecoration = "underline";
    pecMenu.style.color = "#C8C8C8";
    konMenu.style.color = "#C8C8C8";
    break;
case 'pec':
//Change marquee text (change inner url of marquee id to correct bold)
    document.getElementById('marquee-content').innerHTML = ` &nbsp;Vaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>KonzervaceVaření<b>Pečení</b>Konzervace`;
//Set up highlight
    pecList.style.display = "grid";
    pecMenu.style.textDecoration = "underline";
    varMenu.style.color = "#C8C8C8";
    konMenu.style.color = "#C8C8C8";
    break;
case 'kon':
//Change marquee text (change inner url of marquee id to correct bold)
    document.getElementById('marquee-content').innerHTML = `&nbsp;VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>VařeníPečení<b>Konzervace</b>`;
//Set up highlight
    konList.style.display = "grid";
    konMenu.style.textDecoration = "underline";
    varMenu.style.color = "#C8C8C8";
    pecMenu.style.color = "#C8C8C8";
    break;
default: 
    document.getElementById('marquee-content').innerHTML = `&nbsp;VařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervaceVařeníPečeníKonzervace`;
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

    if (timerTime > 10) {
        timerTextChange(timerTime, clicked); 
    }  
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

function strikethru() {
    const target = event.target;
    if (target.style.textDecoration === "line-through") {
        target.style.textDecoration = "none";
    } else {
        target.style.textDecoration = "line-through";
    }
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

const method = document.getElementById('method').querySelectorAll('li');


method.forEach(item=>{item.addEventListener('click', strikethru)})