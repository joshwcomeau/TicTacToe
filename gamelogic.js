var fadeInObject = {
    "display": "block",
    "-webkit-animation": "fadeIn 1s", /* Safari and Chrome */
       "-moz-animation": "fadeIn 1s", /* Firefox */
        "-ms-animation": "fadeIn 1s", /* Internet Explorer */
         "-o-animation": "fadeIn 1s", /* Opera */
            "animation": "fadeIn 1s",
    "-webkit-animation-fill-mode": "forwards", 
    "-moz-animation-fill-mode": "forwards",
    "animation-fill-mode": "forwards"
};
var fadeInPartObject = {
    "-webkit-animation": "fadeInPart 4s", /* Safari and Chrome */
       "-moz-animation": "fadeInPart 4s", /* Firefox */
        "-ms-animation": "fadeInPart 4s", /* Internet Explorer */
         "-o-animation": "fadeInPart 4s", /* Opera */
            "animation": "fadeInPart 4s",
    "-webkit-animation-fill-mode": "forwards", 
    "-moz-animation-fill-mode": "forwards",
    "animation-fill-mode": "forwards"
};

function stripeItUp() {
  $("body").append("<canvas id='bgCanvas'></canvas>");
  var bgCanvas = document.getElementById('bgCanvas');
  patternInit();  
}

function adjustBoard() {
  var gbWidth = $("#gameboard").width();
  $("#gameboard").css('height', gbWidth+'px');

  var cellHeight = $(".gamecell").width(),
      fontSize = cellHeight * 0.85;

  $(".gamecell").css({
    "font-size"   : fontSize+"px",
    "line-height" : cellHeight+"px"
  });
}

function checkWin(row, col) {  
  
  if (                // Check for column win
    $("#cell1-" + col).html() == $("#cell2-" + col).html() && 
    $("#cell2-" + col).html() == $("#cell3-" + col).html() &&
    $("#cell1-" + col).html().length > 0 
  ) {

    return 'column';

  } else if (         // Check for row win
    $("#cell" + row + "-1").html() == $("#cell" + row + "-2").html() && 
    $("#cell" + row + "-2").html() == $("#cell" + row + "-3").html() &&
    $("#cell" + row + "-1").html().length > 0 
  ){

    return 'row';

  } else if (         // Check top-left-to-bottom-right diagonal
    $("#cell1-1").html() == $("#cell2-2").html() && 
    $("#cell2-2").html() == $("#cell3-3").html() && 
    $("#cell1-1").html().length > 0 
  ){

    return 'tldiag';

  } else if (         // Check top-right-to-bottom-left diagonal
    $("#cell1-3").html() == $("#cell2-2").html() && 
    $("#cell2-2").html() == $("#cell3-1").html() &&
    $("#cell1-3").html().length > 0 
  ){

    return 'trdiag';

  } else {

  }

}

function gridStrike(direction, row, col) {
  var winStyle = { backgroundColor: "#789023", color: "#EDFFAD", "z-index": 35, textShadow: "1px 1px 3px #526904" },
      winStyleDiag = { color: "#EDFFAD", "z-index": 35, textShadow: "1px 1px 3px #526904", display: "block" };


  if ( direction == 'column' ) {
    $("#cell1-" + col + ", #cell2-" + col + ", #cell3-" + col).children().css(winStyle).animate({
      height: "130%",
      marginTop: "-15%",
      paddingTop: "15%"
    }, 500);
  } else if ( direction == 'row' ) {
    $("#cell" + row + "-1, #cell" + row + "-2, #cell" + row + "-3").children().css(winStyle).animate({
      width: "130%",
      marginLeft: "-15%"
    }, 500);
  } else if ( direction == 'tldiag') {
    $("#cell1-1, #cell2-2, #cell3-3").children().css(winStyleDiag);
    $("#winLineTL").slideDown(500);
  } else if ( direction == 'trdiag') {
    $("#cell1-3, #cell2-2, #cell3-1").children().css(winStyleDiag);
    $("#winLineTR").slideDown(500);
  }
}

function updateMoveList(row, col, player) {
  $("#instructions > ul").append("<li id='moveList" + row + col + "'>" + player + " marks spot [" + row + ", " + col + "].");
  $("#moveList"+row+col).slideDown(500);
}

function updateWinPage(moves) {
  $("#moveCount").html(moves);
  $("#winBackground").fadeIn(500, function() {
    $("#winText").animate({
      top: "15%"
    }, 1000, function() {
      showNewGameButton();
      // $("#winLetter").html(winner).css(fadeInPartObject);
    });
  });
}

