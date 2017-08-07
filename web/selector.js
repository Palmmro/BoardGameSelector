/**
 * Created by palm on 2017-07-21.
 */

var outputStr = "";     //the output obtained from the http request
var dataTable;
var rows = 1;
var cols = 1;
var gamesArr;

var prefTime;
var prefNrPlayers;
var prefGamesArr = [];

// var url="https://docs.google.com/spreadsheets/d/1graF65EZVf1rSmRg7gogaaspT2UbuICsgrccIjvW3fg/pub?output=tsv";
var url="https://docs.google.com/spreadsheets/d/1-C1du9zEFJ0qIMsIoHBLcRhdjK8s6HdWahkh8bpuuOU/pub?output=tsv";

function onClickButton() {
    loadData();
    loadPreferences();
    displayRandomGame();
}

/**
 * Displays random game based on input from user
 */
function displayRandomGame() {
    var textField1 = document.getElementById("textField1");
    if(prefGamesArr.length == 0){
        textField1.innerHTML = "<p>No matching game</p>";
    } else {
        var random = Math.floor((Math.random() * (prefGamesArr.length) ));
        textField1.innerHTML = "<p>"+prefGamesArr[random].name+"</p>";
    }
}

/**
 * Reads input from user and fills prefGamesArr
 */
function loadPreferences() {
    prefTime = document.getElementById("inputtime").value;
    prefNrPlayers = document.getElementById("inputplayers").value;

    prefGamesArr = [];
    for(var i = 0; i < gamesArr.length; i++){      //TODO could be more optimal but idc
        if((gamesArr[i].time <= prefTime || prefTime =="")
            && ((gamesArr[i].minplayers <= prefNrPlayers
            && gamesArr[i].maxplayers >= prefNrPlayers)||prefNrPlayers=="")){
            prefGamesArr.push(gamesArr[i]);
        }
    }
}

/**
 * Loads data from google spreadsheet and stores it as game objects in "gamesArr"
 * First gets the outputStr from the html request
 * Then uses outputStr to fill the 2x2 matrix dataTable with the data
 * Finally uses dataTable to create game objects and fills them in gamesArr
 * TODO error message if no internet or request failed
 */
function loadData() {
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status==200){
            outputStr = xmlhttp.responseText;
            updateTableSize();
            dataTable = createArray(rows,cols);
            loadTable();
            fillGameArray();
        }
    };

    xmlhttp.open("GET",url,false);  //depricated need to set async to true
    xmlhttp.send(null);

}

/**
 * Returns multidimensional array (multiple arguments are possible)
 * @param length
 * @returns {Array}
 */
function createArray(length) {
    var arr = new Array(length || 0);
    var  i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
}

/**
 * Updates matrix dataTable using the "outputStr"
 */
function loadTable(){
    var currentStart = 0;
    var row = 0;
    var col = 0;

    for(var i = 0, len = outputStr.length; i < len; i++){
        if(outputStr[i] == "\t"){
            dataTable[row][col] = outputStr.substring(currentStart,i);
            currentStart = i+1;
            col++;
        }
        if(outputStr[i] == "\n"){
            dataTable[row][col] = outputStr.substring(currentStart,i);
            currentStart = i+1;
            col = 0;
            row++;
        }
        if(i == len-1){
            dataTable[row][col] = outputStr.substring(currentStart,i+1);
        }
    }
}

/**
 * Updates variables rows and cols depending on the size of the spreadsheet obtained from outputStr
 */
function updateTableSize(){
    var nrTab = 0;
    var nrEnt = 0;

    for(var i = 0, len = outputStr.length; i < len; i++){
        if(outputStr[i] == "\t"){
            nrTab++;
        }
        if(outputStr[i] == "\n"){
            nrEnt++;
        }
    }
    rows = nrEnt +1;
    cols = (nrTab+rows)/rows;
}

/**
 * Fills the array "gamesArr" with game objects using data from dataTable
 */
function fillGameArray() {
    gamesArr = [rows-1];
    for(var i = 1; i < rows; i++){
        gamesArr[i-1] = {
            name:dataTable[i][0],
            time:dataTable[i][1],
            minplayers:dataTable[i][2],
            maxplayers:dataTable[i][3]
        };
    }
}











