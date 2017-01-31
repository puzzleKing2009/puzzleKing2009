var upg1Cost = 1;
var upg1Manage = new Array(11);
var upg1Amt = [1,3,3,1,1,1,3,3,1,1,1];
upg1Manage.fill(0);
upg1Manage[0] = 1;
$('#b1upg1').toggleClass("upgradeBuy");

	function showB1UpgradeSlow(){
		$('#b1upg1').fadeIn('slow');
		$('#b1upg1amt').fadeIn('slow');
		$('#b1upg2').delay(350).fadeIn('slow');
		$('#b1upg3').delay(650).fadeIn('slow');
		$('#b1upg4').delay(1250).fadeIn('slow');
		$('#b1upg5').delay(950).fadeIn('slow');
		$('#b1upg6').delay(1550).fadeIn('slow');
		$('#b1upg7').delay(350).fadeIn('slow');
		$('#b1upg8').delay(650).fadeIn('slow');
		$('#b1upg9').delay(650).fadeIn('slow');
		$('#b1upg10').delay(950).fadeIn('slow');
		$('#b1upg11').delay(1250).fadeIn('slow');

		$('#b1l1').delay(350).fadeIn('slow');
		$('#b1l2').delay(650).fadeIn('slow');
		$('#b1l3').delay(950).fadeIn('slow');
		$('#b1l4').delay(950).fadeIn('slow');
		$('#b1l5').delay(350).fadeIn('slow');
		$('#b1l6').delay(1250).fadeIn('slow');
		$('#b1l7').delay(1550).fadeIn('slow');
		$('#b1l8').delay(650).fadeIn('slow');
		$('#b1l9').delay(1250).fadeIn('slow');
		$('#b1l10').delay(650).fadeIn('slow');
	
		fillB1UpgradeText();
	}
	
	function showB1Upgrade(){
		$('#b1Upgrades').toggle();
		fillB1UpgradeText();
	}
	
	function buy1Upgrade(x){
		if(upg1Manage[x] > 0 && player.money_2 > upg1Cost){
			if(upg1Manage[x] == 1){
				player.money_2 -= upg1Cost; 
				upg1Manage[x]++;
				switch(x){
					case 0: $('#b1l5').css('background-image','url(art/upgBar2_1.png)'); 
							$('#b1l1').css('background-image','url(art/upgBar1_1.png)'); 
							$('#b1upg2').toggleClass("upgradeBuy");
							$('#b1upg7').toggleClass("upgradeBuy");
							$('#b1upg2amt').fadeIn('slow');
							$('#b1upg7amt').fadeIn('slow');
							upg1Manage[1] = 1;
							upg1Manage[6] = 1;
							update1Upgrade(x);
							fillB1UpgradeText();
							break;
					case 1: $('#b1l8').css('background-image','url(art/upgBar4_1.png)'); 
							$('#b1upg3').toggleClass("upgradeBuy");
							$('#b1upg3amt').fadeIn('slow');
							upg1Manage[2] = 1;
							update1Upgrade(x);
							fillB1UpgradeText();
							break;
					case 2: $('#b1l9').css('background-image','url(art/upgBar4_1.png)'); 
							$('#b1l4').css('background-image','url(art/upgBar1_1.png)'); 
							$('#b1upg4').toggleClass("upgradeBuy");
							$('#b1upg5').toggleClass("upgradeBuy");
							$('#b1upg4amt').fadeIn('slow');
							$('#b1upg5amt').fadeIn('slow');
							upg1Manage[3] = 1;
							upg1Manage[4] = 1;
							update1Upgrade(x);
							fillB1UpgradeText();
							break;
					case 3: $('#b1l7').css('background-image','url(art/upgBar3_1.png)'); 
							$('#b1upg6').toggleClass("upgradeBuy");
							$('#b1upg6amt').fadeIn('slow');
							upg1Manage[5] = 1;
							update1Upgrade(x);
							fillB1UpgradeText();
							break;
					case 4: update1Upgrade(x);
							break;
					case 5: update1Upgrade(x);
							break;
					case 6: $('#b1l10').css('background-image','url(art/upgBar4_1.png)'); 
							$('#b1l2').css('background-image','url(art/upgBar1_1.png)'); 
							$('#b1upg8').toggleClass("upgradeBuy");
							$('#b1upg9').toggleClass("upgradeBuy");
							$('#b1upg8amt').fadeIn('slow');
							$('#b1upg9amt').fadeIn('slow');
							upg1Manage[7] = 1;
							upg1Manage[8] = 1;
							update1Upgrade(x);
							fillB1UpgradeText();
							break;
					case 7: update1Upgrade(x);
							break;
					case 8: $('#b1l3').css('background-image','url(art/upgBar1_1.png)'); 
							$('#b1upg10').toggleClass("upgradeBuy");
							$('#b1upg10amt').fadeIn('slow');
							upg1Manage[9] = 1;
							update1Upgrade(x);
							fillB1UpgradeText();
							break;
					case 9: $('#b1l6').css('background-image','url(art/upgBar2_1.png)'); 
							$('#b1upg11').toggleClass("upgradeBuy");
							$('#b1upg11amt').fadeIn('slow');
							upg1Manage[10] = 1;
							update1Upgrade(x);
							fillB1UpgradeText();
							break;
					case 10: update1Upgrade(x);
							fillB1UpgradeText();
							break;
				}
			}
			else{
				if((upg1Manage[x]-1) < upg1Amt[x]){
					player.money_2 -= upg1Cost; 
					upg1Manage[x]++;
					update1Upgrade(x);
					fillB1UpgradeText();
				}	
			}
		}
	}
	function update1Upgrade(x){
		$('#b1upg'+(x+1)+'amt').text((upg1Manage[x]-1)+"/"+upg1Amt[x]);
	}
	function fillB1UpgradeText(){
		upg1Manage.forEach(function(upg, index){
			$('#b1upg'+(index+1)+'amt').text((upg-1)+"/"+upg1Amt[index]);
		});
	}