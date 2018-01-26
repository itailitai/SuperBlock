function disableLink(array) {
	console.log("check");
	var block = document.querySelector("a[href*='ignore']");
    
		if(array.indexOf(document.querySelector(".member_username").innerText) > -1){
			block.href = "javascript: void(0)";
    	document.querySelector(".mo").innerText=document.querySelector(".mo").innerText+" - חסום";
  	document.querySelector(".mo").style.color="black";
  	document.querySelector(".mo").style.fontWeight="bolder";
  	document.querySelector("a[href*='javascript: void(0)']").innerText="בטל את חסימת המנהל";
  	document.querySelector("a[href*='javascript: void(0)']").style.fontSize="13px";
  	document.querySelector("a[href*='javascript: void(0)']").style.fontWeight="bolder";
  	document.querySelector("a[href*='javascript: void(0)']").style.marginRight="20px";
  	block.onclick = function() { alert('חסימת המנהל הוסרה בהצלחה!');
        removeBlock(array) };
  }
    else{
    	if(document.querySelector(".mo")||document.querySelector(".mf"))
    	{
    		block.href = "javascript: void(0)";
    	document.querySelector("a[href*='javascript: void(0)']").innerText="חסום מנהל";
    	document.querySelector("a[href*='javascript: void(0)']").style.fontSize="13px";
    	document.querySelector("a[href*='javascript: void(0)']").style.fontWeight="bolder"
    	document.querySelector("a[href*='javascript: void(0)']").style.marginRight="20px";
    block.onclick = function() { alert('המנהל נחסם בהצלחה!');
        append(array) };
        }
    }
}

function store(array) {

    console.log("storing")
    chrome.storage.local.set({
        'moderators': array
    }, function() {
        console.log("added block");
         window.location.reload();
    });
    
}

function getData() {
    chrome.storage.local.get('moderators', function(data) {
            if (data.moderators) {
               disableLink(data.moderators)
            }
        
     });

}

  function append(array) {

  	console.log("appending");
        var user = document.querySelector(".member_username").innerText;
        array.push(user);
        console.log(array);
        store(array)
    }


    function removeBlock(array){
    	array.splice( document.querySelector(".member_username").innerText, 1 );
    	chrome.storage.local.set({
        'moderators': array
    }, function() {
        console.log("removed block");
        console.log(array)
         window.location.reload();

    });
    }

getData()