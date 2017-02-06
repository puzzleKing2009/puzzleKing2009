	function meltIce(){
		var cubes = player.iceHolder;
		var index = cubes.length-1;
		var currBuilding = buildings[6];
		while(index >= 0){
			cubes[index].duration--;
			if(cubes[index].duration <= 0){
				player.money_3++;
				player.money += getMeltWorth();
				gainer10 += getMeltWorth();
				gainer8 += getMeltWorth();
				cubes.splice(index,1);
				currBuilding.amount --;
				currBuilding.cost = Math.round(currBuilding.baseCost * Math.pow(currBuilding.exp, currBuilding.amount));
				player.gain -= Number(currBuilding.baseGain);
				currBuilding.currGain -= currBuilding.baseGain;
			}
			index --;
		}
	}	
	function getMeltWorth(){
		return (buildings[6].baseGain *21200 * (player.meltTime * .01));
	}
	function buyIce(x){
		for(var i=0; i<x; i++){
			player.iceHolder.push(new iceCube());
			iceBat(1);
			player.totalIce++;
		}
	}
	function iceCube(){
		var duration = player.meltTime;
		this.duration = duration;
	}