function updateLosePage() {
  $("#loseBackground").fadeIn(500, function() {
    $("#loseText").animate({
      top: "15%"
    }, 1000, function() {
      showNewGameButton();
    });
  });
}

function updateTiePage() {
  $("#tieBackground").fadeIn(500, function() {
    $("#tieText").animate({
      top: "15%"
    }, 1000, function() {
      showNewGameButton();
    });
    
  });
}



function showNewGameButton() {
  $(".newGameButton").css(fadeInObject);
}

function markCell(cell, mark) {
  // Put an O in that cell
  $("#"+cell).html("<span class='" + mark + "'>" + mark + "</span>").css("cursor","default");
}

function buildMatrix() {
  var row, col, contents, fieldrow;
  var field = [];
  for ( row=1; row<=3; row++ ) {
    fieldrow = []
    for ( col=1; col<=3; col++ ) {
      contents = $("#cell" + row + "-" + col).html();
      if ( contents == '<span class="X">X</span>' ) {
        fieldrow.push("X");
      } else if ( contents == '<span class="O">O</span>' ) {
        fieldrow.push("O");
      } else {
        fieldrow.push("");
      }
    }
    field.push(fieldrow);
  }
  return field;
}

function findEmpty(field) {
  var row, col, contents;
  var emptyList = [];


  for ( row=1; row<=3; row++ ) {
    for ( col=1; col<=3; col++ ) {
      if ( field[row-1][col-1] == '' ) {
        emptyList.push( "cell"+row+"-"+col );
      }
    }
  }

  return emptyList;
}

function findEmptyCorner(field) {
  var row, col, contents;
  var emptyList = [];



  for ( row=0; row<=1; row++ ) {
    for ( col=0; col<=1; col++ ) {
      if ( field[row*2][col*2] == '' ) {
        emptyList.push( "cell"+(row*2+1)+"-"+(col*2+1) );
      }
    }
  }

  return emptyList;

}

function countInArray(array, what) {
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] === what) {
            count++;
        }
    }
    return count;
}

