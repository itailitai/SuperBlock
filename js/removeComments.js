var deleted = 0;
var blockedmods=[];

function importMods(){

    chrome.storage.local.get('moderators', function(data) {
        if (data.moderators) {
            console.log("finished importing mods")
            blockedmods=data.moderators;
            console.log(blockedmods);
        }
    });

}

function commentsDeletion() {
	
    for (var i = 0; i < document.querySelectorAll(".postbitignored.postbitim").length; i++) {
        deleted++;
        document.querySelectorAll(".postbitignored.postbitim")[i].innerHTML = "";

    }

    for (var j = 0; j < document.querySelectorAll(".postbitignored.postbitim").length; j++) {
        document.querySelectorAll(".postbitignored.postbitim")[j].outerHTML = "";
    }
	
	for (var k=0;k < document.querySelectorAll(".username").length; k++)
	{
        if(blockedmods.indexOf(document.querySelectorAll(".username")[k].innerText) > -1){
		document.querySelectorAll(".username")[k].parentNode.parentNode.parentNode.parentNode.parentNode.innerHTML = "";
		deleted++;}
	}
    chrome.extension.sendMessage({
        msg: "comments" + deleted
    });
}

function checkSettings(data)
{
	console.log(data);
	if(data.slice(1,2)==1){
		commentsDeletion();
}
if(data.slice(0,1)==1){
importf();
}
}

window.onload=function(){
    importMods()
	console.log("testing11333")
	 chrome.storage.local.get('stringOption', function(data) {
        if (data.stringOption) {

            checkSettings(data.stringOption);
        }
    });
}

chrome.extension.onMessage.addListener(

    function(request, sender, sendResponse) {
        if (request.re== "refresh") {
			window.location.reload();
		
        }
    }
);

function deleteThreads(array){



	window.setInterval(function() {
		console.log("entered func")
        	var users = document.querySelectorAll(".username");

        for (var i = 0; i < users.length; i++) {
            if (array.indexOf(users[i].innerHTML) > -1) {
            	console.log("entered if")
             users[i].parentNode.parentNode.parentNode.style.display = "none";
              }
             else
             	users[i].parentNode.parentNode.parentNode.style.display = "block";
       
    }
    }, 500);
}



function importf() {
	console.log("entered import")
    chrome.storage.local.get('myobjkey', function(data) {
        if (data.myobjkey) {
        	console.log("finished import")
            deleteThreads(data.myobjkey);
        }
    });

}