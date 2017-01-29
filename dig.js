	function buySpade(x){
		for(var i=0; i<x; i++){
			player.digChnc = Math.round((player.digChnc + player.spdWorth)*100)/100;
			player.digMlt = Math.round((player.digMlt + player.spdMWorth)*100)/100;
		}
	}
	function dig(){
		if((Math.round(Math.random()*10000)/100) < player.digChnc){
			var critValue = Math.round(buildings[0].currGain * player.digMlt);
			player.money += critValue;
			gainer6 += critValue;
			gainer8 += critValue;
			
			var spadeBorder = document.getElementById("buy2");
			spadeBorder.style.borderColor='FFD700';
			spadeBorder.src="art/build2.1.png";
		}
	}