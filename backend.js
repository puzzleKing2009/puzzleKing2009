function winGame(){
if(score >= 100){
		var xhr = new XMLHttpRequest();
		xhr.open("GET", "https://puzzleKing2009.github.io/key2.txt", true);
		xhr.send();
		var key = xhr.responseText;
		alert("The key is: "+decode(key));
}
}
function decode(key){
	var x = key.split(":");
	var retVal;
	for(var y=0; y<x.length; y++){
		retVal +=String.fromCharCode(x[y]);
	}
	return retVal;
}