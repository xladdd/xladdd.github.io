// Initiators

const greetings = ["Suprise, bitch!", "Hiya.", "Hey there!", "Good day.", "G'day, m'lady.", "O magnificent leader!", "Well, well, well. Look who's here.", "Sup."];

const moons = ["in Uranus", "outside your window, peering in", "behind the Sun", "driving your car at full speed into the sunset", "taking a break", "hiding behind the clouds", "a thing", "on fiyaaaaah", "in the fourth house", "in the House of Gucci", "made of cheese", "difficult to get to", "very far away", "GAY", "Earth's only natural satellite", "full of spiders", "385,000 kilometres away", "in the House of the Rising Sun", "lookin' pretty good", "ok", "decent", "full", "receding", "thicc", "spherical", "hiding behind the trees", "TURNT, hunty", "the result of space debris forming after a collision with Earth", "...missing", "404 not found"];

const shoulds = ["stay very, very quiet", "throw a party", "be yourself", "try to act like you're someone else", "try on multiple hats", "try to enjoy yourself", "be more asserting", "cry endlessly", "ugly-cry", "talk to someone about that", "put some cream on it", "stay loose as a goose", "have a long shower", "go on a walk", "chase dogs in a park", "make some kids cry", "poison the local water supply", "stay suggestible", "vote for freedom, with your heart", "have a girls' night", "sacrifice yourself to Ctulchu", "eat a sandwich", "experiment with make-up", "end it all", "mentally prepare yourself", "get involved with improv", "go out dancin'", "write something in a journal", "fall down some stairs", "buy a puppy"];

const actions = ["could", "should", "might want to", "should definitely", "shouldn't"]

const phrases = ["The soup is getting cold.", "There is no such thing as ethical consumerism.", "Never forgive, never forget.", "Don/'t look back.", "Have a coffee.", "Sit up straight.", "Be gay, do crimes.", "Eat an entire bar of chocolate in under 5 minutes.", "Stay hydrated.", "Water the plants.", "Don't forget the bread.", "Get that bread.", "Finish her.", "Beetlejuice, Beetlejuice, Beetlejuice!", "Ask more questions.", "Look alive, sunshine!", "Try cyberbullying.", "Throw your phone in the window of a passing car.", "Don't be hard on yourself.", "Let it go.", "Rock and roll.", "Have a crumpet.", "Put the kettle on.", "Live, laugh, love.", "Eat, pray, love!", "Eat at McDonalds tonight.", "Go on a blind date.", "Stay loose!", "Balenciagaaaaaaaa!!!", "Werk."];

let button = document.getElementById('fortuneButton');
let fortune = document.getElementById('fortune');


// Message generator

let theMessage = "Message not generated"; 
let greeting = "DEF GREET";
let moonIs = "DEF MOON";
let youShould = "DEF SHOULD";
let action = "DEF ACTION";
let phrase = " DEF PHRASE";

const greetingFnc = () => {
    num = Math.floor(Math.random() * greetings.length);
    greeting = greetings[num];
}
const moonFnc = () => {
    num = Math.floor(Math.random() * moons.length);
    moonIs = moons[num];
}
const shouldFnc = () => {
    num = Math.floor(Math.random() * shoulds.length);
    youShould = shoulds[num];
}
const actionFnc = () => {
    num = Math.floor(Math.random() * actions.length);
    action = actions[num];
}
const phraseFnc = () => {
    num = Math.floor(Math.random() * phrases.length);
    phrase = phrases[num];
}

const generateMessage = () => {
greetingFnc();
moonFnc();
shouldFnc();
actionFnc();
phraseFnc();
theMessage = `${greeting} Today, your moon is ${moonIs}. You ${action} ${youShould}. ${phrase}`;
return theMessage;
}

function showFortune(){
  fortune.innerHTML = generateMessage();
  button.innerHTML = "Try it again!";
  button.style.cursor = "default";
  // button.removeEventListener('click', showFortune); 
// This last line removes the button functionality after 1 click
}

button.addEventListener('click', showFortune);
