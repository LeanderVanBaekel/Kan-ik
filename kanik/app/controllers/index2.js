$.drawer.open();

function toggle(e) {
    var fn = 'toggle' + e.source.title + 'Window';
    $.drawer[fn]();
}

function beginPage(e) {
	var begin = Alloy.createController('index').getView();
	begin.open();
}

function inkomstenPage(e) {
	var inkomsten = Alloy.createController('inkomsten').getView();
	inkomsten.open();
}

function vastelastenPage(e) {
	var vastelasten = Alloy.createController('uitgaven').getView();
	vastelasten.open();
}

//DB
var dbVersion = 50;

var db = Ti.Database.install('/kanje.sqlite','kanje' + dbVersion);
var db = Ti.Database.open('kanje' + dbVersion);

var rows = db.execute('SELECT * FROM Uitgaven');
var data = [];

while(rows.isValidRow()){
	data.push({
		title: rows.fieldByName('uit_name'), 
		price: rows.fieldByName('uit_price')
	});
	rows.next();
}

var uitgavenTotal = 0;
for(var i = 0; i < data.length; i++){
	uitgavenTotal += data[i].price;
}

$.moneyOut.text = "€ " + uitgavenTotal;


//SCHEIDING
var rows2 = db.execute('SELECT * FROM Inkomen');
var data2 = [];

while(rows2.isValidRow()){
	data2.push({
		title: rows2.fieldByName('in_name'), 
		price: rows2.fieldByName('in_price')
	});
	rows2.next();
}

var inkomenTotal = 0;
for(var i = 0; i < data2.length; i++){
	inkomenTotal += data2[i].price;
}
 
$.moneyIn.text = "€ " + inkomenTotal;

var totaal = inkomenTotal - uitgavenTotal;
$.moneySaved.text = "€ " + totaal;
rows.close();
db.close();
