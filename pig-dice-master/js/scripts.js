var Pig = {
  player1: 0,
  player2: 0,
  currentScore: 0,
  activePlayer: 1,
  rollDice: function(){
    var roll = Math.floor(Math.random() * 6) + 1;
    if (roll === 1) {
      this.currentScore = 0;
      this.switchActivePlayer();
    }
    else {
      this.currentScore += roll;
    }
    return roll;
  },
  hold: function(){
    this.switchActivePlayer();
    this.currentScore = 0;
  },
  switchActivePlayer: function(){
    if(this.activePlayer === 1){
      this.player1 += this.currentScore;
      this.activePlayer = 2;
    }else{
      this.player2 += this.currentScore;
      this.activePlayer = 1;
    }
  }

};

$(document).ready(function(){
  var game = Object.create(Pig);
  var player1wins = 0;
  var player2wins = 0;
  var checkPlayer = function() {
    var player = game.activePlayer;
    if (player === 1) {
      $("h2#player1").css('color', 'blue');
      $("h2#player2").css('color', 'grey');
      $("#player2buttons").fadeOut(2000);
      $("#player1buttons").fadeIn(2000).delay(1000);
    } else {
      $("h2#player2").css('color', 'green');
      $("h2#player1").css('color', 'grey');
      $("#player1buttons").fadeOut(2000);
      $("#player2buttons").fadeIn(2000).delay(1000);
    }
  };

  checkPlayer();


  var playerRoll = function() {
    var dice = game.rollDice();
    var output = "&#x268" + (dice-1) + ";";
     $("#displaydice").html(output);
     $("#dice").text(dice);
     changePlayerAndRefreshScores();
  }

  $("button#roll").click(function(){
    playerRoll();
  });

  $("button#hold").click(function(){
    game.hold();
    changePlayerAndRefreshScores();
  });

  $(document).keypress(function(event) {
    if((event.which == 122) && (game.activePlayer===1)){
      playerRoll();
    }else if((event.which == 47) && (game.activePlayer == 2)){
      playerRoll();
    }else if((event.which == 32)){
      game.hold();
      changePlayerAndRefreshScores();
    }
  });


  var changePlayerAndRefreshScores = function(){
    checkWin();
    refreshScores();
    checkPlayer();
  }

  var checkWin = function(){
    if(game.player1 >= 100){
      alert("WE GOT A WINNER!! PLAYER 1 WINS!!");
      game = Object.create(Pig);
      player1wins+=1;
      $("#player1wins").text(player1wins);
    } else if (game.player2 >= 100){
      alert("WE GOT A WINNER!! PLAYER 2 WINS");
      game = Object.create(Pig);
      player2wins+=1;
      $("#player2wins").text(player2wins);
    }
  };

  var refreshScores = function(){
    $("#player1score").text(game.player1);
    $("#player2score").text(game.player2);
    $("#current").text(game.currentScore);
  }

});
