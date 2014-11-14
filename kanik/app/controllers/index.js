$.index.open();

// var fu = function() {
	// alert("hoi");  
// };
// 
// var klik = $.startButton;
// 
// klik.addEventListener("click", fu);

function beginPage(e) {
	var begin = Alloy.createController('index2').getView();
	begin.open();
	$.index.close();
}
