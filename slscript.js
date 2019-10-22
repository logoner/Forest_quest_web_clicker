// variabels:
var day = 0;
var tendays = 0;

// User States:
var health = 5;
var hunger = 0;
//var food = 0;
//var level = 0;
//var workshop = 0;
//var clothes = 0;
//var building = 0;

// Inventary:
var food = 0; // This code is not used yet
var materials = 0; // This code is not used yet
var clothes = 0; // level of clothes // This code is not used yet
var house = 0; // level of house // This code is not used yet

// Monsters stage:
var monster = 0; // Monster damage will increase // This code is not used yet
// depending on the character's health level.

var monsters = ["Evil wolf", "Evil bear", "Evil snake", ]; // This code is not used yet
var drop = ["food", "materials", ]; // This code is not used yet
var eventsType = ["findFood", "findMaterials", "findMonster", "findNoting", ] // This code is not used yet

var searchResult = [monsters, drop, ]
//new eventObj{
// I don't know how to make a dictionary in js. 
// I wanted to trigger an event with a random indication of the type
// of event and selecting a message according to its type.


//    let findFood = "You find a some food.";// This code is not used yet
//    findMaterials:"You find a few materials."
//    findMonster:"You meet a monster."
//    findNoting:"You find noting and good."
//}

// functions:

function ViewMessage(msgTitle, message) {
    document.getElementById('modal').style.pointerEvents = 'auto';
    if (msgTitle == "Production_err") {
        document.getElementById('modal').style.pointerEvents = 'none';
    }
    document.getElementById("msg_title").innerHTML = msgTitle;
    document.getElementById("msg").innerHTML = message;
    document.getElementById("modal").style.display = "block";
    var textHistory = document.getElementById("history");
    textHistory.innerHTML = "- " + message + "<br />" + textHistory.innerHTML;
}

function randomInteger(min, max) { // получить случайное число от (min-0.5) до (max+0.5) 
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

//alert( randomInteger(1, 3));

function CasualEvent() {
    // Here events such as finding useful things or meeting monsters will be generated.

    let newEvent = monsters[randomInteger(0, monsters.length - 1)]

    ViewMessage("You meet " + newEvent, "Test Event body");
    //alert( randomInteger(1, 3));
}

function TurnSearchCounter(searchCount) {
    var turnDeg = 36 - (searchCount * 18);
    //36-0*18=36
    //36-1*18=18
    //36-2*18=0
    //...
    //36-9*18=-126

    var searchPDay = document.getElementById('searchPDay');

    searchPDay.style.transform = "rotate(" + turnDeg + "deg)";

    /*transform: rotate(36deg);*/
    /* 0 */
}

function SearchForest() {
    tendays += 1;
    if (tendays == 10) {
        tendays = 0;
        day += 1;
        hunger += 1;
        var calendar = document.getElementById('day');
        calendar.innerHTML = day;
        var totalHunger = document.getElementById('hunger');
        totalHunger.innerHTML = hunger;

        TurnSearchCounter(tendays);
        CasualEvent();
    }
    TurnSearchCounter(tendays);
    CasualEvent();
}

// To disable: document.getElementById('id').style.pointerEvents = 'none';
// To re-enable: document.getElementById('id').style.pointerEvents = 'auto';
// Use '' if you want to allow CSS rules to set the value

// It turned out to be bad practice.  It is better to rewrite the function with changing the event listener.  Remove the onclick event listener, add the onclick event listener.

function MakeProduction() {
    ViewMessage("Production", "Test production message.");
}

function ViewInventory() {
    ViewMessage("Invetary", "Test inventary message.");
}

function ViewProfile() {
    ViewMessage("Profile", "Test profile message.");
}

function Eat() {
    if (hunger > 0) {
        hunger -= 1;
        health += 1;
    } else {
        ViewMessage("Eat food", "You looked at this piece of food and realized that you were so fed up that you could not eat a single piece.")
    }

    var totalHunger = document.getElementById('hunger');
    totalHunger.innerHTML = hunger;

    var totalHunger = document.getElementById('health');
    totalHunger.innerHTML = health;
}


// sleep until the next morning
// +1 to health, +20 to hunger
function SleepOneDay() {
    tendays = 0;
    day += 1;

    if (hunger < 100) {
        health += 1;
        hunger += 20;
    } else {
        ViewMessage("Sleep", "You are so hungry that you began to lose health.");
        health -= 2;
    }

    var totalDay = document.getElementById('day');
    var totalHealth = document.getElementById('health');
    var totalHunger = document.getElementById('hunger');

    totalDay.innerHTML = day;
    totalHealth.innerHTML = health;
    totalHunger.innerHTML = hunger;

    ViewMessage("Sleep", "You slept until the morning and you feel much better.  Although hungry.");

    TurnSearchCounter(tendays);
}

function CloseWindow() {
    var msgwind = document.getElementById("modal");
    msgwind.style.display = "none";
}
