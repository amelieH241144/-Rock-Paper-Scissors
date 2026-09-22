//AmelieCoetzee_H241144_Summetive
//window.alert("I am linked")

$(document).ready(function () {
  let userScore = 0;
  let computerScore = 0;
  const WINNING_SCORE = 5; 

// Generates a random move for the computer
  function getComputerMove() {
    const moves = ["rock", "paper", "scissors"];
    return moves[Math.floor(Math.random() * moves.length)];
  }
// Compares user's move to computer's and returns result
  function compareMoves(user, computer) {
    if (user === computer) return "draw";
     if (
    (user === "rock" && computer === "scissors") ||
    (user === "paper" && computer === "rock") ||
    (user === "scissors" && computer === "paper")
  ) {
      return "win";
    }
    return "lose";
  }
// Updates the game state after each round
  function updateGame(userMove, computerMove, result) {
    $("#user-move").hide().text("Your move: " + userMove).fadeIn();
    $("#computer-move").hide().text("Computer move: " + computerMove).fadeIn();

    let message = result === "win" ? "You Win the Round!" :
                  result === "lose" ? "You Lose the Round!" : "It's a Draw!";
    $("#outcome").hide().text(message).fadeIn().addClass("flash");

    if (result === "win") userScore++;
    else if (result === "lose") computerScore++;

    $("#user-score").text(userScore);
    $("#computer-score").text(computerScore);

    setTimeout(() => {
      $("#outcome").removeClass("flash");
    }, 800);

    if (userScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
      setTimeout(() => {
        $("#final-message").text(
          userScore === WINNING_SCORE ? "You won!" : "Computer wins!"
        );
        $("#final-result").fadeIn();
        $(".choice").prop("disabled", true);
      }, 600);
    }
  }

  $(".choice").click(function () {
    const userMove = $(this).data("move");
    const computerMove = getComputerMove();
    const result = compareMoves(userMove, computerMove);
    updateGame(userMove, computerMove, result);
  });

  $("#reset-btn, #final-result button").click(function () {
    userScore = 0;
    computerScore = 0;
    $("#user-score").text(userScore);
    $("#computer-score").text(computerScore);
    $("#user-move").text("Your move: ");
    $("#computer-move").text("Computer move: ");
    $("#outcome").text("");
    $(".choice").prop("disabled", false);
    $("#final-result").fadeOut();
  });
});
