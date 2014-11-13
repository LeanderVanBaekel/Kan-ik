var dbVersion = 50;

var db = Ti.Database.install('/kanje.sqlite','kanje' + dbVersion);
var db = Ti.Database.open('kanje' + dbVersion);

var rows = db.execute('SELECT * FROM inkomen');
var data = [];

while(rows.isValidRow()){
	data.push({
		title: rows.fieldByName('in_name'), 
		price: rows.fieldByName('in_price')
	});
	rows.next();
}

var setData = function(){
	$.werkT.text = data[0].title;
	$.stufiT.text = data[1].title;
	$.zorgT.text = data[2].title;
	
	$.werk.value = data[0].price;
	$.stufi.value = data[1].price;
	$.zorg.value = data[2].price;
};

setData();

var updateData = function(){
	db.execute("UPDATE inkomen SET in_price = "+ $.werk.value +" WHERE id='1' ");
	db.execute("UPDATE inkomen SET in_price = "+ $.stufi.value +" WHERE id='2' ");
	db.execute("UPDATE inkomen SET in_price = "+ $.zorg.value +" WHERE id='3' ");
};

var uitPage = function(){
	updateData();
	rows.close();
	db.close();
	$.inkomsten.close();
	
	var winUitgaven = Alloy.createController('uitgaven').getView();
	winUitgaven.open();
};
