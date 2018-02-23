var startTimer = function() {
  window.startTime = Date.now();
  console.log("timer started");
}
var stopTimer = function() {
  var minutesTaken = (Date.now() - window.startTime) / 1000 / 60;
  var wordCount = $('#newText').val().match(/[^\s]+/g).length;
  console.log("Average WPM: " + (wordCount/minutesTaken));
}

$(document).ready(function() {

  var inputMonitor = function() {
    var c = $('.activeWord').html();
    var i = $('.txtInput').val();

    if( !(i === c.substr(0,i.length)) ) {
      $('.activeWord').css('color', '#FF0000');
    } else {
      if(i.length === c.length) {
        var newActive = $('.restWords').html().match(/^[^\s]+[\s]?/)
        if(newActive == null) {
          newActive = ""
        } else {
          newActive = newActive[0];
        }
        var rem = $('.restWords').html().substr(newActive.length);

        $('.activeWord').html(newActive);
        $('.restWords').html(rem);
        $('.txtInput').val("");
      } else {
        $('.activeWord').css('color', '#00FF00');
      }
    }
  }

  var firstInput = function() {
    startTimer();
    inputMonitor();
    $('.txtInput').off('input');
    $('.txtInput').on('input', inputMonitor);
  }

  $('.txtInput').on("input", firstInput);

  $('#reset').on('click', function() {
    console.log("RESET")

    var newText = $('#newText').val();
    if(newText === "") {
      newText = "The quick brown fox jumps over the lazy dog."
      $('#newText').val(newText);
    }

    var firstWord = newText.match(/^[^\s]+[\s]?/)[0];
    var rem = newText.substr(firstWord.length);

    $('.activeWord').html(firstWord);
    $('.restWords').html(rem);
    $('.txtInput').off('input');
    $('.txtInput').on('input', firstInput);
  })



})
