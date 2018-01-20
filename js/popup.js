function setStorage(){
	var stringMsg="";
	var option1= document.getElementById("radio-1");
	var option2= document.getElementById("radio-2");
	var twoOption1= document.getElementById("2radio-1");
	var twoOption2= document.getElementById("2radio-2");
	
	if(option1.checked)
	{
		localStorage.setItem("options1", "1");
console.log("option 1 set");
			stringMsg="1"
	}
	else{
		localStorage.setItem("options1", "2");	
		console.log("option 2 set");
		stringMsg="2"
	}
	
	if(twoOption1.checked)
	{
		localStorage.setItem("options2", "1");	
		console.log("2 option 1 set");
		stringMsg=stringMsg+"1";
	}
	else{
		localStorage.setItem("options2", "2");
console.log("2 option 2 set");	
stringMsg=stringMsg+"2";	
	}

	chrome.storage.local.set({ 
        'stringOption': stringMsg
    }, function() {
        console.log("stored stringMsg");
    });
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
    chrome.tabs.sendMessage(tabs[0].id, {re: "refresh"}, function(response) {});  
});

document.getElementById("accepted").style.opacity="1";
setTimeout(
    function() {
      document.getElementById("accepted").style.opacity="0";
    }, 1500);
}

function setOptions (){
	
	var opt1 = localStorage.getItem("options1");
	var opt2 = localStorage.getItem("options2");
	
	console.log("got items");

	if (opt1==1){
		document.getElementById("radio-1").checked=true;
	}
	else{
		document.getElementById("radio-2").checked=true;
	}
	if (opt2==1){
		document.getElementById("2radio-1").checked=true;
	}
	else{
		document.getElementById("2radio-2").checked=true;
	}
	
		if(opt1==null||opt2==null){
		document.getElementById("radio-1").checked=true;
		document.getElementById("2radio-1").checked=true;
		setStorage();
	}
	
}

window.onload = function(){
	
	document.getElementById("radio-1").addEventListener("click", setStorage);
	document.getElementById("radio-2").addEventListener("click", setStorage);
	document.getElementById("2radio-1").addEventListener("click", setStorage);
	document.getElementById("2radio-2").addEventListener("click", setStorage);
	setOptions();
}