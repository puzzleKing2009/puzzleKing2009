	function doMagic(){
		var coinChance = Math.random();
		for(var i=0; i < buildings[4].amount; i++){
			if(Math.random()*1000 <= coinChance*10)
				player.money_2++;
		}
	}