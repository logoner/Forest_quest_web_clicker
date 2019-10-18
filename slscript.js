// variabels:
var day = 0;
var tendays = 0;

// User States:
var health = 5;
var hunger = 0;
var food = 0;
var level = 0;
var workshop = 0;
var clothes = 0;
var building = 0;

// functions:

// *for testing*
//function CangeDay(){
//    day += 1;
//    var calendar = document.getElementById('days');
//    calendar.value = day;
//}

// сон до утра следующего дня
// +1 к здоровью, +20 к голоду
function SleepOneDay(){
    //alert('Sleep')
    tendays = 0;
    day += 1;
    
    if(hunger < 100){
    health += 1;
    hunger += 20;
    }
    
    var totalDay = document.getElementById('day');
    var totalHealth = document.getElementById('health');
    var totalHunger = document.getElementById('hunger');
    
    totalDay.innerHTML = day;
    totalHealth.innerHTML = health;
    totalHunger.innerHTML = hunger;
    
    alert("Ты проспал до утра и чувствуешь себя гораздо лучше. Хотя и проголодался.")
}

function SearchForest(){
    tendays += 1;
    if (tendays == 10){
        tendays = 0;
        day += 1;
        var calendar = document.getElementById('day');
        calendar.innerHTML = day;
    }
}

function Eat(){
    //alert('Eat now');
    
    if(hunger > 0){
    hunger -= 1;
    }
    
    var totalHunger = document.getElementById('hunger');
    totalHunger.innerHTML = hunger;
    
}

function MakeProduction(){
    //alert('Production');
    var msgwind = document.getElementById("message");
    msgwind.style.display="block";
}

function ViewInventory(){
    //alert('Inventory');
    var msgwind = document.getElementById("message");
    msgwind.style.display="block";
}

function ViewProfile(){
    //alert('Inventory');
    var msgwind = document.getElementById("message");
    msgwind.style.display="block";
}

function CloseWindow(){
    var msgwind = document.getElementById("message");
    msgwind.style.display="none";
}