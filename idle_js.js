	var gameTimer;
	var buildings;
	var player;
	var verNum = "v0.2";
	
	function playerInfo(money, updTime, gain){
		var money;
		var updTime;
		var gain;
		var digChnc;
		var digMlt;
		var shipMlt;
		var spdWorth;
		var spdMWorth;
		this.spdWorth = 0.13;
		this.spdMWorth = 0.11;
		this.shipMlt = 1.12;
		this.digChnc = 0;
		this.digMlt = 1.5;
		this.money = money;
		this.updTime = updTime;
		this.gain = gain;
	}
	
	function building(name, cost, exp, gain){
		var name;
		var cost;
		var exp;
		var amount;
		var baseCost;
		var baseGain;
		var currGain;
		this.name = name;
		this.baseCost = cost;
		this.cost = cost;
		this.exp = exp;
		this.amount = 0;
		this.baseGain = gain;
		this.currGain = this.baseGain * this.amount;
	}
	
	function pageInit(){
		$('#alert').fadeOut(0)
		
		resetPnB();
		buildings.forEach(function(building, index){
			index++;
			document.getElementById("name"+index).innerHTML = building.name;
			document.getElementById("owned"+index).innerHTML = building.amount;
			document.getElementById("cost"+index).innerHTML = building.cost;
		});
		load();
	}
	function resetPnB(){
		player = new playerInfo(0, 1000, 1);
		clearInterval(gameTimer);
		gameTimer = setInterval(gameTick, player.updTime);
		var autoSave = setInterval(save, 60000);

		buildings = [new building("Shoes", 20, 1.07, 1), new building("Spade", 200, 1.045, 3), new building("Bingo", 5000, 1.08, 3), new building("Spaceship", 6800, 1.19, 70), new building("Magic", 10000, 1.02, 50), new building("Ice Cubes", 999999, 1.1, 6), new building("Football", 12392232, 1.03, 7), new building("Garbage", 2232222832, 1.05, 8)];
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
			player.gain += Number(currBuilding.baseGain);
			if(currBuilding.name=="Spaceship")
				currBuilding.baseGain = Math.round(currBuilding.baseGain * player.shipMlt);
			pageRefresh();
		}	
	}
	function buySpade(x){
		for(var i=0; i<x; i++){
			player.digChnc = Math.round((player.digChnc + player.spdWorth)*100)/100;
			player.digMlt = Math.round((player.digMlt + player.spdMWorth)*100)/100;
		}
	}
	function pageRefresh(){
		document.getElementById("myMoney").innerHTML = player.money;
		document.getElementById("gainer").innerHTML = player.gain;
		document.getElementById("digChance").innerHTML = player.digChnc;
		document.getElementById("digMult").innerHTML = player.digMlt;
		document.getElementById("digVal").innerHTML = Math.round(player.digMlt*buildings[0].currGain);
		buildings.forEach(function(building, index){
			index++;
			document.getElementById("owned"+index).innerHTML = building.amount;
			document.getElementById("cost"+index).innerHTML = building.cost;
		//	document.getElementById("give"+index).innerHTML = building.baseGain;
		//	document.getElementById("total"+index).innerHTML = building.currGain;
		//	document.getElementById("give"+index+"Txt").innerHTML = building.baseGain;
		//	document.getElementById("total"+index+"Txt").innerHTML = building.currGain;
		//	document.getElementById("ratio"+index+"Txt").innerHTML = Math.round((building.baseGain / building.cost)*100)/100;
		});
	}
	function gameTick(){
		if(Math.round((Math.random()*10000))==3621){
			buildings.forEach(function(building, index){
				index++;
				document.getElementById("buy"+index).src="buildx.png";
		});
		}
		player.money = player.money+player.gain;
		document.getElementById("myMoney").innerHTML = player.money;
		
		showBuilding();
		dig();
		playBingo();
	}
	function showBuilding(){
		if(player.money > buildings[0].baseCost){
	//		$('#infoBox').fadeIn("slow");
		}
		buildings.forEach(function(building, index){
			if(player.money > buildings[index].baseCost){
				$('#building'+index).fadeIn("slow");
				$('#info'+index).fadeIn("slow");
			}
		});
		
	}
	function dig(){
		if((Math.round(Math.random()*10000)/100) < player.digChnc){
			var critValue = Math.round(buildings[0].currGain * player.digMlt);
			player.money += critValue;
			
			var spadeBorder = document.getElementById("buy2");
			spadeBorder.style.borderColor='FFD700';
			spadeBorder.border="2";
			window.setTimeout(function(){spadeBorder.style.borderColor='#000000'; spadeBorder.border="1";},200);
		}
	}
	function playBingo(){
	}
	function save(){
		localStorage.setItem('playerMoney', player.money);
		var buildJSON = JSON.stringify(buildings);
		localStorage.setItem('buildings',buildJSON);
		localStorage.setItem('versionNum',verNum);
		document.getElementById("alert").innerHTML = "Game has been saved";
		saveLoadPopup();
	}
	function saveLoadPopup(){

		$('#alert').fadeIn('fast')
		$('#alert').fadeOut('fast')
		pageRefresh();
	}
	function load(){
		if(localStorage.getItem('versionNum')){
			resetPnB();
			if(localStorage.getItem('playerInfo'))
				player.money = Number(localStorage.getItem('playerMoney'));
			if(localStorage.getItem('buildings'))
				var buildingHolder = JSON.parse(localStorage.getItem('buildings'));	
			buildingHolder.forEach(function(buildingHold, index){
			var buildHold = buildings[index];
				buildHold.amount = buildingHold.amount;
				if(buildHold.name == "Spaceship"){
					for(var i=0; i< buildHold.amount; i++){
						buildHold.currGain += buildHold.baseGain;
						buildHold.baseGain = Math.round(buildHold.baseGain * player.shipMlt)
						}
				}
				else{
					buildHold.currGain = buildHold.baseGain * buildHold.amount;
				}
				if(buildHold.name=="Spade")
					buySpade(buildHold.amount);
				buildHold.cost = Math.round(buildHold.baseCost * Math.pow(buildHold.exp,buildHold.amount));
				player.gain += buildHold.currGain;
			});
			document.getElementById("alert").innerHTML = "Game has been loaded";
		}
		else{
		}
		
		saveLoadPopup();
	}
	$('.toggle').click(function(){
		$(this).toggleClass("grey");
		var content = $(this).next();
		$(content).toggle();
	});
	function reset(){
		localStorage.removeItem('versionNum');
		location.reload();
		
	}
	/* old code
	<span class="give">Gives: $<span id="give3"></span></span><span class="giveTotal">Total: $<span id="total3"></span></span>
	*/