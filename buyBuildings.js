	function cycleBuy(){
		switch(buyAmount){
			case 1: buyAmount = 2; document.getElementById("buyAmount").innerHTML = "10"; break;
			case 2: buyAmount = 3; document.getElementById("buyAmount").innerHTML = "Max"; break;
			case 3: buyAmount = 1; document.getElementById("buyAmount").innerHTML = "1"; break;
		}
	}
	function pickBuy(x){
		switch(buyAmount){
			case 1: buy(x); break;
			case 2: buyTen(x); break;
			case 3: buyMax(x); break;
		}
	}
	function buyTen(x){
		for(var y = 0; y < 10; y++){
			buy(x);
		}
	}
	function buyMax(x){
		while(player.money >= buildings[x-1].cost){
			buy(x);
		}
	}
	function buy(x){
		var buyInQuest = document.getElementById("buy"+x);
		var currBuilding = buildings[x-1];
		
		if(currBuilding.cost <= player.money){
			player.money = player.money - currBuilding.cost;
			currBuilding.amount++;
			currBuilding.cost = Math.round(currBuilding.baseCost * Math.pow(currBuilding.exp,currBuilding.amount));
			buyInQuest.border="2";
			window.setTimeout(function(){buyInQuest.border="1";},100);
			currBuilding.currGain += currBuilding.baseGain
			if(currBuilding.name=="Spade")
				buySpade(1);
			if(currBuilding.name=="Bingo")
				buyBingo(1);
			if(currBuilding.name=="Ice Cubes")
				buyIce(1);
			player.gain += Number(currBuilding.baseGain);
			if(currBuilding.name=="Spaceship"){
				currBuilding.baseGain = Math.round(currBuilding.baseGain * player.shipMlt);
				}
			pageRefresh();
		}	
	}