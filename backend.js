function winGame(){
if(score >= 100){
		var xhr = new XMLHttpRequest();
		var key;
		xhttp.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		       key = xhttp.responseText;
		    }
		};
		xhr.open("GET", "https://puzzleking2009.github.io/puzzleKing2009/key2.txt", true);
		xhr.send();
		
		console.log(key);
		alert("The key is: "+decode(key));
}
}
function decode(key){
	console.log(key);
	var x = key.split(":");
	var retVal;
	for(var y=0; y<x.length; y++){
		retVal +=String.fromCharCode(x[y]);
	}
	return retVal;
}
