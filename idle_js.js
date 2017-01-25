	var gameTimer;
	var buildings;
	var player;
	var bingoTimer = 0;
	var verNum = "v0.3";
	
	function playerInfo(){
		var money;
		var money_2;
		var money_3;
		var money_4;
		var money_5;
		var updTime;
		var gain;
		var digChnc;
		var digMlt;
		var shipMlt;
		var spdWorth;
		var spdMWorth;
		var bingoHolder = new Array();
		var bingoWait;
		this.bingoWait = 20;
		this.bingoHolder = bingoHolder;
		this.spdWorth = 0.18;
		this.spdMWorth = 0.84;
		this.shipMlt = 1.14;
		this.digChnc = 2;
		this.digMlt = 2.6;
		this.money = 10;
		this.money_2 = 0;
		this.money_3 = 0;
		this.money_4 = 0;
		this.money_5 = 0;
		this.updTime = 2000;
		this.gain = 1;
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
		player = new playerInfo();
		clearInterval(gameTimer);
		gameTimer = setInterval(gameTick, player.updTime);
		var autoSave = setInterval(save, 30000);

		buildings = [new building("Shoes", 20, 1.07, 1), new building("Spade", 200, 1.045, 2), new building("Bingo", 5000, 1.066, 10), new building("Spaceship", 7200, 1.12, 70), new building("Magic", 10000, 1.02, 50), new building("Ice Cubes", 999999, 1.1, 6), new building("Football", 12392232, 1.03, 7), new building("Garbage", 2232222832, 1.05, 8)];
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
	function buyBingo(x){
		for(var i=0; i<x; i++){
			addBingoCard();
		}
	}
	function pageRefresh(){
		showBuilding();
		document.getElementById("myMoney").innerHTML = player.money;
		document.getElementById("myMoney2").innerHTML = player.money_2;
		document.getElementById("myMoney3").innerHTML = player.money_3;
		document.getElementById("myMoney4").innerHTML = player.money_4;
		document.getElementById("myMoney5").innerHTML = player.money_5;
		document.getElementById("gainer").innerHTML = player.gain;
		document.getElementById("digChance").innerHTML = player.digChnc;
		document.getElementById("digMult").innerHTML = player.digMlt;
		document.getElementById("digVal").innerHTML = Math.round(player.digMlt*buildings[0].currGain);
		document.getElementById("bingoValue").innerHTML = calcBingoBucks();
		document.getElementById("bingoWait").innerHTML = player.bingoWait;
		buildings.forEach(function(building, index){
			index++;
			document.getElementById("owned"+index).innerHTML = building.amount;
			document.getElementById("cost"+index).innerHTML = building.cost;
		//	document.getElementById("give"+index).innerHTML = building.baseGain;
		//	document.getElementById("total"+index).innerHTML = building.currGain;
			document.getElementById("give"+index+"Txt").innerHTML = building.baseGain;
			document.getElementById("total"+index+"Txt").innerHTML = building.currGain;
			document.getElementById("ratio"+index+"Txt").innerHTML = getWorthRatio(building, index);
		});
	}
	function getWorthRatio(building, x){
		var worthRatio = 0;
		switch(x){
			case 1: if(buildings[1].amount > 0)
						worthRatio = Math.round((building.baseGain+(building.baseGain*(1+(player.digChnc/100)*(player.digMlt-1))))/building.cost*1000);
					else{
						worthRatio = Math.round((building.baseGain/building.cost)*1000);
					}
					break;
			case 2: worthRatio = Math.round((building.baseGain+(buildings[0].baseGain*(1+((player.spdWorth+player.digChnc)/100)*(player.spdMWorth+player.digMlt-1))))/building.cost*1000);break;
			case 3: worthRatio = Math.round((building.baseGain+(calcBingoBucks()/(24*player.bingoWait)))/building.cost*1000); break;
			case 4: worthRatio = Math.round((building.baseGain / building.cost)*1000); break;
			case 5: worthRatio = Math.round((building.baseGain + (building.amount*10000*(Math.random()/10)))/1000); break;
			case 6: break;
			case 7: break;
			case 8: break;
		}
		return worthRatio
	}
	function gameTick(){
		if(Math.round((Math.random()*100000))==36321){
			buildings.forEach(function(building, index){
				index++;
				document.getElementById("buy"+index).src="buildx.png";
		});
		}
		player.money = player.money+player.gain;
		
		if(buildings[1].amount >=1)
			dig();
		if(buildings[2].amount >=1){
			bingoTimer++;
			if(bingoTimer >= player.bingoWait){
				playBingo();
				bingoTimer = 0;
			}
		}
		if(buildings[4].amount >=1)
			doMagic();
			
		pageRefresh();
	}
	function doMagic(){
		var coinChance = Math.random();
		for(var i=0; i < buildings[4].amount; i++){
			if(Math.random()*1000 <= coinChance*10)
				player.money_2++;
		}
	}
	function showBuilding(){
		if(player.money > (buildings[0].baseCost*.5)){
			$('#infoBox').fadeIn("slow");
		}
		buildings.forEach(function(building, index){
			if(((player.money > (building.baseCost*.5)) || building.amount > 0)){
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
			window.setTimeout(function(){spadeBorder.style.borderColor='#000000'; spadeBorder.border="1";},400);
		}
	}
	function playBingo(){
		var bingoNum = Math.floor(Math.random()*75+1);
		player.bingoHolder.forEach(function(bingo){
			bingo.playNum(bingoNum);
			if(bingo.checkWin()){
				var givePlayerMoney = calcBingoBucks();
				player.money += givePlayerMoney;
				bingo.newCard();
				var bingoBorder = document.getElementById("buy3");	
				bingoBorder.style.borderColor='FFD700';
				bingoBorder.border="2";
				window.setTimeout(function(){bingoBorder.style.borderColor='#000000'; bingoBorder.border="1";},500);
			}
		});
	}
	function calcBingoBucks(){
		return Math.round(33*buildings[2].currGain * ((Math.pow(buildings[2].amount, 1.065) / 6) +3));
	}
	function addBingoCard(){
		player.bingoHolder.push(new bingoCard);
	}
	function bingoCard(){
		var valueSlots = new Array(25);
		var usedSlots = new Array(76);
		this.usedSlots = usedSlots;
		this.valueSlots = valueSlots;
		this.playNum = playNum;
		this.checkWin = checkWin;
		this.newCard = newCard;
		this.setCard = setCard;
		
		for(var i=0;i<25;i++){
			fillCard(i);	
		}
		
		function setCard(a1, a2){
			valueSlots = a1;
			usedSlots = a2;
			this.valueSlots = valueSlots;
			this.usedSlots = usedSlots;
		}
		
		function newCard(){
			valueSlots = new Array(25);
			usedSlots = new Array(76);
			for(var i=0;i<25;i++){
				fillCard(i);	
			}
			this.usedSlots = usedSlots;
			this.valueSlots = valueSlots;
		}
		function fillCard(i){
			var number = ((i%5)*15) + (Math.floor(Math.random()*15)+1);
			if(usedSlots[number]!=true){
				valueSlots[i] = number;
				usedSlots[number]= true;
			}
			else{
				fillCard(i);
			}
		}
		function playNum(x){
			if(usedSlots[x]==true){
				var index = valueSlots.indexOf(x);
				valueSlots[index] = "x";
				usedSlots[x] = false;
			}
		}
		function checkWin(){
			var win = false;
			var chain = true;
			if(valueSlots[0] == "x"){
				for(var i=1; i<5; i++){
					if(valueSlots[i]!="x")
						chain = false;	
				}
				if(chain)
					win=true;
				chain = true;
				for(var i=1; i<5; i++){
					if(valueSlots[i*5]!="x")
						chain = false;
				}
				if(chain)
					win=true;
				chain=true;
				for(var i=1; i<5; i++){
					if(valueSlots[i*5+i]!="x")
						chain=false;
				}
			}
			for(var j=1; j<5; j++){
				if(valueSlots[j] == "x" && !win){
					chain = true;
					for(var i=1; i<5; i++){
						if(valueSlots[(i*5)+j]!="x")
							chain = false;
					}
					if(chain)
						win=true;
					
					if(j==4){
						chain=true;
						for(var i=2; i<6; i++){
							if(valueSlots[(i*5-i)]!="x")
								chain=false;
						}
						if(chain)
							win=true;
					}	
				}
				
			}
			for(var j=0; j<4; j++){
				if(valueSlots[(j*5)+5] == "x" && !win){
					chain = true;
					for(var i=1; i<5; i++){
						if(valueSlots[((j*5)+5)+i] !="x")
							chain = false;
					}
					if(chain)
						win=true;
				}
			}
			if(win){
				return true;
			}
			return false;
		}
	}
	function save(){
		var playerJSON = JSON.stringify(player);
		localStorage.setItem('player', playerJSON);
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
		if(localStorage.getItem('versionNum')==verNum){
			resetPnB();
			if(localStorage.getItem('player'))
				var playerHolder = JSON.parse(localStorage.getItem('player'));
			loadPlayer(playerHolder);
			if(localStorage.getItem('buildings'))
				var buildingHolder = JSON.parse(localStorage.getItem('buildings'));	
			loadBuilding(buildingHolder);
			document.getElementById("alert").innerHTML = "Game has been loaded";
		}
		else{
		}
		
		saveLoadPopup();
	}
	function loadBuilding(build){
		Object.keys(build).forEach(function(buildNodes){
			buildings[buildNodes] = build[buildNodes];
		});
	}
	function loadPlayer(p2){
		Object.keys(p2).forEach(function(playerNodes){
			player[playerNodes] = p2[playerNodes];
		});
		var bHolder = new Array();
		var cHolder;
		player.bingoHolder.forEach(function(bingo){
			cHolder = new bingoCard();
			cHolder.setCard(bingo.valueSlots, bingo.usedSlots);
			bHolder.push(cHolder);
		});
		player.bingoHolder = bHolder;
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