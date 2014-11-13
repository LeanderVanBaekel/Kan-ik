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

var setData = function(){
	$.huurT.text = data[0].title;
	$.studieT.text = data[1].title;
	$.abboT.text = data[2].title;
	
	$.huur.value = data[0].price;
	$.studie.value = data[1].price;
	$.abbo.value = data[2].price;
};

setData();

var updateData = function(){
	db.execute("UPDATE Uitgaven SET uit_price = "+ $.huur.value +" WHERE uit_id='1' ");
	db.execute("UPDATE Uitgaven SET uit_price = "+ $.studie.value +" WHERE uit_id='2' ");
	db.execute("UPDATE Uitgaven SET uit_price = "+ $.abbo.value +" WHERE uit_id='3' ");
};

var back = function(){
	$.uitgaven.close();
	var inkomsten = Alloy.createController('inkomsten').getView();
	inkomsten.open();
};

var total = function(){
	updateData();
	rows.close();
	db.close();
	
	$.uitgaven.close();
	var totalPage = Alloy.createController('index2').getView();
	totalPage.open();
};

