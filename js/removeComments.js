var deleted = 0;


function commentsDeletion() {
	
    for (var i = 0; i < document.querySelectorAll(".postbitignored.postbitim").length; i++) {
        deleted++;
        document.querySelectorAll(".postbitignored.postbitim")[i].innerHTML = "";

    }

    for (var j = 0; j < document.querySelectorAll(".postbitignored.postbitim").length; j++) {
        document.querySelectorAll(".postbitignored.postbitim")[j].outerHTML = "";
    }
    chrome.extension.sendMessage({
        msg: "comments" + deleted
    });
}

function checkSettings(data)
{
	console.log(data);
	if(data.slice(1,2)==1){
		commentsDeletion()

}
}

window.onload=function(){
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