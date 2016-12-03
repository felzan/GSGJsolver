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

	var sbx = $('#sbx').text();
	var sby = $('#sby').text();
	var sbz = $('#sbz').text();

	var jbx = $('#jbx').text();
	var jby = $('#jby').text();
	var jbz = $('#jbz').text();

	// console.log(x1);
	// var tab = [];
	var va = [];
	// tab.push([x1, y1, z1]);
	// tab.push([x2, y2, z2]);
	// tab.push([x3, y3, z3]);

	var erroaceitavel = $('#erroaceitavel').val();

	//GJ
	va[0] = (e1 - y1*jby - z1*jbz)/x1;
	va[1] = (e2 - x2*jbx - z2*jbz)/y2;
	va[2] = (e3 - y3*jby - x3*jbx)/z3;

	//GS
	va[3] = (e1 - y1*((va[4]) ? va[4] : sby) - z1*((va[5]) ? va[5] : sbz))/x1;
	va[4] = (e2 - x2*va[3] - z2*sbz)/y2;
	va[5] = (e3 - y3*va[4] - x3*va[3])/z3;

	$('#jbx').text(va[0]);
	$('#jby').text(va[1]);
	$('#jbz').text(va[2]);


	$('#sbx').text(va[3]);
	$('#sby').text(va[4]);
	$('#sbz').text(va[5]);

	if($('#valordeXJ').text() == "?")
	if(Math.abs(Math.abs(Math.round(va[0]) - va[0])) <= erroaceitavel){
		$('#valordeXJ').text(Math.round(va[0]));
	}

	if($('#valordeYJ').text() == "?")
	if(Math.abs(Math.abs(Math.round(va[1]) - va[1])) <= erroaceitavel){
		$('#valordeYJ').text(Math.round(va[1]));
	}

	if($('#valordeZJ').text() == "?")
	if(Math.abs(Math.abs(Math.round(va[2]) - va[2])) <= erroaceitavel){
		$('#valordeZJ').text(Math.round(va[2]));
	}

	//
	if($('#valordeXS').text() == "?")
	if(Math.abs(Math.abs(Math.round(va[3]) - va[3])) <= erroaceitavel){
		$('#valordeXS').text(Math.round(va[3]));
	}

	if($('#valordeYS').text() == "?")
	if(Math.abs(Math.abs(Math.round(va[4]) - va[4])) <= erroaceitavel){
		$('#valordeYS').text(Math.round(va[4]));
	}

	if($('#valordeZS').text() == "?")
	if(Math.abs(Math.abs(Math.round(va[5]) - va[5])) <= erroaceitavel){
		$('#valordeZS').text(Math.round(va[5]));
	}
});
//

});