	var avaMatComplete = false;
	var avaGroComplete = false;
	var avaWelComplete = false;
	var avaUpgCost = 1;
	var avaMatAmt = [0,0,0,0,0,0];
	var avaGroAmt = [0,0,0,0,0,0,0,0];
	var avaWelAmt = [0,0,0,0,0,0];
	function summonAvatar(){
		if(!avatarUpgPurchase){
			moanaDump = 0;
			calcMoanaPercent(0);
			avatarUpgPurchase = true;
			pickAvatar();
		}
		if($('#avatarUpgrades').is(":hidden")){
			$('#avatarUpgrades').toggle();
		}
		else{
			$('#avatarUpgrades').toggle();
		}
	}
	function pickAvatar(){
		if(avaMatComplete && avaGroComplete && avaWelComplete){
			
		}
		else{
			switch(Math.floor(Math.random()*3)+1){
				case 1: if(avaMatComplete){
							pickAvatar()
						}
						else{
							$('#avatarPlace').css("background-image", "url(art/avaMat.png)");
							pickAvaUpg(1);
						}
				break;
				case 2:	if(avaGroComplete){
							pickAvatar()
						}
						else{
							$('#avatarPlace').css("background-image", "url(art/avaGro.png)");
							pickAvaUpg(2);
						}
				break;
				case 3: if(avaWelComplete){
							pickAvatar()
						}
						else{
							$('#avatarPlace').css("background-image", "url(art/avaWel.png)");
							pickAvaUpg(3);
						}
				break;
			}
		}
	}
	function pickAvaUpg(x){
		switch(x){
			case 1: {
				var isEmpty;
				for(var y=0; y< 6; y++){
					if(avaMatAmt[y] == 0){
						isEmpty = y;
						y = 7;
					}
				}
				switch(isEmpty){
					case 0: $('#avaUpgID').text("1"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/1.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Creation of matter").append(cache); 
					$('#avaUpgTT').text("Unlocks the Flower"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 1:$('#avaUpgID').text("2"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/2.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Elevation of matter").append(cache); 
					$('#avaUpgTT').text("Unlocks the Rock"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 2:$('#avaUpgID').text("3"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/3.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Transcendence of matter").append(cache); 
					$('#avaUpgTT').text("Unlocks the Cat"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 3:
					$('#avaUpgID').text("4"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/4.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Corruption of matter").append(cache); 
					$('#avaUpgTT').text("Empowers the flower. Granting it increased power. It now ticks every 3 seconds and deals 1000x damage to all enemies"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 4:
					$('#avaUpgID').text("5"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/5.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Decline of matter").append(cache); 
					$('#avaUpgTT').text("Rocks now roll faster and more often. The moss that comes off the rocks can be harvested to increase stun chance against demons"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 5:$('#avaUpgID').text("6"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/6.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Destruction of matter").append(cache); 
					$('#avaUpgTT').text("Cats are now tigers"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
				}
			}; break;
			
			case 2: {
				var isEmpty = 10;
				while(isEmpty == 10){
					var selection = (Math.floor(Math.random()*8)+1);
					if(avaGroAmt[selection] == 0){
						isEmpty = selection;
					}	
				}
				switch(isEmpty){
					case 1: $('#avaUpgID').text("7"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/7.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Running Growth").append(cache); 
					$('#avaUpgTT').text("The value of Shoes Multistep is increased by 1,000%. Run chance is increased to 30"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 2:$('#avaUpgID').text("8"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/8.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Growing Spades").append(cache); 
					$('#avaUpgTT').text("Spades gain 10% crit chance. The bonus from digging frenzy is doubled"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 3:$('#avaUpgID').text("9"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/9.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("GRINGO").append(cache); 
					$('#avaUpgTT').text("5 Bingo balls are called out. Bingo balls are called out every other tick."); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 4:
					$('#avaUpgID').text("10"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/10.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Crashing Ships").append(cache); 
					$('#avaUpgTT').text("Overdrive duration is doubled. Rocket Discount now goes up to 99%"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 5:
					$('#avaUpgID').text("11"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/11.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Magical Growth (not cancer)").append(cache); 
					$('#avaUpgTT').text("The chance for tridents to give extra tridents is doubled. Doubles the bonus of Hidden Value"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 6:$('#avaUpgID').text("12"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/12.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Growing Explosions").append(cache); 
					$('#avaUpgTT').text("Gold Bat 9000 now gains 1,000% Baterest value when it explodes. Doubles the gain of Baterest"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 7:$('#avaUpgID').text("13"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/13.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Shrinking Ice").append(cache); 
					$('#avaUpgTT').text("Ice Cubes give 4 smilies. When an Ice Cube Melts all other Ice Cubes duration is reduced by 50"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 8:$('#avaUpgID').text("14"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/14.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Growing Garbage").append(cache); 
					$('#avaUpgTT').text("Garbage now gets all benefits no matter how many you own. All bonuses except Time Warp are doubled"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
				}
			}; 
			break;
			
			case 3: {
				var isEmpty = 10;
				while(isEmpty == 10){
					var selection = (Math.floor(Math.random()*6));
					if(avaWelAmt[selection] == 0){
						isEmpty = selection;
					}	
				}
				switch(isEmpty){
					case 0: $('#avaUpgID').text("15"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/15.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Wealth").append(cache); 
					$('#avaUpgTT').text("Increases time between ticks by 2 second. Normal ticks are replaced by quad Ticks"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 1:$('#avaUpgID').text("16"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/16.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Posidens Trident").append(cache); 
					$('#avaUpgTT').text("Increases all $ gain by 400%"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 2:$('#avaUpgID').text("17"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/17.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Smile.jpg").append(cache); 
					$('#avaUpgTT').text("Increases all φ gain by 250%"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 3:
					$('#avaUpgID').text("18"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/18.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Dig").append(cache); 
					$('#avaUpgTT').text("Increases all ☺ gain by 400%"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 4:
					$('#avaUpgID').text("19"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/19.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Welthy Nazi").append(cache); 
					$('#avaUpgTT').text("Increases all ♠ gain by 150%"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
					case 5:$('#avaUpgID').text("20"); 
					$('#avaUpgSlot').css('background-image', 'url(art/avaUpg/20.png)'); 
					var cache = $('#avaUpgDesc').children();
					$('#avaUpgDesc').text("Wealthy Time").append(cache); 
					$('#avaUpgTT').text("Increases all § gain by 100%"); 
					$('#avaUpgPrice').text(avaUpgCost);  
					break;
				}
			}; break;
		}
	}
	function convertMonies(){
		 addMoney_5(calcConvertMonies());
		player.money = player.money_2 = player.money_3 = player.money_4 = 0;
	}
	function calcConvertMonies(){
		return Math.round(((player.money * .0000000000000001) + (player.money_2 * .000000001) + (player.money_3 * .00001) + (player.money_4 * .00000001)));
	}
	function buyAvaUpgrade(){
		var avaUpg = Number($('#avaUpgID').text());
		switch(avaUpg){
			case 1: avaMatAmt[0] = 1; $('#building8').fadeIn(); break;
			case 2: avaMatAmt[1] = 1; $('#building9').fadeIn(); break;
			case 3: avaMatAmt[2] = 1; $('#building10').fadeIn(); break;
			case 4: avaMatAmt[3] = 1;break;
			case 5: avaMatAmt[4] = 1;break;
			case 6: avaMatAmt[5] = 1;break;
			case 7: avaGroAmt[0] = 1; multiStepVal = 10; player.runChnc = 30; break;
			case 8: avaGroAmt[1] = 1; player.digChnc += 10; player.multCritValue = (player.multCritValue * 2); break;
			case 9: avaGroAmt[2] = 1; player.ballsCalled = 5; player.bingoWait = 2; break;
			case 10: avaGroAmt[3] = 1; overdriveDurationVal = 21; rocketFuelMax = .01; break;
			case 11: avaGroAmt[4] = 1; doubleMagicChnc = 50; hiddenValueVal *= 2; break;
			case 12: avaGroAmt[5] = 1;break;
			case 13: avaGroAmt[6] = 1;break;
			case 14: avaGroAmt[7] = 1;break;
			case 15: avaWelAmt[0] = 1; tripleTickEnable = true; player.updTime += 2000; checkGarbage(buildings[7].amount); break;
			case 16: avaWelAmt[1] = 1; avaMon1Mult = 5; break;
			case 17: avaWelAmt[2] = 1; avaMon2Mult = 3.5; break;
			case 18: avaWelAmt[3] = 1; avaMon3Mult = 5; break;
			case 19: avaWelAmt[4] = 1; avaMon4Mult = 2.5; break;
			case 20: avaWelAmt[5] = 1; avaMon5Mult = 2; break;
		}
		finishAvaUpg();
	}
	function finishAvaUpg(){
		avaUpgCost = Math.round(avaUpgCost + ( 1.5 * totalAvaUpg()));
		$('#summonButton:visible').toggle();
		$('#avatarUpgrades:visible').toggle();
	}
	function totalAvaUpg(){
		return (avaMatAmt.reduce(sumBucket,0) + avaGroAmt.reduce(sumBucket,0) + avaWelAmt.reduce(sumBucket, 0));
	}
	
