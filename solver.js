(function() {

	var matrizOriginal = [];
	var k = 0;

	var matrizAuxJacobi = [];
	matrizAuxJacobi[k] = [0, 0, 0];
	var matrizErroJacobi = [];
	matrizErroJacobi[k] = [0, 0, 0];

	var matrizAuxSeidel = [];
	matrizAuxSeidel[k] = [0, 0, 0];
	var matrizErroSeidel = [];
	matrizErroSeidel[k] = [0, 0, 0];

	$(document).ready(function(){

		var testarJacobi = false;
		var testarSeidel = false;

		$('#step').on('click', function(){
			
			if (testarJacobi) {
				gaussJacobi();
				// gaussSeidel();
			}
			if (testarSeidel) {
				// gaussSeidel();
			}

		});

		$('#convergencia').click(function(){

			matrizOriginal[0] = [parseInt($('#x1').val()), parseInt($('#y1').val()), parseInt($('#z1').val())];
			matrizOriginal[1] = [parseInt($('#x2').val()), parseInt($('#y2').val()), parseInt($('#z2').val())];
			matrizOriginal[2] = [parseInt($('#x3').val()), parseInt($('#y3').val()), parseInt($('#z3').val())];
			console.log(matrizOriginal);

			if (convergenciaLinha() || convergenciaColuna()) {

				$('#step').prop('disabled','');
				$('#solve').prop('disabled','');
				
				$('#testeConv').css('display','block');
				$('#testes').css('display','block');
				$('#tableJacobi').css('color','#000');

				$('#respJacobi').text('Sim');
				$('#respSeidel').text('Sim');

				testarJacobi = true;
				testarSeidel = true;

				return true;
			}

			//TESTE DE SASSENFELD SÓ SE APLICA AO GAUSS SEIDEL
			if (convergenciaSassenfeld()) {

				$('#step').prop('disabled','');
				$('#solve').prop('disabled','');

				$('#testeConv').css('display','block');
				$('#testes').css('display','block');
				$('#tableJacobi').css('color','#999');

				$('#respJacobi').text('Não');
				$('#respSeidel').text('Sim');

				testarJacobi = false;
				testarSeidel = true;

				return true;
			}

			alert('Sistema não converge!');
			return false;

	
		});
	});

	function gaussJacobi () {
		if (k == 0) {
			var x = (parseInt($('#e1').val())) / matrizOriginal[0][0];
			var y = (parseInt($('#e2').val())) / matrizOriginal[1][1];
			var z = (parseInt($('#e3').val())) / matrizOriginal[2][2];

			matrizAuxJacobi[k] = [parseFloat(x.toFixed(6)),parseFloat(y.toFixed(6)),parseFloat(z.toFixed(6))];
			matrizErroJacobi[k] = [Math.abs(x),Math.abs(y),Math.abs(z)];
		} else {
			var x = (parseInt($('#e1').val()) + (matrizOriginal[0][1] * matrizAuxJacobi[k-1][1] * -1) + (matrizOriginal[0][2] * matrizAuxJacobi[k-1][2] * -1)) / matrizOriginal[0][0];
			console.log("(" + (parseInt($('#e1').val()) + " + " + (matrizOriginal[0][1] * matrizAuxJacobi[k-1][1] * -1) + " + " + (matrizOriginal[0][2] * matrizAuxJacobi[k-1][2] * -1)) + " / " + matrizOriginal[0][0] + " = " + x);
			var y = (parseInt($('#e2').val()) + (matrizOriginal[1][0] * matrizAuxJacobi[k-1][0] * -1) + (matrizOriginal[1][2] * matrizAuxJacobi[k-1][2] * -1)) / matrizOriginal[1][1];
			var z = (parseInt($('#e3').val()) + (matrizOriginal[2][0] * matrizAuxJacobi[k-1][0] * -1) + (matrizOriginal[2][1] * matrizAuxJacobi[k-1][1] * -1)) / matrizOriginal[2][2];
			matrizAuxJacobi[k] = [parseFloat(x.toFixed(6)),parseFloat(y.toFixed(6)),parseFloat(z.toFixed(6))];
			matrizErroJacobi[k] = [
				(Math.abs(x) - matrizErroJacobi[k-1][0]),
				(Math.abs(y) - matrizErroJacobi[k-1][1]),
				(Math.abs(z) - matrizErroJacobi[k-1][2])
			];
		}

		imprimeNaTabela(k, '#tableJacobi');
		k++;
	}

	function convergenciaLinha () {

		var alfa1 = (Math.abs(matrizOriginal[0][1]) + Math.abs(matrizOriginal[0][2])) / Math.abs(matrizOriginal[0][0]);
		if (alfa1 >= 1) {
			return false;
		}

		var alfa2 = (Math.abs(matrizOriginal[1][0]) + Math.abs(matrizOriginal[1][2])) / Math.abs(matrizOriginal[1][1]);
		if (alfa2 >= 1) {
			return false;
		}

		var alfa3 = (Math.abs(matrizOriginal[2][0]) + Math.abs(matrizOriginal[2][1])) / Math.abs(matrizOriginal[2][2]);
		if (alfa3 >= 1) {
			return false;
		}

		return true;

	}

	function convergenciaColuna () {

		var alfa1 = (Math.abs(matrizOriginal[1][0]) + Math.abs(matrizOriginal[2][0])) / Math.abs(matrizOriginal[0][0]);
		if (alfa1 >= 1) {
			return false;
		}

		var alfa2 = (Math.abs(matrizOriginal[0][1]) + Math.abs(matrizOriginal[2][1])) / Math.abs(matrizOriginal[1][1]);
		if (alfa2 >= 1) {
			return false;
		}

		var alfa3 = (Math.abs(matrizOriginal[0][2]) + Math.abs(matrizOriginal[1][2])) / Math.abs(matrizOriginal[2][2]);
		if (alfa3 >= 1) {
			return false;
		}

		return true;
	}

	function convergenciaSassenfeld () {

		var beta1 = (Math.abs(matrizOriginal[0][1]) + Math.abs(matrizOriginal[0][2])) / Math.abs(matrizOriginal[0][0]);
		if (beta1 >= 1) {
			return false;
		}

		var beta2 = ((Math.abs(matrizOriginal[1][0])*beta1) + Math.abs(matrizOriginal[1][2])) / Math.abs(matrizOriginal[1][1]);
		if (beta2 >= 1) {
			return false;
		}

		var beta3 = ((Math.abs(matrizOriginal[2][0])*beta1) + (Math.abs(matrizOriginal[2][1]*beta2))) / Math.abs(matrizOriginal[2][2]);
		if (beta3 >= 1) {
			return false;
		}

		return true;
	}

	function imprimeNaTabela(i, tabela) {
		$(tabela + " tr:last").after("<tr><td>"+i+"</td><td>"+matrizAuxJacobi[i][0]+"</td><td>"+matrizAuxJacobi[i][1]+"</td><td>"+matrizAuxJacobi[i][2]+"</td><td>"+matrizErroJacobi[i][0]+"</td><td>"+matrizErroJacobi[i][0]+"</td><td>"+matrizErroJacobi[i][0]+"</td></tr>");
	}


})();

