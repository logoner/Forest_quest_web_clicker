// variabels:
var day = 0;
var tendays = 0;

// User States:
var health = 5;
var hunger = 0;

//var level = 0;
//var workshop = 0;
//var building = 0;

// Inventary:
var food = 0;
var materials = 0;

// level of clothes
var clothes = 0;

// level of house
var house = 0; // влияет на увеличение сытости во время еды и увеличение здоровья во время сна.
// Eat(): house == 0;
// food -= (1 + house); //(+1)
// hunger -= (2 + house); //(-2)
// health += (1 + house); //(+1)
//
// house == 1;
// food -= (1 + house); //(+2)
// hunger -= (2 + house); //(-3)
// health += (1 + house); //(+2)

// Monsters stage:
var monsterpow = 1; // Monster damage will increase
// depending on the character's health level.
//var damage = 1;
// damage = monsterpow - clothes;

// In this place, in my opinion, you need to change the damage level to 0, provided that the protection level is greater than the damage level.  But since my game code is not in a loop, I will put a check for this condition in the function SearchForest().

// ********
// Casual Events
var monsters = ["Evil wolf", "Evil bear", "Evil snake", ];
var lastMeeting; // последняя Встреча

var drop = ["food", "materials", ];

var searchResult = [monsters, drop, ];

// functions:
function CalcDamage(monsterpow, clothes, day){
    let damage = 1;
    
    // Monster power increases by 1 every 10 days.
    // In the first 10 days, the force is 1.
    monsterpow = 1+Math.floor(day/10 );
    //alert(monsterpow);
    if (clothes < monsterpow) {
        damage = monsterpow - clothes;
    } else {
        damage = 0;
    }
    
    return damage;
}

function ViewMessage(msgTitle, message) {
    document.getElementById('modal').style.pointerEvents = 'auto';

    // The following is a condition check ... I forgot why I wanted to do it.  Probably I wanted to change the style of the window to display the creation of products and inventory.  As a result, the code did not work and I added "_err" to the condition line so that this condition would not work.
    if (msgTitle == "Inventary_err") {
        document.getElementById('modal').style.pointerEvents = 'none';
    }
    document.getElementById("msg_title").innerHTML = msgTitle;
    document.getElementById("msg").innerHTML = message;
    document.getElementById("modal").style.display = "block";
    var textHistory = document.getElementById("history");
    textHistory.innerHTML = "- " + message + "<br />" + textHistory.innerHTML;
}

function ViewProdWindow() {
    document.getElementById("modal2").style.display = "block";
}

function randomInteger(min, max) {
    // get a random number from (min-0.5) to (max + 0.5)
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

function CasualEvent() {

    // Here events such as finding useful things or meeting monsters will be generated.
    let newSearch = searchResult[randomInteger(0, searchResult.length - 1)];

    // I dont understand what newSearch displays.
    //console.log(newSearch);
    //Ты нашёл еду. Ты нашёл материалы.
    //You have found food.  You found the materials.

    let newEvent = newSearch[randomInteger(0, newSearch.length - 1)];
    
    // place for the code for checking the coincidence of the current random meeting with the past (lastMeeting)
    // if there is a match, then generate a new random meeting.
    //alert("newEvent = " + newEvent);
    //alert("lastMeeting = " + lastMeeting);
    if (lastMeeting == newEvent) {
        CasualEvent();
        return;
    } else {
        lastMeeting = newEvent;
    }

    if (newEvent == "food") {
        let foodIncrement = randomInteger(1, 2);
        food += foodIncrement;
        // increment food from 1 to 2.
        ViewMessage("You have found " + foodIncrement + " " + newEvent, "Food is a particularly valuable thing. In addition, you are alone in the forest and there is no supermarket nearby."); //You have found food.
        
    } else if (newEvent == "materials") {
        ViewMessage("You found the " + newEvent, "As your grandfather said, there are no completely useless things."); //You found the materials.

        materials += 1;
        SetParamert("materials", materials);

    } else {
        // Meeting monsters
        ViewMessage("You met an " + newEvent, "Fresh scars will remind you of this meeting for a long time.");
        // Urgently add a direct dependence of damage
        // on the strength of monsters (growing by 1
        // every 10 days) and an inverse dependence on
        // the level of clothes. (Solved!)
        
        health -= CalcDamage(monsterpow, clothes, day);
        // health = health - 1 * (1+(day/10))
        SetParamert("health", health);

        hunger += monsterpow;
        // the stronger the monsters, the greater the feeling of hunger.
        SetParamert("hunger", hunger);


        if (health < 1) {
            Gameover();
        }
    }
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
        if (health < 1) {
            Gameover();
        }
    }
    TurnSearchCounter(tendays);
    CasualEvent();
    if (health < 1) {
        Gameover();
    }
}

// To disable: document.getElementById('id').style.pointerEvents = 'none';
// To re-enable: document.getElementById('id').style.pointerEvents = 'auto';
// Use '' if you want to allow CSS rules to set the value

// It turned out to be bad practice.  It is better to rewrite the function with changing the event listener.  Remove the onclick event listener, add the onclick event listener.

function MakeProduction() {
    ViewProdWindow();
    //ViewMessage("Production", "Test production message.");
}

