/**
 * Created by palm on 2017-07-21.
 */

var out = "";
var dataTable;
var rows = 1;
var cols = 1;
var loaded = false;

function loadData() {
    console.log("Click");
    var url="https://docs.google.com/spreadsheets/d/1graF65EZVf1rSmRg7gogaaspT2UbuICsgrccIjvW3fg/pub?output=tsv";
    var xmlhttp=new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState == 4 && xmlhttp.status==200){
            out = xmlhttp.responseText;
            loaded = true;
            // console.log("out1: " +out);
            // document.getElementById("display").innerHTML = out;
        }
    };
    xmlhttp.open("GET",url,true);
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

    console.log(dataTable);
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


function onClickButton() {
    loadData();

    updateTableSize();
    dataTable = createArray(rows,cols);
    loadTable();


}





