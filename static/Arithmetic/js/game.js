

function getGameOptions(){
    var host = "https://math--practice.herokuapp.com/";
    console.log(host);
    // https://www.sitepoint.com/get-url-parameters-with-javascript/
    var queryString = window.location.search;
    // get t, lvl and ops values
    var urlParameters = new URLSearchParams(queryString);
    // if any of the param keys are not in the url (e.g. /game?t)
    if (urlParameters.length <= 11){
        window.location.href = host + "/error";
        console.log("This is an invalid game. Please re-configure your options.");
        return;
    }
    var time = urlParameters.get('t');
    var level = urlParameters.get('lvl');
    var operators = urlParameters.get('ops'); //first letter of each
    // if one of params is empty, send to error page
    var errorPath = host + "/error";
    var missingParams = "";
    if (time==="" || level==="" || operators===""){
        // check which param(s) are missing
        if (time==""){
            missingParams += 't';
        }
        if (level=="") {
            missingParams += '-lvl';
        } 
        if (operators=="") {
            missingParams += '-ops';
        }
        window.location.href = errorPath + "?missing=" + missingParams;
        console.log("This is an invalid game. Please re-configure your options. " + missingParams);
    }
    
    else {
        return [time, level, operators]
    }
}

function startTimer(){
    // get user input
    var input_minutes = getGameOptions()[0];
    // Add one second to show the max duration time at start of timer
    var input_seconds = input_minutes * 60 + 1;
    var timer = setInterval(function(){
        input_seconds--;
        var minutes = Math.floor(input_seconds/60);
        var seconds = Math.floor(input_seconds) - Math.round(minutes*60);
        var hours_display = "";
        var minutes_display = minutes;
        var seconds_display = seconds;
        // format display to show :00 to :59 seconds
        if (seconds < 10) {
            seconds_display = "0" + seconds;
        } 
        // format to show 00: to 59: minutes
        if (minutes < 10){
            minutes_display = "0" + minutes;
        } 
        if (minutes >= 60) {
            var hours = Math.floor(minutes/60);
            var minutes_left = Math.floor(minutes) - Math.round(hours*60);
            hours_display = hours + ' : ';
            minutes_display = minutes_left;
            if (minutes_left < 10) {
                minutes_display = "0" + minutes_left;
            }
            if (hours < 10){
                hours_display = "0" + hours + ' : ';
            }
        }
        var timer_display = hours_display + minutes_display + ' : ' + seconds_display;
        // display timer 
        document.getElementById("timer").textContent = timer_display;
        // if timer is done
        if (input_seconds <= 0){
            //console.log("Time is up.")
            document.getElementById('timerBox').innerHTML = "Game Finished";
            document.getElementById('questionBox').style.display = 'none';
            clearInterval(timer);
        }
    },1000);
}

function sleep(seconds){
    var ms = seconds * 1000;
    var start = new Date().getTime();
    for (var i=0; i<1e7; i++) {
        if ((new Date().getTime() - start > ms)){
            break;
        }
    }
}


function getRandomInt(){
    var level = getGameOptions()[1];
    // pick larger numbers to increase difficulty for levels
    if (level==="easy"){
        var a = Math.floor(Math.random()*100) + 1;
    }
    else if (level==="medium"){
        var a = Math.floor(Math.random()*1000) + 1;
    }
    else if (level==="hard"){
        var a = Math.floor(Math.random()*10000) + 1;
    }
    /*
    else if (level==="veryhard"){
        var a = Math.floor(Math.random()*100000) + 1;
    }
    */
    // return random single integer
    return a;
}

function getProblem(){
    var selectedOps = getGameOptions()[2];
    var a = getRandomInt();
    var b = getRandomInt();
    // get operators based on query string abbreviations
    var ops = [];
    for (i=0; i <selectedOps.length; i++){
        if (selectedOps[i] == 'a'){
            ops.push('+');
        }
        else if (selectedOps[i] == 's'){
            ops.push('-');
        }
        else if (selectedOps[i] == 'm'){
            ops.push('&#215;');
        }
        else if (selectedOps[i] == 'd'){
            ops.push('&#247;');
        }
    }
    // choose random operator
    var op = ops[Math.floor( Math.random()*ops.length )];

    // Display: a [operator] b =
    document.getElementById("num1").textContent = a;
    document.getElementById("operator").innerHTML = op;
    document.getElementById("num2").textContent = b;
}


function checkAnswer(correct_answer, user_answer) {
    if (correct_answer===user_answer){
        return true;
    }else{
        return false;
    }
}

// Check button click and pressing enter in answer box
function check(){
    var score = parseInt(document.getElementById("score").textContent);
    var a = parseInt(document.getElementById("num1").textContent);
    var op = document.getElementById("operator").textContent;
    var b = parseInt(document.getElementById("num2").textContent);
    // compute correct answer
    var correct_answer = -100000;
    if (op == '+'){
        correct_answer = a + b;
    } else if (op == '-') {
        correct_answer = a - b;
    } else if (op == '×' || op == '&#215;') {
        correct_answer = a * b;
    } else if (op=='÷' || op == '&#247;') {
        // could include non-integer answers
        correct_answer = a / b;
    }
    console.log("Correct answer:" + correct_answer)
    // read user's answer input (float for division)
    var user_answer = parseFloat(document.getElementById('input_answer').value);
    // if answer is correct:
    if ( checkAnswer(correct_answer, parseInt(user_answer)) ){
        //document.getElementById('input_answer').style.color= "green";
        document.getElementById('input_answer').value = ''; //clear input box
        getProblem();
        // after fixing an incorrect answer
        document.getElementById('input_answer').style.color= "black";
        score++;
        document.getElementById('score').innerHTML = score;
    }
    // if answer is incorrect:
    else{
        document.getElementById('input_answer').style.color= "red";
    }
}

// Use 'enter' inside input box to check answer/go to next question
var input_answer = document.getElementById('input_answer');
input_answer.addEventListener("keyup",function(e) {
    if (e.key == "Enter") {
        e.preventDefault();
        document.getElementById('check_btn').click();
    }
});


// onload of game page: start timer and show first question
function startGame(){
    startTimer();
    getProblem();
}