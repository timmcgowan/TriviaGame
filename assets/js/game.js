//Define Global Vars
var endgame = false; // control end/restart
var champ; //selected
var champ_health;
var champ_attack;
var champ_img;
var champ_sel = false;
var bc_attack;
var opp; 
var opp_health;
var opp_attack; 
var bo_attack;
var opp_img;
var charType = "notselected"
var wins=0;
var looses=0;
var _battle = false;
var opp_sel = false; //opponent selected false
var debug = true; // for console debug output
var log_char = false; // console log characters
var round = 1;

// Character Stats
var character = [
    {
        "name":"The Terminator",
		"health":132,
		"attack":5,
		"img": "./assets/img/terminator-img.jpg"
	},{ 
        "name":"Gallaxhar Robot",
		"health":150,
		"attack":8,
		"img": "./assets/img/gallaxhar-img.jpg"
	},{
        "name":"The MIP",
		"health":122,
		"attack":12,
		"img": "./assets/img/mip-img.jpg"
    },{
	    "name":"Marty",
		"health":112,
		"attack":25,
		"img": "./assets/img/marty-img.jpg"
    }
];

var charString = JSON.stringify(character);
var charObj;

try {
     charObj = JSON.parse(charString); 
} catch (e) {
    charObj = character;
}

function playerArea(){
    let l = charObj.length;
    for (let index = 0; index < l; index++) {
        let _span = $("<span class='character-img' id='C"+ index +"'>");
        let _name = $("<p class='character-name'>"+ charObj[index].name + "</p>");
        let _img = $("<img onclick=\"selectPlayer(\'" + index + "\')\" src='"+ charObj[index].img + "' alt='" + charObj[index].name + "' class='character-img'>");
        let _health = $("<p class='health'>" + charObj[index].health + "</p>");
        _span.append(_name).append(_img).append(_health);
        $("#characters").append(_span);   
    }        
}

// verifying character outputs
if(log_char){
    var i;
    console.log(Object.keys(charObj));
    for (i in charObj){
        console.log("name: " + charObj[i].name);
        console.log("health: " + charObj[i].health);
        console.log("attack: " + charObj[i].attack); //base attack power
        console.log("img: " + charObj[i].img);
    }
}

function selectPlayer(id){
    if (!champ_sel){
        champ_sel = true;
        renderHtml.player(id,"champion");
        renderHtml.vs();
        champ = id;
        bc_attack = charObj[id].attack;
        champ_health = charObj[id].health;
        champ_attack = charObj[id].attack;

    } else if (!opp_sel){
        if (round > 1) {
            $("#choosetext").remove();
            if(debug){console.log("remove choose text")}
        }
        opp_sel = true;
        renderHtml.player(id,"opponent");
        renderHtml.battleButton();
        opp_health = charObj[id].health;
        opp_attack = charObj[id].attack;
        if (wins===2){
            $("#characters").remove();
        }

        opp = id;
        bo_attack = charObj[id].attack;
        
    } else {
        if(debug){console.log("Both Players already selected")}
        return
    }
    return

}

var renderHtml = {
        player: function(cid,charType){
            var hidespan = "C" + cid;
            $("#" + hidespan + "").hide();
            let _div = $("<div class='character "+ charType +"' id='" + cid + "'>");
            let _name = $("<span class='character-name'>").text(charObj[cid].name);
            let _img = $("<img class='" + charType +"-img'>").attr("src", charObj[cid].img);
            let _health = $("<p class='health' id='" +  charType + "-health'>").text(charObj[cid].health);
            _div.append(_name).append(_img).append(_health);
            $("#gamearea").append(_div);
        },
        //Choose a Champion
        challengers: function(){
            let l = charObj.length;
            for (let index = 0; index < l; index++) {
                renderHtml.player(index, "contestant", "challenge_area");
            }            
        },
        battleButton: function (){
            let _bbutton = $('<button/>', {
                text: "Attack",
                id: 'attack_button',
                click: function () { battle(champ,opp); }
            });
            //_bbutton.addClass('atttack_button')
            $("#vs").append(_bbutton);
        },
        vs: function(){
            let _vdiv = $("<div id='vs'>");
            let _vsp = $("<span class='emoji'>").text("🆚");
            _vdiv.append(_vsp);
            $("#gamearea").append(_vdiv);
        }
}
    function resetGame() {
// easy reset
location.reload(); 
    }