function ViewInventory() {
    ViewMessage("Invetary", "Test inventary message.");
}

function ViewProfile() {
    ViewMessage("Profile", "Test profile message.");
}

function Eat() {
    if (food < 1) {
        ViewMessage("NO FOOD!", "And then you thought, where to find food?");
    } else if (hunger > 0) {
        food -= (1 + house);
        hunger -= (2 + house);
        health += (1 + house);
        if (hunger < 0){
            hunger = 0;
            SetParamert("hunger",hunger);
            SetParamert("health",health);
        }
    } else {
        ViewMessage("Eat food", "You looked at this piece of food and realized that you were so fed up that you could not eat a single piece.");
    }

    //var totalHunger = document.getElementById('hunger');
    //totalHunger.innerHTML = hunger;
    SetParamert("hunger",hunger);

    //var totalHealth = document.getElementById('health');
    //totalHealth.innerHTML = health;
    SetParamert("health",health);
}


// sleep until the next morning
// +1 to health, +20 to hunger
function SleepOneDay() {
    tendays = 0;
    day += 1;

    if (health < 1) {
        Gameover();
    } else if (hunger < 100) {
        health += (1 + 2*house);
        hunger += (5 - house);
        if (hunger > 100) {
            hunger = 100;
        }
    } else {
        ViewMessage("Sleep", "You are so hungry that you began to lose health.");
        health -= 2;
        hunger = 100;

        if (health < 1) {
            Gameover();
        }
    }

    SetParamert("day", day);
    SetParamert("health", health);
    SetParamert("hunger", hunger);

    ViewMessage("Sleep", "You slept until the morning and you feel much better.  Although hungry.");

    TurnSearchCounter(tendays);
}

function CloseProdWindow() {
    var msgwind = document.getElementById("modal2");
    msgwind.style.display = "none";
}


function CloseMsgWindow() {
    var msgwind = document.getElementById("modal");
    msgwind.style.display = "none";
}

function SetParamert(paramName, setValue) {
    let parameter = document.getElementById(paramName);
    parameter.innerHTML = setValue;
}

function MakeClothes() {
    if (materials > 9) {
        // level of clothes
        clothes += 1;
        materials -= 10;
        SetParamert("clothes", clothes);
        SetParamert("materials", materials);

        var msgwind = document.getElementById("modal2");
        msgwind.style.display = "none";
        
        // History entry
        var textHistory = document.getElementById("history");
        let message = "You used materials to improve your clothes. Current clothing level " + clothes;
        //Ты использовал материалы чтобы улучшить одежду.
        //Текущий уррвень одежды 
        textHistory.innerHTML = "- " + message + "<br />" + textHistory.innerHTML;
    } else {
        ViewMessage("Production", "The current number of materials is not enough.");
        var msgwind = document.getElementById("modal2");
        msgwind.style.display = "none";
    }
}

function MakeHouse() {
    if (materials > 49) {
        // level of house
        house += 1;
        materials -= 50;
        SetParamert("house", house);
        SetParamert("materials", materials);

        var msgwind = document.getElementById("modal2");
        msgwind.style.display = "none";

        var textHistory = document.getElementById("history");
        let message = "You used materials to improve your clothes. Current house level " + house;
        //Ты использовал материалы чтобы улучшить дом.
        //Текущий уррвень дома
        textHistory.innerHTML = "- " + message + "<br />" + textHistory.innerHTML;
    } else {
        ViewMessage("Production", "The current number of materials is not enough.");
        var msgwind = document.getElementById("modal2");
        msgwind.style.display = "none";
    }
}

function Gameover() {
    
    //let totalDay = document.getElementById('day');
    //var totalHealth = document.getElementById('health');
    //var totalHunger = document.getElementById('hunger');

    //totalDay.innerHTML = day;
    //totalHealth.innerHTML = health;
    //totalHunger.innerHTML = hunger;

    //day = totalDay.innerHTML;

    let textDay;
    if (day == "1") {
        textDay = " day.";
    } else {
        textDay = " days.";
    }
    ViewMessage("The game is over. You are dead.", " Just put up with it.  Maybe you will be pleased that you were able to extend the " + day + textDay);

    // variabels:
    day = 0;
    SetParamert("day", day);

    tendays = 0;
    //SetParamert("tendays", 0);

    health = 5;
    SetParamert("health", health);

    hunger = 0;
    SetParamert("hunger", hunger);


    // Inventary:
    food = 0;


    materials = 0;
    SetParamert("materials", materials);

    // level of clothes
    clothes = 0;
    SetParamert("clothes", clothes);

    // level of house
    house = 0;
    SetParamert("house", house);

    // Monsters stage:
    //monster = 0;
    monsterpow = 1;

    //let texHistory = "Is it all going to happen again??? Before this incident, you did not believe in traveling to other worlds. But everything happens for the first time. You have one hope - to live as many days as possible. Maybe someone will save you soon."
    let historyAgain = document.getElementById('history');
    historyAgain.innerHTML = "Is it all going to happen again??? Before this incident, you did not believe in traveling to other worlds. But everything happens for the first time. You have one hope - to live as many days as possible. Maybe someone will save you soon.";
}