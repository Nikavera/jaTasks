(function () {
	var operand1 = document.getElementById('firstOperand'),
		operand2 = document.getElementById('secondOperand'),
		operatorsContainer = document.getElementById('allOperators'),
		result = document.getElementById('result'),
		actions = {
			'plus': '+' ,
			'minus': '-' ,
			'multiply': '*' ,
			'divide': '/'
		};

	operatorsContainer.onclick = function(e) {
		e = e || event; 
		var target = e.target || e.srcElement;

		while (target.nodeName != 'BUTTON') {
			target = target.parentNode;				
		}

		var dataAction = target.getAttribute('data-action');
		calculate(dataAction);

	}
		
	function calculate(action) {
		var val1 = parseInt(operand1.value);
		var val2 = parseInt(operand2.value);
		
		if (!val1 || !val2) {
			alert("Введите все числа (они должны быть отличными от 0)");
			return;
		}
		
		result.innerHTML = eval(val1 + actions[action] + val2);
	}

})();
/*
1.	Необходимо написать простой калькулятор. От пользователя требуется ввести два операнда, выбрать один из операторов (+, -, *, /, %). Затем должен быть выведен результат операции. 
2.	Система исчисления десятичная.
3.	В задаче должна использоваться только одна функция для вычисления результата, в которую оператор должен передаваться через контекст. Операнды передаются обычным методом, в качестве аргументов, однако их использование нельзя осуществлять через именованные аргументы функции, нужно получить их внутри функции альтернативным способом. 
4.	Код должен содержать проверки на некорректно введенные данные.
*/