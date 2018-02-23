var activeWord;
var rest;

var readActiveWord = function() {
	return $('.hideableWords').children()[0].innerHTML;
}

var readRest = function() {
	return $('.hideableWords').children()[1].innerHTML
}

var readInput = function() {
	return $('.txtInput').val();
}

var run = function(rates) {
	var activeWord = readActiveWord();
	var rest = readRest();
	var input = readInput();
	var unTyped = (activeWord + rest).substr(input.length);

	if(unTyped === "") {
		return;
	}

	typeWord(unTyped, rates);
}

var typeWord = function(word, rates, unTyped) {
	if(unTyped === undefined) {
		unTyped = word;
	}

	var randomSpm = Math.floor(Math.random() * (rates.spm.max - rates.spm.min + 1)) + rates.spm.min;
	var freq = 1 / (randomSpm / 60);

	typeChar(unTyped.substr(0,1), freq * 1000, function(){
		if(unTyped.substr(1) === "") {
			run(rates)
		} else {
			typeWord(word, rates, unTyped.substr(1));
		}
	});
}

var typeChar = function(char, delay, fn) {
	setTimeout(function(){
		$('.txtInput').sendkeys(char);
		setTimeout(fn, 0);
	}, delay);
}

var deleteChar = function(delay, fn) {
	setTimeout(function(){
		$('.txtInput').trigger({type: 'keydown', key: 'Backspace'})
		fn();
	}, delay);
}

var approxStrokesPerMin = function(line, wpm) {
	var wordCount = line.match(/[^\s]+/g).length;
	var timeLimit = 1/wpm * wordCount;
	var minutesPerStroke = timeLimit / line.length;
	var strokesPerMinute = 1 / minutesPerStroke;

	return strokesPerMinute;
}

var start = function(startIn, minWpm, maxWpm, minErrorRate, maxErrorRate) {
	var maxStrokesPerMinute = approxStrokesPerMin(readActiveWord() + readRest(), minWpm);
	var minStrokesPerMinute = approxStrokesPerMin(readActiveWord() + readRest(), maxWpm);
	setTimeout(function() {
		run({
			spm: {
				min: minStrokesPerMinute,
				max: maxStrokesPerMinute
			},
			error: {
				min: minErrorRate,
				max: maxErrorRate
			}
		});
	}, startIn);
}
