	function buySpade(x){
		for(var i=0; i<x; i++){
			player.digChnc = Math.round((player.digChnc + player.spdWorth)*100)/100;
			player.digMlt = Math.round((player.digMlt + player.spdMWorth)*100)/100;
		}
	}
	function dig(){
		var critAgain = true;
		var counter = 1;
		var counterPic = 1;
		while(critAgain){
			if((Math.round(Math.random()*10000)/100) <= Math.round((player.digChnc / (1+(.28*counter))))){
				var critValue = Math.round(buildings[0].currGain * player.digMlt);
				player.money += critValue;
				gainer6 += critValue;
				gainer8 += critValue;
				
				var spadeBorder = document.getElementById("buy2");
				switch(counterPic){
					case 1: spadeBorder.style.borderColor='FFD700';break;
					case 2: spadeBorder.style.borderColor='C3C3C3';break;
					case 3: spadeBorder.style.borderColor='00A2E8';break;
					case 4: spadeBorder.style.borderColor='A349A4';break;
					case 5: spadeBorder.style.borderColor='A349A4';break;
				}
				spadeBorder.style.backgroundImage="url('art/build2."+counterPic+".png')";
				counter++
				if(counterPic < 5){
					counterPic++;
				}
			}
			else{
				critAgain = false;
			}
		}
	}