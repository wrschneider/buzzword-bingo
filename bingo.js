$(document).ready(function() { 
	var generateCards = function generateCards() {
		var words, num, i, randomizedWords;
		
		words = $("textarea").val().split("\n");
		_.remove(words, function(word) { return !word; });
		while (words.length < 24) {
			words = words.concat(words);
		}
		
		num = $("input[name='count']").val();
		$("#output").empty();
		
		for (i = 0; i < num; i++) {
			randomizedWords = randomizeCardWords(words);
			$("#output").append(generateOneCard(randomizedWords));
		}

		$("#print").removeClass("disabled");
		return false;
	};
	
	var randomizeCardWords = function randomizeCardWords(words) {
		words = _.shuffle(words);
		var matrix = [];
		var i, j;
		
		for (i = 0; i < 5; i++) {
			if (!matrix[i]) {
				matrix[i] = [];
			}
		
			for (j = 0; j < 5; j++) {
				if (i == 2 && j == 2) {
					matrix[i].push("*");
					continue;
				}
				matrix[i].push(words.pop());
			}
		}
		return matrix;
	};
	
	var generateOneCard = function generateOneCard(matrix) {
		var $table = $("<table class='table table-bordered'><tr></tr></table>"), 
			$tr, $td;
		var i, j;
		for (i = 0; i < 5; i++) {
			$table.find("tr").append($("<th>" + "BINGO".charAt(i) + "</th>"));
		}
			
		for (i = 0; i < 5; i++) {
			$tr = $("<tr>")	
			for (j = 0; j < 5; j++) { 
				$td = $("<td>" + matrix[i][j] + "</td>");
				$tr.append($td);
			}
			$table.append($tr);
		}
		return $table;
	};
	
	$("#generate").click(generateCards);
	$("#print").click(function() {window.print(); });

});
