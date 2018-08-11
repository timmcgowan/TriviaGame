// Establish the global variables
var endgame = 0; // gameover ?

// Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.
var health;
var attack;
var counter_attack;

// Each time the player attacks, their character's Attack Power increases by its base Attack Power.
  // For example, if the base Attack Power is 6, each attack will increase the Attack Power by 6 (12, 18, 24, 30 and so on)
var player_attack;

//The enemy character only has `Counter Attack Power`.
//Unlike the player's `Attack Points`, `Counter Attack Power` never changes.
var cap;

// A winning player must pick their characters wisely by first fighting an enemy with low `Counter Attack Power`. This will allow them to grind `Attack Power` and to take on enemies before they lose all of their `Health Points`. Healing options would mess with this dynamic.

// Your players should be able to win and lose the game no matter what character they choose. The challenge should come from picking the right enemies, not choosing the strongest player.
function checkWin(){
    console.log ("yes or no")
    if (correctTries.indexOf('_') === -1) {
        document.getElementById("jtron-text4").innerHTML = "You have Won!";
        document.getElementById("jtron-text5").innerHTML = "&nbsp;";
        endgame = 1;
      //  alert('You Won!');
    } else if (tries < 4 && tries != 0) {
        document.getElementById("jtron-text4").innerHTML = "You have " + tries + " tries left!"  ;
        document.getElementById("jtron-text5").innerHTML = "onsider this hint: <b><u>" + gdesc + "</u></b>";
      //alert('You Lost!');
    } else if (tries === 0) {
        document.getElementById("jtron-text4").innerHTML = "You have Lost!";
        document.getElementById("jtron-text5").innerHTML = "&nbsp;";
        endgame = 1;
      //alert('You Lost!');
    }
  }

//funcition check
function evalword(_word){
    let n = _word.length;
    return n;
}

      function playgame(ws) {
           
              document.onkeyup = function (event) {
                var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
                // Add check for valid chars first.  Can be improved.
                if (valid_chars.includes(letterGuessed)){
                  if (endgame === 0) {
                    updateGuesses(letterGuessed);
                    checkWin();
                  }
                }
              };
        }