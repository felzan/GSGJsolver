(function() {

	var matrizOriginal = [];
	var resultFuncoes  = [];
	
	var kJacobi = 0;
	var kSeidel = 0;
	var numeroiteracoes = 0;

	var ultimoValorJacobi = [0, 0, 0];
	var ultimoValorSeidel = [0, 0, 0];



	$(document).ready(function(){

		var testarJacobi = false;
		var testarSeidel = false;

		$('#step').on('click', function(){
			
			if (testarJacobi) {
				gaussJacobi();
				gaussSeidel();
			} else if (testarSeidel) {
				gaussSeidel();
			}

		});

		$('#convergencia').click(function(){

			matrizOriginal[0] = [parseInt($('#x1').val()), parseInt($('#y1').val()), parseInt($('#z1').val())];
			matrizOriginal[1] = [parseInt($('#x2').val()), parseInt($('#y2').val()), parseInt($('#z2').val())];
			matrizOriginal[2] = [parseInt($('#x3').val()), parseInt($('#y3').val()), parseInt($('#z3').val())];

			resultFuncoes = [parseInt($('#e1').val()), parseInt($('#e2').val()), parseInt($('#e3').val())];
			erroAceitavel = parseFloat($('#erroaceitavel').val());

			kJacobi = 0;
			kSeidel = 0;

			numeroiteracoes = parseInt($('#numeroiteracoes').val());

			$('#tableJacobi .corpoTabela').empty();
			$('#tableSeidel .corpoTabela').empty();

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
		if (kJacobi == 0) {
			
			var x = resultFuncoes[0] / matrizOriginal[0][0];
			var y = resultFuncoes[1] / matrizOriginal[1][1];
			var z = resultFuncoes[2] / matrizOriginal[2][2];

			var valorErro = [(Math.abs(x) - ultimoValorJacobi[0]),	(Math.abs(y) - ultimoValorJacobi[1]), (Math.abs(z) - ultimoValorJacobi[2])];
			ultimoValorJacobi = [parseFloat(x.toFixed(6)),parseFloat(y.toFixed(6)),parseFloat(z.toFixed(6))];

			imprimeNaTabela(kJacobi, '#tableJacobi', ultimoValorJacobi, valorErro);
		} else {

			var x = (resultFuncoes[0] + (matrizOriginal[0][1] * ultimoValorJacobi[1] * -1) + (matrizOriginal[0][2] * ultimoValorJacobi[2] * -1)) / matrizOriginal[0][0];
			var y = (resultFuncoes[1] + (matrizOriginal[1][0] * ultimoValorJacobi[0] * -1) + (matrizOriginal[1][2] * ultimoValorJacobi[2] * -1)) / matrizOriginal[1][1];
			var z = (resultFuncoes[2] + (matrizOriginal[2][0] * ultimoValorJacobi[0] * -1) + (matrizOriginal[2][1] * ultimoValorJacobi[1] * -1)) / matrizOriginal[2][2];

			console.log("x = (" + resultFuncoes[0] + " + " + (matrizOriginal[0][1] * ultimoValorJacobi[1] * -1) + " + " + (matrizOriginal[0][2] * ultimoValorJacobi[2] * -1) + " / " + matrizOriginal[0][0] + " = " + x);
			console.log("y = (" + resultFuncoes[1] + " + " + (matrizOriginal[1][0] * ultimoValorJacobi[0] * -1) + " + " + (matrizOriginal[1][2] * ultimoValorJacobi[2] * -1) + " / " + matrizOriginal[1][1] + " = " + y);
			console.log("z = (" + resultFuncoes[2] + " + " + (matrizOriginal[2][0] * ultimoValorJacobi[0] * -1) + " + " + (matrizOriginal[2][1] * ultimoValorJacobi[1] * -1) + " / " + matrizOriginal[2][2] + " = " + z);
			
			ultimoValorJacobi = [parseFloat(x.toFixed(6)), parseFloat(y.toFixed(6)), parseFloat(z.toFixed(6))];
			var valorErro = [(Math.abs(x) - ultimoValorJacobi[0]),	(Math.abs(y) - ultimoValorJacobi[1]), (Math.abs(z) - ultimoValorJacobi[2])];
			
			imprimeNaTabela(kJacobi, '#tableJacobi', ultimoValorJacobi, valorErro);
		}

		kJacobi++;
	}

	function gaussSeidel () {
		if (kSeidel == 0) {
			var x = resultFuncoes[0] / matrizOriginal[0][0];
			var y = (resultFuncoes[1] + (matrizOriginal[1][0] * parseFloat(x.toFixed(6)) * -1)) / matrizOriginal[1][1];
			var z = (resultFuncoes[2] + (matrizOriginal[2][0] * parseFloat(x.toFixed(6)) * -1) + (matrizOriginal[2][1] * parseFloat(y.toFixed(6)) * -1)) / matrizOriginal[2][2];

			var valorErro = [(Math.abs(x) - ultimoValorSeidel[0]),	(Math.abs(y) - ultimoValorSeidel[1]), (Math.abs(z) - ultimoValorSeidel[2])];
			ultimoValorSeidel = [parseFloat(x.toFixed(6)),parseFloat(y.toFixed(6)),parseFloat(z.toFixed(6))];

			imprimeNaTabela(kSeidel, '#tableSeidel', ultimoValorSeidel, valorErro);
		} else {
			var x = (resultFuncoes[0] + (matrizOriginal[0][1] * ultimoValorSeidel[1] * -1) + (matrizOriginal[0][2] * ultimoValorSeidel[2] * -1)) / matrizOriginal[0][0];
			var y = (resultFuncoes[1] + (matrizOriginal[1][0] * parseFloat(x.toFixed(6)) * -1) + (matrizOriginal[1][2] * ultimoValorSeidel[2] * -1)) / matrizOriginal[1][1];
			var z = (resultFuncoes[2] + (matrizOriginal[2][0] * parseFloat(x.toFixed(6)) * -1) + (matrizOriginal[2][1] * parseFloat(y.toFixed(6)) * -1)) / matrizOriginal[2][2];
		
			ultimoValorSeidel = [parseFloat(x.toFixed(6)), parseFloat(y.toFixed(6)), parseFloat(z.toFixed(6))];
			var valorErro = [(Math.abs(x) - ultimoValorSeidel[0]),	(Math.abs(y) - ultimoValorSeidel[1]), (Math.abs(z) - ultimoValorSeidel[2])];
		

			imprimeNaTabela(kSeidel, '#tableSeidel', ultimoValorSeidel, valorErro);
		}

		kSeidel++;
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

	function imprimeNaTabela(i, tabela, vetorValores, vetorErros) {

		if (i == 0) {

			$(tabela + " .corpoTabela").html("<tr><td>"+i+"</td><td>"+vetorValores[0]+"</td><td>"+vetorValores[1]+"</td><td>"+vetorValores[2]+"</td><td>"+vetorErros[0]+"</td><td>"+vetorErros[1]+"</td><td>"+vetorErros[2]+"</td></tr>");
		} else {			
			$(tabela + " .corpoTabela tr:last").after("<tr><td>"+i+"</td><td>"+vetorValores[0]+"</td><td>"+vetorValores[1]+"</td><td>"+vetorValores[2]+"</td><td>"+vetorErros[0]+"</td><td>"+vetorErros[1]+"</td><td>"+vetorErros[2]+"</td></tr>");			
		}
	}


})();

