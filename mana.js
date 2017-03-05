	function manaFill1(x){
		var manaHeight = $('#manaBar1').height();
		var manaPercent = 510 - (510 * x/100);
		$('#manaBar1').height(manaPercent);
	}
	function manaFill2(x){
		var manaHeight = $('#manaBar2').height();
		var manaPercent = 510 - (510 * x/100);
		$('#manaBar2').height(manaPercent);
	}
	function manaFill3(x){
		var manaHeight = $('#manaBar3').height();
		var manaPercent = 510 - (510 * x/100);
		$('#manaBar3').height(manaPercent);
	}
	function calcManaPercent(x){
		manaDump += x;
		$('#mana1Dump').text(manaDump.formatMoney());
		var fillPercent = Math.round((1-(Math.pow(Math.E, (manaDump*-1)/77777777)))*10000)/100;
		$('#mana1Percent').text(fillPercent);
		manaFill1(fillPercent);
		var moneyMult =  Math.round((.00000199*Math.pow(fillPercent,4)+.01)*10000)/100;
		$('#mana1Worth').text(moneyMult.formatMoney());
		manaMoneyMult = Math.round((1+(.00000199*Math.pow(fillPercent,4)+.01))*100)/100;
	}
	function calcMannaPercent(x){
		mannaDump += x;
		$('#mana2Dump').text(mannaDump.formatMoney());
		var fillPercent = Math.round((1-(Math.pow(Math.E, (mannaDump*-1)/40000000)))*10000)/100;
		$('#mana2Percent').text(fillPercent);
		manaFill2(fillPercent);
		var moneyMult =  Math.round((.00000069*Math.pow(fillPercent,4)+.01)*10000)/100;
		$('#mana2Worth').text(moneyMult.formatMoney());
		manaMoney4Mult = Math.round((1+(.00000069*Math.pow(fillPercent,4)+.01))*100)/100;
	}
	function calcMoanaPercent(x){
		moanaDump += x;
		$('#mana3Dump').text(moanaDump.formatMoney());
		var fillPercent = Math.round((1-(Math.pow(Math.E, (moanaDump*-1)/1000000000000000)))*10000)/100;
		$('#mana3Percent').text(fillPercent);
		manaFill3(fillPercent);
	}
	function manaDumpFunc(x){
		if(x==1){
			var dumpVal = player.money_4;
			player.money_4 = 0;
			calcManaPercent(dumpVal);
		}
		if(x==2){
			var dumpVal = player.money_4;
			player.money_4 = 0;
			calcMannaPercent(dumpVal);
		}
		if(x==3){
			var dumpVal = player.money;
			player.money = 0;
			calcMoanaPercent(dumpVal);
		}
	}