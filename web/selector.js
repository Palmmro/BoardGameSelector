/**
 * Created by palm on 2017-07-21.
 */

var out = "";
var dataTable;
var rows = 1;
var cols = 1;
var games = [rows-1];

var prefTime;
var prefNrPlayers;
var prefGamesArr = [];

var url="https://docs.google.com/spreadsheets/d/1graF65EZVf1rSmRg7gogaaspT2UbuICsgrccIjvW3fg/pub?output=tsv";

function onClickButton() {
    loadData();
    loadPreferences();
    displayRandomGame();
}

function displayRandomGame() {
    var textField1 = document.getElementById("textField1");
    if(prefGamesArr.length == 0){
        textField1.innerHTML = "<p>No matching game</p>";
    } else {
        var random = Math.floor((Math.random() * (prefGamesArr.length-1) +1));
        textField1.innerHTML = "<p>"+prefGamesArr[random].name+"</p>";
    }
}

function loadPreferences() {
    var inputTime = document.getElementById("inputtime");
    var inputPlayers = document.getElementById("inputplayers");
    prefTime = inputTime.value;
    prefNrPlayers = inputPlayers.value;

    prefGamesArr = [];
    for(var i = 0; i < games.length; i++){      //TODO could be more optimal but idc
        if((games[i].length <= prefTime || prefTime =="")
            && ((games[i].minplayers <= prefNrPlayers
            && games[i].maxplayers >= prefNrPlayers)||prefNrPlayers=="")){
            prefGamesArr.push(games[i]);
        }
    }
    console.log(prefGamesArr);


}

function loadData() {
    console.log("Click");

    var xmlhttp=new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status==200){
            out = xmlhttp.responseText;
            updateTableSize();
            dataTable = createArray(rows,cols);
            loadTable();
            fillGameArray();
        }
    };
    xmlhttp.open("GET",url,false);  //depricated need to set async to true
    xmlhttp.send(null);

}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }
    return arr;
}

function loadTable(){

    var currentStart = 0;
    var row = 0;
    var col = 0;

    for(var i = 0, len = out.length; i < len; i++){
        if(out[i] == "\t"){
            dataTable[row][col] = out.substring(currentStart,i);
            currentStart = i+1;
            col++;
        }
        if(out[i] == "\n"){
            dataTable[row][col] = out.substring(currentStart,i);
            currentStart = i+1;
            col = 0;
            row++;
        }
        if(i == len-1){
            dataTable[row][col] = out.substring(currentStart,i+1);
        }
    }
}

function updateTableSize(){
    var nrTab = 0;
    var nrEnt = 0;

    for(var i = 0, len = out.length; i < len; i++){
        if(out[i] == "\t"){
            nrTab++;
        }
        if(out[i] == "\n"){
            nrEnt++;
        }
    }
    rows = nrEnt +1;
    cols = (nrTab+rows)/rows;
}

function fillGameArray() {
    for(var i = 1; i < rows; i++){
        var tempGame = {
            name:dataTable[i][0],
            length:dataTable[i][1],
            minplayers:dataTable[i][2],
            maxplayers:dataTable[i][3]
        };
        games[i-1] = tempGame;
    }
}











