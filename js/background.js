
var blocked = 0;
var blockedArray = [];
var firstAJAX = true;
var messages = false;
chrome.runtime.onInstalled.addListener(function(details) {
    if (details.reason == "install") {
        console.log("This is a first install!");
		var win = window.open("\\index.html", '_blank');
		win.focus();
        blockedUsers();
    } else if (details.reason == "update") {
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});

function get(url, func) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {

        if (this.readyState == 4 && this.status == 200) {
            func(this.responseText);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function parse(html) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(html, "text/html");
    blocked = doc.querySelector(".userlist.floatcontainer").children;
    getBlocked();
}

function blockedUsers() {
    get("https://www.fxp.co.il/profile.php?do=ignorelist", parse)
}

function getBlocked() {
    for (var i = 0; i < blocked.length - 1; i++) {
        console.log(blocked[i].children[1].innerHTML);
        blockedArray.push(blocked[i].children[1].innerHTML);
    }
    console.log(blockedArray);
    storeArray();
}

function storeArray() {

    chrome.storage.local.set({
        'myobjkey': blockedArray
    }, function() {
        console.log("stored blocked");
    });
	
		chrome.storage.local.set({ 
        'stringOption': "11"
    }, function() {
        console.log("stored stringMsg");
    });

}
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
        if ((request.msg).slice(0, 9) == "startFunc") {
            messages = false;
            noti((request.msg).slice(9));

        } else if ((request.msg).slice(0, 8) == "comments") {
            messages = true;
            noti((request.msg).slice(8));
        }
    }
);

function noti(lol) {
    if (messages)
        var options = {
            type: "basic",
            title: lol + " הודעות נחסמו לגמרי!",
            message: "באמצעות FxP Super Blocker",
            iconUrl: "icon.png"
        };
    else {
        var options = {
            type: "basic",
            title: lol + " אשכולות נחסמו לגמרי!",
            message: "באמצעות FxP Super Blocker",
            iconUrl: "icon.png"
        };
    }
    if (lol != 0) {
        chrome.notifications.create(options);
    }
    console.log("popup")

}