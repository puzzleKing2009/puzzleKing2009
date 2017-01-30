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
		
		this.meltTime = 900;
		this.iceHolder = iceHolder;
		this.bingoHolder = bingoHolder;
		this.bingoWait = 15;
		this.spdWorth = 0.18;
		this.spdMWorth = 0.84;
		this.shipMlt = 1.092;
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

		buildings = [new building("Shoes", 20, 1.078, 1), new building("Spade", 200, 1.05, 2), new building("Bingo", 2500, 1.06, 17), new building("Spaceship", 9000, 1.155, 80), new building("Magic", 40000, 1.033, 80), new building("Ice Cubes", 999999, 1.75, 5), new building("Football", 50000000, 1.03, 7), new building("Garbage", 800000000, 1.05, 8)];
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
	//	document.getElementById("gainer1").innerHTML = (gainer1/gainer8*100).formatMoney(2);
	//	document.getElementById("gainer2").innerHTML = (gainer2/gainer8*100).formatMoney(2);
	//	document.getElementById("gainer3").innerHTML = (gainer3/gainer8*100).formatMoney(2);
	//	document.getElementById("gainer4").innerHTML = (gainer4/gainer8*100).formatMoney(2);
	//	document.getElementById("gainer5").innerHTML = (gainer5/gainer8*100).formatMoney(2);
	//	document.getElementById("gainer6").innerHTML = (gainer6/gainer8*100).formatMoney(2);
	//	document.getElementById("gainer7").innerHTML = (gainer7/gainer8*100).formatMoney(2);
	//	document.getElementById("gainer8").innerHTML = gainer8.formatMoney();
		
		buildings.forEach(function(building, index){
			index++;
			document.getElementById("owned"+index).innerHTML = building.amount;
			document.getElementById("cost"+index).innerHTML = building.cost.formatMoney();
		//	document.getElementById("give"+index).innerHTML = building.baseGain;
		//	document.getElementById("total"+index).innerHTML = building.currGain;
			document.getElementById("give"+index+"Txt").innerHTML = building.baseGain.formatMoney();
			if(index==4){
				document.getElementById("give"+index+"currTxt").innerHTML = Math.round(building.baseGain/player.shipMlt).formatMoney();
			}
			if(index==6)
				document.getElementById("melt"+index+"Txt").innerHTML = player.meltTime;
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
			case 6: worthRatio = Math.round((building.baseGain + (getMeltWorth()/player.meltTime)+50000)/building.cost*1000); break;
			case 7: break;
			case 8: break;
		}
		return worthRatio
	}
	function gameTick(){
		resetBuildingIcon();
//		$('#building1Upgrade').css({"background-image": "url(art/build1.png)", "background-size":"contain"});
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
			document.getElementById("buy"+index).src="art/build"+index+".png";
			document.getElementById("buy"+index).style.borderColor="#000000";
		});
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
				for(var x=0; x < buildings[index].amount; x++){
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
			if(playerNodes == "iceHolder" || playerNodes == "bingoHolder" || playerNodes == "money" || playerNodes == "money_2" || playerNodes == "money_3" || playerNodes == "money_4" || playerNodes == "money_5" || playerNodes == "gain"){
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
	