//Attack (calculations)
//Opponent Health & Attack
function battle(_champ,_opp){
   // renderHtml.player(_champ,"champion")
    //update competitor stats
    if  (!champ_sel && !opp_sel){
        return false;
    } else {
        if (!_battle){
            if(round==1){
                if(debug){console.log("cid: " + _champ)}
//                champ_health = charObj[_champ].health;
                //base attack power
            }
            if(debug){console.log("Champion health: " + champ_health + " Attack Power: " + champ_attack)}
            //Choose an Opponent 
            if(debug){console.log("oid: " + _opp)}
            opp_sel = true;
            if(debug){console.log("Opponent Health: " + opp_health + " Opponent Attack :" + opp_attack)}
            _battle = true;
        }
    
    // Battle Calculations

    // Champion's Move
    opp_health = opp_health - champ_attack; //Champion Base Attack on Oppent Health
    $("#opponent-health").text(opp_health);

    if (opp_health > 0){
        champ_attack = champ_attack + bc_attack;
        //champ_attack = champ_attack + charObj[_champ].attack; // Increase base attack
        if(debug){console.log("_champ attack : " + champ_attack );}
    } 

    // Opponent Move
    if(debug){console.log("_opp health : " + opp_health );}
    if (opp_health <= 0){
        //opponent loses
        wins++;
        console.log("You win!," + wins + " Your oppenent lost.");
        $("#" + _opp).remove();
        $("#attack_button").remove();
        if (wins === 1){
            let _choosediv = $("<div class='character' id='choosetext'>");
            let choosetext = $("<span style='color:white'>").text("Choose another opponent!");
            _choosediv.append(choosetext);
            $("#gamearea").append(_choosediv);
        }else if (wins === 2){
            console.log(wins);
            let _choosediv = $("<div class='character' id='choosetext'>");
            let choosetext = $("<span id='choosetext' style='color:white'>").text("Choose your final opponent!");
            _choosediv.append(choosetext);
            $("#gamearea").append(_choosediv);
        }else{
            console.log(wins);
            let _choosediv = $("<div class='character' id='choosetext'>");
            let choosetext = $("<span id='choosetext' style='color:white'>").text("Game Over, You win!");
            let restartbutton = $('<button/>', {
                text: "Restart",
                id: 'restart',
                click: function () {resetGame();}
            });
            console.log("Restart");
            _choosediv.append(choosetext).append(restartbutton);
            $("#gamearea").append(_choosediv);

           // $("#gamearea").append(restartbutton);
        }
        opp_sel = false;
        round++;
    } else {
        round++;
        endgame = true;
        if (champ_health > 0){
            champ_health = champ_health - opp_attack;    //decrease health by opponent attack
            if (champ_health <= 0){
                    $("#" + _champ).remove();
                    let _choosediv = $("<div class='character' id='choosetext'>");
                    let choosetext = $("<span id='choosetext' style='color:white'>").text("Game Over, You Loose!");
                    let restartbutton = $('<button/>', {
                        text: "Restart",
                        id: 'restart',
                        click: function () {resetGame();}
                    });
                    console.log("Restart");
                    _choosediv.append(choosetext).append(restartbutton);
                    $("#gamearea").prepend(_choosediv);
                }else{
                    $("#champion-health").text(champ_health);
                }    
        }
    }
    if(debug){console.log("New Health: " + champ_health + " New Attack: " + champ_attack)}  

}
//Score Card?
 
}
