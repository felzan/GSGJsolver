(function() {

	var matrizOriginal = [];
	var resultFuncoes  = [];
	
	var kJacobi = 0;
	var kSeidel = 0;

	var erroAceitavel = 0;
	var numeroIteracoes = 0;
	var casasErro = 6;

	var continuarJacobi = true;
	var confirmBoxJacobi = true;
	var continuarSeidel = true;
	var confirmBoxSeidel = true;

	var ultimoValorJacobi = [0, 0, 0];
	var ultimoValorSeidel = [0, 0, 0];

	var testarJacobi = false;
	var testarSeidel = false;


	$(document).ready(function(){


		$('#step').on('click', function(){

			$('#solve').attr('disabled', 'disabled');

			if (testarJacobi) {
				if (continuarJacobi) {
					gaussJacobi(kJacobi, true);					
				}
				if (continuarSeidel) {
					gaussSeidel(kSeidel, true);					
				}
			} else if (testarSeidel) {
				if (continuarSeidel) {
					gaussSeidel(kSeidel, true);
				}
			}

		});

		$('#solve').on('click', function() {

			$('#step').attr('disabled', 'disabled');

			for (var i = 0; i < numeroIteracoes; i++) {
				looping(i);

				if ((testarJacobi && (!continuarJacobi && !continuarSeidel))) {
					break;
				} else if (testarSeidel && !continuarSeidel) {
					break;
				}

			}

		});

		$('#convergencia').click(function(){

			matrizOriginal[0] = [parseInt($('#x1').val()), parseInt($('#y1').val()), parseInt($('#z1').val())];
			matrizOriginal[1] = [parseInt($('#x2').val()), parseInt($('#y2').val()), parseInt($('#z2').val())];
			matrizOriginal[2] = [parseInt($('#x3').val()), parseInt($('#y3').val()), parseInt($('#z3').val())];

			resultFuncoes = [parseInt($('#e1').val()), parseInt($('#e2').val()), parseInt($('#e3').val())];
			
			erroAceitavel = parseFloat($('#erroaceitavel').val());
			if (isNaN(erroAceitavel)) {
				erroAceitavel = 0;				
			} else {
				if ($('#erroaceitavel').val().length > 6) {
					casasErro = ($('#erroaceitavel').val().length - 2);
				}
			}

			kJacobi = 0;
			kSeidel = 0;

			numeroIteracoes = parseInt($('#numeroiteracoes').val());

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

	function looping (i) {
		setTimeout(function(){
			if (testarJacobi) {
				if (continuarJacobi) {
					gaussJacobi(i, false);
				}
				if (continuarSeidel) {
					gaussSeidel(i, false);
				}
			} else {
				if (continuarSeidel) {
					gaussSeidel(i, false);
				} else {
					return true;
				}
			}
		},100 * i);
	}

	function gaussJacobi (index, iterar) {

		var valorErro = [];
		
		if (index == 0) {
			
			var x = resultFuncoes[0] / matrizOriginal[0][0];
			var y = resultFuncoes[1] / matrizOriginal[1][1];
			var z = resultFuncoes[2] / matrizOriginal[2][2];

			var e1 = Math.abs(x - ultimoValorJacobi[0]);
				e1 = parseFloat(e1.toFixed(casasErro));

			var e2 = Math.abs(y - ultimoValorJacobi[1]);
				e2 = parseFloat(e2.toFixed(casasErro));

			var e3 = Math.abs(z - ultimoValorJacobi[2]);
				e3 = parseFloat(e3.toFixed(casasErro));

			if (confirmBoxJacobi) {
				validGauss(e1, e2, e3, 'jacobi');
			}

			valorErro = [e1, e2, e3];

			ultimoValorJacobi = [parseFloat(x.toFixed(6)),parseFloat(y.toFixed(6)),parseFloat(z.toFixed(6))];
			
			imprimeNaTabela(index, '#tableJacobi', ultimoValorJacobi, valorErro);
		} else {

			var x = (resultFuncoes[0] + (matrizOriginal[0][1] * ultimoValorJacobi[1] * -1) + (matrizOriginal[0][2] * ultimoValorJacobi[2] * -1)) / matrizOriginal[0][0];
			var y = (resultFuncoes[1] + (matrizOriginal[1][0] * ultimoValorJacobi[0] * -1) + (matrizOriginal[1][2] * ultimoValorJacobi[2] * -1)) / matrizOriginal[1][1];
			var z = (resultFuncoes[2] + (matrizOriginal[2][0] * ultimoValorJacobi[0] * -1) + (matrizOriginal[2][1] * ultimoValorJacobi[1] * -1)) / matrizOriginal[2][2];
		
			var e1 = Math.abs(x - ultimoValorJacobi[0]);
				e1 = parseFloat(e1.toFixed(casasErro));

			var e2 = Math.abs(y - ultimoValorJacobi[1]);
				e2 = parseFloat(e2.toFixed(casasErro));

			var e3 = Math.abs(z - ultimoValorJacobi[2]);
				e3 = parseFloat(e3.toFixed(casasErro));

			if (confirmBoxJacobi) {
				validGauss(e1, e2, e3, 'jacobi');				
			}

			valorErro = [e1, e2, e3];
			
			ultimoValorJacobi = [parseFloat(x.toFixed(6)), parseFloat(y.toFixed(6)), parseFloat(z.toFixed(6))];
			
			imprimeNaTabela(index, '#tableJacobi', ultimoValorJacobi, valorErro);
		}

		if (iterar) {
			kJacobi++;
		}
	}

	function gaussSeidel (index, iterar) {

		var valorErro = [];

		if (index == 0) {
			var x = resultFuncoes[0] / matrizOriginal[0][0];
			var y = (resultFuncoes[1] + (matrizOriginal[1][0] * parseFloat(x.toFixed(6)) * -1)) / matrizOriginal[1][1];
			var z = (resultFuncoes[2] + (matrizOriginal[2][0] * parseFloat(x.toFixed(6)) * -1) + (matrizOriginal[2][1] * parseFloat(y.toFixed(6)) * -1)) / matrizOriginal[2][2];

			var e1 = Math.abs(x - ultimoValorSeidel[0]);
				e1 = parseFloat(e1.toFixed(casasErro));

			var e2 = Math.abs(y - ultimoValorSeidel[1]);
				e2 = parseFloat(e2.toFixed(casasErro));

			var e3 = Math.abs(z - ultimoValorSeidel[2]);
				e3 = parseFloat(e3.toFixed(casasErro));

			if (confirmBoxSeidel) {
				validGauss(e1, e2, e3, 'seidel');				
			}

			valorErro = [e1, e2, e3];

			ultimoValorSeidel = [parseFloat(x.toFixed(6)),parseFloat(y.toFixed(6)),parseFloat(z.toFixed(6))];

			imprimeNaTabela(index, '#tableSeidel', ultimoValorSeidel, valorErro);
		} else {
			var x = (resultFuncoes[0] + (matrizOriginal[0][1] * ultimoValorSeidel[1] * -1) + (matrizOriginal[0][2] * ultimoValorSeidel[2] * -1)) / matrizOriginal[0][0];
			var y = (resultFuncoes[1] + (matrizOriginal[1][0] * parseFloat(x.toFixed(6)) * -1) + (matrizOriginal[1][2] * ultimoValorSeidel[2] * -1)) / matrizOriginal[1][1];
			var z = (resultFuncoes[2] + (matrizOriginal[2][0] * parseFloat(x.toFixed(6)) * -1) + (matrizOriginal[2][1] * parseFloat(y.toFixed(6)) * -1)) / matrizOriginal[2][2];
		
			var e1 = Math.abs(x - ultimoValorSeidel[0]);
				e1 = parseFloat(e1.toFixed(casasErro));

			var e2 = Math.abs(y - ultimoValorSeidel[1]);
				e2 = parseFloat(e2.toFixed(casasErro));

			var e3 = Math.abs(z - ultimoValorSeidel[2]);
				e3 = parseFloat(e3.toFixed(casasErro));

			if (confirmBoxSeidel) {
				validGauss(e1, e2, e3);
			}

			valorErro = [e1, e2, e3];

			ultimoValorSeidel = [parseFloat(x.toFixed(6)), parseFloat(y.toFixed(6)), parseFloat(z.toFixed(6))];
		

			imprimeNaTabela(index, '#tableSeidel', ultimoValorSeidel, valorErro);
		}

		if (iterar) {
			kSeidel++;
		}
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

		var v1 = null;
		var v2 = null;
		var v3 = null;

		var e1 = null;
		var e2 = null;
		var e3 = null;

		if (vetorErros[0] < erroAceitavel && vetorErros[0] >= 0) {

			v1 = "<td style='background-color:#007f1f;'>"+vetorValores[0]+"</td>";
			e1 = "<td style='background-color:#007f1f;'>"+vetorErros[0]+"</td>";
		} else {

			v1 = "<td>"+vetorValores[0]+"</td>";
			e1 = "<td>"+vetorErros[0]+"</td>";
		}

		if (vetorErros[1] < erroAceitavel && vetorErros[1] >= 0) {

			v2 = "<td style='background-color:#007f1f;'>"+vetorValores[1]+"</td>";
			e2 = "<td style='background-color:#007f1f;'>"+vetorErros[1]+"</td>";
		} else {

			v2 = "<td>"+vetorValores[1]+"</td>";
			e2 = "<td>"+vetorErros[1]+"</td>";
		}

		if (vetorErros[2] < erroAceitavel && vetorErros[2] >= 0) {

			v3 = "<td style='background-color:#007f1f;'>"+vetorValores[2]+"</td>";
			e3 = "<td style='background-color:#007f1f;'>"+vetorErros[2]+"</td>";
		} else {

			v3 = "<td>"+vetorValores[2]+"</td>";
			e3 = "<td>"+vetorErros[2]+"</td>";
		}

		if (i == 0) {
			$(tabela + " .corpoTabela").html("<tr><td style='background-color:#999;'>"+i+"</td>" + v1 + v2 + v3 + e1 + e2 + e3 + "</tr>");
		} else {
			$(tabela + " .corpoTabela tr:last").after("<tr><td style='background-color:#999;'>"+i+"</td>" + v1 + v2 + v3 + e1 + e2 + e3 + "</tr>");
		}
	}

	function validGauss(e1, e2, e3, tipo) {

		if (e1 < erroAceitavel && e1 >= 0 &&
			e2 < erroAceitavel && e2 >= 0 &&
			e3 < erroAceitavel && e3 >= 0 ) {

			if (tipo == 'jacobi') {
				if (confirm("Gauss Jacobi está dentro do erro aceitável.\n Continuar iterando?")) {
					continuarJacobi = true;					
				} else {
					continuarJacobi = false;
				}

				confirmBoxJacobi = false;				
			} else {
				if (confirm("Gauss Seidel está dentro do erro aceitável.\n Continuar iterando?")) {
					continuarSeidel = true;
				} else {
					continuarSeidel = false;
				}
				confirmBoxSeidel = false;
			}

			if (!continuarJacobi && !continuarSeidel) {
				$('#step').attr('disabled', 'disabled');
			}

		}
	}


})();

