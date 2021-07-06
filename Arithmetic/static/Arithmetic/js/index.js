// Functions for main page (index.html)

// Function to create url that user will be redirected to
function getGamePath(){
    var minutes = document.getElementById("time_input").value;
    var level_options = document.getElementsByName("levels");
    for (i=0; i<level_options.length; i++){
        if (level_options[i].checked){
            var selectedLevel = level_options[i].value.toLowerCase();
        }
    }
    var op_options = document.getElementsByName("operators");
    var selectedOps = [];
    for (i=0; i<op_options.length; i++){
        if (op_options[i].checked){
            selectedOps.push(op_options[i].value);
        }
    }
    selectedOps = selectedOps.join('');
    var gamePath = 'game';
    var gameQueryString = '?t=' + minutes + '&lvl=' + selectedLevel + '&ops=' + selectedOps;
    return gamePath + gameQueryString;
}   


// Function used for 'start game' button click
function startGame(){
    var selectedGamePath = getGamePath();
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