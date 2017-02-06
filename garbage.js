	function checkGarbage(x){
		var isWarp = false;
		if(x % 2 == 0){
			isWarp = true;
		}
		garbageWarp(isWarp);
	}
	function garbageWarp(isWarp){
		var warpBorder = document.getElementById("buy8");
		if(isWarp){
			clearInterval(gameTimer);
			gameTimer = setInterval(gameTick, (player.updTime*.3));
			
			warpBorder.style.borderColor='#3F48CC';
			warpBorder.style.backgroundImage="url('art/build8.1.png')";
			warpMulti = 2;
		}
		else{
			clearInterval(gameTimer);
			gameTimer = setInterval(gameTick, player.updTime);
			
			warpBorder.style.borderColor='#000000';
			warpBorder.style.backgroundImage="url('art/build8.png')";
			warpMulti = 1;
		}
	}
	function warpMoney(){
		if((Math.round(Math.random()*10000)/100) <= 20){
			player.money_4 += 1;
		}
	}