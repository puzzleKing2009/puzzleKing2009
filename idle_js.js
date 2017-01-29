	var gameTimer;
	var buildings;
	var player;
	var bingoTimer = 0;
	var verNum = "v0.3";
	var buyAmount = 1;
	
	var gainer1 = 0;
	var gainer2 = 0;
	var gainer3 = 0;
	var gainer4 = 0;
	var gainer5 = 0;
	var gainer6 = 0;
	var gainer7 = 0;
	var gainer8 = 0;
	
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
		var iceHolder = new Array();
		var bingoWait;
		var meltTime;
		
		this.meltTime = 120;
		this.iceHolder = iceHolder;
		this.bingoHolder = bingoHolder;
		this.bingoWait = 15;
		this.spdWorth = 0.18;
		this.spdMWorth = 0.84;
		this.shipMlt = 1.092;
		this.digChnc = 2;
		this.digMlt = 2.6;
		this.money = 109999999;
		this.money_2 = 0;
		this.money_3 = 0;
		this.money_4 = 0;
		this.money_5 = 0;
		this.updTime = 2000;
		this.gain = 0;
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

		buildings = [new building("Shoes", 20, 1.078, 1), new building("Spade", 200, 1.05, 2), new building("Bingo", 3000, 1.06, 17), new building("Spaceship", 7000, 1.15, 60), new building("Magic", 40000, 1.033, 80), new building("Ice Cubes", 999999, 1.1, 6), new building("Football", 12392232, 1.03, 7), new building("Garbage", 2232222832, 1.05, 8)];
	}
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
	function buyIce(x){
		for(var i=0; i<x; i++){
		alert("pushed");
			player.iceHolder.push(new iceCube());
			alert(player.iceHolder[0]);
		}
	}
	function iceCube(){
		var duration = player.meltTime;
		this.duration = duration;
	}
	function pageRefresh(){
		showBuilding();
		document.getElementById("myMoney").innerHTML = player.money.formatMoney();
		document.getElementById("myMoney2").innerHTML = player.money_2.formatMoney();
		document.getElementById("myMoney3").innerHTML = player.money_3.formatMoney();
		document.getElementById("myMoney4").innerHTML = player.money_4.formatMoney();
		document.getElementById("myMoney5").innerHTML = player.money_5.formatMoney();
		document.getElementById("gainer").innerHTML = player.gain.formatMoney();
		document.getElementById("digChance").innerHTML = player.digChnc;
		document.getElementById("digMult").innerHTML = player.digMlt;
		document.getElementById("digVal").innerHTML = Math.round(player.digMlt*buildings[0].currGain).formatMoney();
		document.getElementById("bingoValue").innerHTML = calcBingoBucks().formatMoney();
		document.getElementById("bingoWait").innerHTML = player.bingoWait;
		document.getElementById("gainer1").innerHTML = (gainer1/gainer8*100).formatMoney(2);
		document.getElementById("gainer2").innerHTML = (gainer2/gainer8*100).formatMoney(2);
		document.getElementById("gainer3").innerHTML = (gainer3/gainer8*100).formatMoney(2);
		document.getElementById("gainer4").innerHTML = (gainer4/gainer8*100).formatMoney(2);
		document.getElementById("gainer5").innerHTML = (gainer5/gainer8*100).formatMoney(2);
		document.getElementById("gainer6").innerHTML = (gainer6/gainer8*100).formatMoney(2);
		document.getElementById("gainer7").innerHTML = (gainer7/gainer8*100).formatMoney(2);
		document.getElementById("gainer8").innerHTML = gainer8.formatMoney();
		
		buildings.forEach(function(building, index){
			index++;
			document.getElementById("owned"+index).innerHTML = building.amount;
			document.getElementById("cost"+index).innerHTML = building.cost.formatMoney();
		//	document.getElementById("give"+index).innerHTML = building.baseGain;
		//	document.getElementById("total"+index).innerHTML = building.currGain;
			document.getElementById("give"+index+"Txt").innerHTML = building.baseGain.formatMoney();
			if(index==4)
				document.getElementById("give"+index+"currTxt").innerHTML = Math.round(building.baseGain/player.shipMlt).formatMoney();
			document.getElementById("total"+index+"Txt").innerHTML = building.currGain.formatMoney();
			document.getElementById("ratio"+index+"Txt").innerHTML = getWorthRatio(building, index);
		});
	}
	function getWorthRatio(building, x){
		var worthRatio = 0;
		switch(x){
			case 1: if(buildings[1].amount > 0){
						worthRatio = Math.round((building.baseGain+(building.baseGain*(1+(player.digChnc/100)*(player.digMlt-1))))/building.cost*1000);
					}else{
						worthRatio = Math.round((building.baseGain/building.cost)*1000);
					}
					break;
			case 2: worthRatio = Math.round((building.baseGain+(buildings[0].baseGain*(1+((player.spdWorth+player.digChnc)/100)*(player.spdMWorth+player.digMlt-1))))/building.cost*1000);break;
			case 3: worthRatio = Math.round((building.baseGain+((calcBingoBucks()/(30*player.bingoWait))))/building.cost*1000); break;
			case 4: worthRatio = Math.round((building.baseGain / building.cost)*1000); break;
			case 5: worthRatio = Math.round((building.baseGain + (building.amount*1000*(Math.random()/10)))/1000); break;
			case 6: break;
			case 7: break;
			case 8: break;
		}
		return worthRatio
	}
	function gameTick(){
		resetBuildingIcon();
		if(Math.round((Math.random()*100000))==36321){
			buildings.forEach(function(building, index){
				index++;
				document.getElementById("buy"+index).src="buildx.png";
			});
		}
		player.money = player.money+player.gain;
		gainer8 += player.gain;
		gainer1 += buildings[0].currGain;
		gainer2 += buildings[1].currGain;
		gainer3 += buildings[2].currGain;
		gainer4 += buildings[3].currGain;
		gainer5 += buildings[4].currGain;
		
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
		if(buildings[5].amount >=1)
			meltIce();
		pageRefresh();
	}
	function meltIce(){
		var cubes = player.iceHolder;
		alert(cubes);
		alert(cubes[0].duration);
		var index = cubes.length-1;
		while(index >= 0){
			alert(cubes[index].duration);
			cubes[index].duration--;
			if(cubes[index].duration <= 0){
				player.money_3++;
				player.money += buildings[4].basegain * 10000;
				cubes.splice(index,1);
			}
		}
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
		var showAll = false;
		for(var x = buildings.length; x>0; x--){
			if(((player.money > (buildings[x-1].baseCost*.5)) || buildings[x-1].amount > 0 || showAll)){
				$('#building'+(x-1)).fadeIn("slow");
				$('#info'+(x-1)).fadeIn("slow");
				showAll = true;
			}
		}
	}
	function resetBuildingIcon(){
		buildings.forEach(function(building, index){
			index++;
			document.getElementById("buy"+index).src="build"+index+".png";
			document.getElementById("buy"+index).style.borderColor="#000000";
		});
	}
	function dig(){
		if((Math.round(Math.random()*10000)/100) < player.digChnc){
			var critValue = Math.round(buildings[0].currGain * player.digMlt);
			player.money += critValue;
			gainer6 += critValue;
			gainer8 += critValue;
			
			var spadeBorder = document.getElementById("buy2");
			spadeBorder.style.borderColor='FFD700';
			spadeBorder.src="build2.1.png";
		}
	}
	function playBingo(){
		var bingoNum = Math.floor(Math.random()*75+1);
		player.bingoHolder.forEach(function(bingo){
			bingo.playNum(bingoNum);
			if(bingo.checkWin()){
				var givePlayerMoney = calcBingoBucks();
				player.money += givePlayerMoney;
				gainer7 += givePlayerMoney;
				gainer8 += givePlayerMoney;
				bingo.newCard();
				var bingoBorder = document.getElementById("buy3");	
				bingoBorder.style.borderColor='FFD700';
				bingoBorder.src="build3.1.png";
			}
		});
	}
	function calcBingoBucks(){
		return Math.round(2*buildings[2].currGain * ((Math.pow(buildings[2].amount, 1.025) / 4) +2));
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
		build.forEach(function(building, index){
			buildings[index].amount = building.amount;
			if(buildings[index].name == "Spaceship"){
				for(var x=1; x < buildings[index].amount; x++){
					buildings[index].currGain += buildings[index].baseGain;
					buildings[index].baseGain = Math.round(buildings[index].baseGain * player.shipMlt);
				}
			}
			else{
				buildings[index].currGain = buildings[index].baseGain * buildings[index].amount;
			}
			if(buildings[index].name == "Spade")
				buySpade(buildings[index].amount);
			buildings[index].cost = Math.round(buildings[index].baseCost * Math.pow(buildings[index].exp,buildings[index].amount));
			
		});
	}
	function loadPlayer(p2){
		Object.keys(p2).forEach(function(playerNodes){
			if(playerNodes == "bingoHolder" || playerNodes == "money" || playerNodes == "money_2" || playerNodes == "money_3" || playerNodes == "money_4" || playerNodes == "money_5" || playerNodes == "gain"){
				player[playerNodes] = p2[playerNodes];
			}
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
	
	Number.prototype.formatMoney = function(c, d, t){
		var n = this, 
		c = isNaN(c = Math.abs(c)) ? 0 : c, 
		d = d == undefined ? "." : d, 
		t = t == undefined ? "," : t, 
		s = n < 0 ? "-" : "", 
		i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
		j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };
	
