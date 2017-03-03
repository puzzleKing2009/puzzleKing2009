	function shoeRun(){
		if(Math.round(Math.random()*100)+1 <= player.runChnc){
			isRun = true;
			var shoeBorder = document.getElementById("buy1");
			
			
			for(var i=0; i<4; i++){
				gameTick();
			}
			isRun = false;
			shoeBorder.style.borderColor='#99D9EA';
			shoeBorder.style.backgroundImage="url('art/build1.1.png')";
		}
	}
	function shoeMultiRun(){
		addMoney_1(buildings[0].currGain*700);
		oGainer += (buildings[0].currGain*700);
		gainer8 += (buildings[0].currGain*700);
	}
	function shoeMultiStep(){
		addMoney_1(Math.round(buildings[0].currGain* (buildings[0].amount)));
		oGainer += Math.round(buildings[0].currGain* (buildings[0].amount));
		gainer8 += Math.round(buildings[0].currGain* (buildings[0].amount));
		$('#multiStepValue').text(Math.round(buildings[0].currGain* (buildings[0].amount)));
	}