function computerPick(moves) {

  field = buildMatrix();
  empty_field = findEmpty(field);

  var emptyCell,
      debug = false,
      rowCounter = 1;

  var tlDiagArray = [ field[0][0], field[1][1], field[2][2] ],
      trDiagArray = [ field[0][2], field[1][1], field[2][0] ];

  // FIRST TURN: Always select a corner
  if ( moves == 2 ) {
    // Check if any corners are occupied.
    emptyCorners = findEmptyCorner(field);
    var randIndex = Math.floor(Math.random() * emptyCorners.length);
    return emptyCorners[randIndex];
  }

  // OFFENSIVE CHECKS FIRST. See if we can win this round!
  for ( var row in field ) {

    // ROW - Offense
    if ( countInArray(field[row], "O") == 2 && countInArray(field[row], "") == 1 ) {
      if (debug) { console.log("Offense, row") }
      return "cell"+rowCounter+"-"+(field[row].indexOf("")+1);
    }
    // COL - Offense 
    var columnArray = [field[0][rowCounter-1], field[1][rowCounter-1], field[2][rowCounter-1]];
    if ( countInArray(columnArray, "O") == 2 && countInArray(columnArray, "") == 1 ) {
      if (debug) { console.log("Offense, col") }
      return "cell"+(columnArray.indexOf("")+1)+"-"+rowCounter;
    } 
    rowCounter++;
  }

  // DIAGONALS - Offense

  if ( countInArray(tlDiagArray, "O") == 2 && countInArray(tlDiagArray, "") == 1 ) {
    if (debug) { console.log("Offense, TL-diag") }
    return "cell"+(tlDiagArray.indexOf("")+1)+"-"+(tlDiagArray.indexOf("")+1);
  } 
  if ( countInArray(trDiagArray, "O") == 2 && countInArray(trDiagArray, "") == 1 ) {
    if (debug) { console.log("Offense, TR-diag") }
    return "cell"+(trDiagArray.indexOf("")+1)+"-"+(3-trDiagArray.indexOf(""));
  }

  // DEFENSE CHECKS. Make sure the human isn't about to win!

  // Reset row-counter, restart loop for defense.
  rowCounter = 1;
  for ( row in field ) {
    // ROW - Defense
    if ( countInArray(field[row], "X") == 2 && countInArray(field[row], "") == 1 ) {
      if (debug) { console.log("Defense, row") }
      return "cell"+rowCounter+"-"+(field[row].indexOf("")+1);
    }

    // COL - Defense
    var columnArray = [field[0][rowCounter-1], field[1][rowCounter-1], field[2][rowCounter-1]];
    if ( countInArray(columnArray, "X") == 2 && countInArray(columnArray, "") == 1 ) {
      if (debug) { console.log("Defense, col") }
      return "cell"+(columnArray.indexOf("")+1)+"-"+rowCounter;
    }
    rowCounter++;
  }


  // Check diagonals
  if ( countInArray(tlDiagArray, "X") == 2 && countInArray(tlDiagArray, "") == 1 ) {
    if (debug) { console.log("Defense, TL-diag") }
    return "cell"+(tlDiagArray.indexOf("")+1)+"-"+(tlDiagArray.indexOf("")+1);
  }

  if ( countInArray(trDiagArray, "X") == 2 && countInArray(trDiagArray, "") == 1 ) {
    if (debug) { console.log("Defense, TR-diag") }
    return "cell"+(trDiagArray.indexOf("")+1)+"-"+(3-trDiagArray.indexOf(""));
  }


  // Check for lines with 1 'o' and 2 empty spaces, starting with diagonals. Fill one.
  if ( countInArray(tlDiagArray, "O") == 1 && countInArray(tlDiagArray, "") == 2 ) {
    if (debug) { console.log("Strategy, TL-diag") }
    return "cell"+(tlDiagArray.indexOf("")+1)+"-"+(tlDiagArray.indexOf("")+1);
  }

  if ( countInArray(trDiagArray, "O") == 1 && countInArray(trDiagArray, "") == 2 ) {
    if (debug) { console.log("Strategy, TR-diag") }
    return "cell"+(trDiagArray.indexOf("")+1)+"-"+(3-trDiagArray.indexOf(""));
  }

  rowCounter = 1;
  for ( var row in field ) {
    // ROW - Strategic
    if ( countInArray(field[row], "O") == 1 && countInArray(field[row], "") == 2 ) {
      if (debug) { console.log("Strategy, row") }
      return "cell"+rowCounter+"-"+(field[row].indexOf("")+1);
    }
    // COL - Strategic 
    var columnArray = [field[0][rowCounter-1], field[1][rowCounter-1], field[2][rowCounter-1]];
    if ( countInArray(columnArray, "O") == 1 && countInArray(columnArray, "") == 2 ) {
      if (debug) { console.log("Strategy, col") }
      return "cell"+(columnArray.indexOf("")+1)+"-"+rowCounter;
    } 
    rowCounter++;
  }



  // If all else fails, pick randomly
  var randIndex = Math.floor(Math.random() * empty_field.length);
  return empty_field[randIndex];


}

function pseudoComputerThinkTime() {
  return Math.floor(Math.random() * 1000 + 100);
}

function playTurn(player, cell, moveCounter) {
  // Get row/column values
  var row = cell.substr(4,1),
      col = cell.substr(6,1);

  updateMoveList(row, col, player);

  // Check for win
  winCheck = checkWin(row, col);

  if ( winCheck ) {
    gridStrike(winCheck, row, col);
    if ( player == 'Human') {
      updateWinPage(moveCounter);
    } else {
      updateLosePage();
    }
    $(".gamecell").css({"cursor": "default"}).unbind("click");
    return true;
  } else if ( moveCounter == 9) {
    updateTiePage();  
    return true;
  } else {
    return false;
  }
}


$(document).ready(function() {

  var playerTurn = true,
      moveCounter = 1;

  // Load background stripes
  stripeItUp();

  // Adjust CSS for game board depending on window size
  adjustBoard();


  // Bind click event to game board cells.
  $(".gamecell").click(function() {
    if ( $(this).text().length === 0 && playerTurn) {

      $("#instructions").fadeIn(200); // Show the instruction-holding UL on the first turn.

      

      // Get cell ID
      cellID = $(this).attr("id");
      
      // Add the X to the board
      markCell(cellID, "X");

      var gameOver = playTurn("Human", cellID, moveCounter);

      if ( !gameOver ) {
        moveCounter++;

        //////// COMPUTER TURN ////////////
        
        playerTurn = false;

        chosenCell = computerPick(moveCounter);


        setTimeout( function() {
          // After the computer has a faked moment to think, mark the 'O'.
          markCell(chosenCell, "O");
          playTurn("Computer", chosenCell, moveCounter);

          playerTurn = true;
          moveCounter++;  


        }, pseudoComputerThinkTime() );


      }






    }
  });



});



