// Functions for main page (index.html)

// Function to create url that user will be redirected to
function getGamePath(){
    var host = "https://math--practice.herokuapp.com/";
    var errorString = "";
    // MINUTES
    var minutes = document.getElementById("time_input").value;
    // if time input is not a number or has no input
    if (isNaN(minutes) || minutes.length===0){
        errorString += 't';
        console.log("The input minutes was not numeric.");        
    }
    // LEVEL
    // get selected level of difficulty
    var level_options = document.getElementsByName("levels");
    for (i=0; i<level_options.length; i++){
        if (level_options[i].checked){
            var selectedLevel = level_options[i].value.toLowerCase();
        }
    }
    // OPERATORS 
    var op_options = document.getElementsByName("operators");
    var selectedOps = [];
    for (i=0; i<op_options.length; i++){
        if (op_options[i].checked){
            selectedOps.push(op_options[i].value);
        }
    }
    if (selectedOps.length===0){
        errorString += 'ops';
        console.log('There were no operators selected.');
    }
    else{
        var selectedOpsString = selectedOps.join('');
    }
    // GAME or ERROR 
    // if there are some errors, error page
    if (errorString.length > 0) {
        console.log(errorString);
        var errorQueryString = errorString;
        var errorPath = "error";
        return errorPath + "?error=" + errorQueryString;
    }
    else{ //game page
        var gamePath = 'game';
        var gameQueryString = '?t=' + minutes + '&lvl=' + selectedLevel + '&ops=' + selectedOpsString;
        return gamePath + gameQueryString;
    }
}   


// Function used for 'start game' button click
function startGame(){
    var selectedGamePath = getGamePath(); //or error page
    // send to url with specified params
    // with button click
    window.location.href = "https://math--practice.herokuapp.com/" + selectedGamePath ;
}

// send to url with enter key in time input box
var time_input_box = document.getElementById('time_input');
time_input_box.addEventListener("keyup", (e) => {
    if (e.key == "Enter") {
        //e.preventDefault();
        document.getElementById('start_game_btn').click();
    }
});