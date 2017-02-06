	function buyBat(x){
		for(var i=0; i<x; i++){
			player.batSplodeChnc = Math.round((player.batSplodeChnc + player.batWorth)*100)/100;
		}
	}
	function iceBat(x){
		for(var i=0; i<x; i++){
			player.batSplodeChnc = Math.round((player.batSplodeChnc - player.iceSaveWorth)*100)/100;
			if(player.batSplodeChnc <= 0){
				player.batSplodeChnc = 0;
			}
		}
	}
	function batSplode(){
		var counter = 0;
		var doSplode;
		var zeroGain = false;
		var counterPic = 1;
		doSplode = false;
		
		if((Math.round(Math.random()*10000)/100) <= player.batSplodeChnc){
			doSplode = true;
		}
		if(doSplode){
			if(Math.round(Math.random()*100) < player.batFailChnc){
				zeroGain = true;
			}
		}

		if(doSplode){
			var splodeValue = Math.round(buildings[5].currGain * (1-player.batSplodeWorth));
			if(zeroGain){
				splodeValue = buildings[5].currGain;
				counterPic = 2;
			}
			player.money -= splodeValue;
			gainer1 -= splodeValue;
			
			var batBorder = document.getElementById("buy6");
			batBorder.style.borderColor='DF0000';
			batBorder.style.backgroundImage="url('art/build6."+counterPic+".png')";
		}
	}