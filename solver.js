$(document).ready(function(){

var itera = 0;

$('#step').click(function(){
	$('#iteracao').text(++itera);

	var x1 = $('#x1').val();
	var y1 = $('#y1').val();
	var z1 = $('#z1').val();

	var x2 = $('#x2').val();
	var y2 = $('#y2').val();
	var z2 = $('#z2').val();

	var x3 = $('#x3').val();
	var y3 = $('#y3').val();
	var z3 = $('#z3').val();

	var e1 = $('#e1').val();
	var e2 = $('#e2').val();
	var e3 = $('#e3').val();

	var bx = $('#bx').text();
	var by = $('#by').text();
	var bz = $('#bz').text();

	// console.log(x1);
	// var tab = [];
	var va = [];
	// tab.push([x1, y1, z1]);
	// tab.push([x2, y2, z2]);
	// tab.push([x3, y3, z3]);

	va[0] = (e1 - y1*by - z1*bz)/x1;
	va[1] = (e2 - x2*bx - z2*bz)/y2;
	va[2] = (e3 - y3*by - x3*bx)/z3;

	$('#bx').text(va[0]);
	$('#by').text(va[1]);
	$('#bz').text(va[2]);
// console.log(tab[1][2].val());
});
// function GS(){

// }

});