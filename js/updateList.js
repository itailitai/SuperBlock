var blocked = 0;
var blockedArray = [];
var firstAJAX = true;

function blockedUsers() {
    get("https://www.fxp.co.il/profile.php?do=ignorelist", parse)
}

function get(url, func) {
    window.stop();
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

}


blockedUsers()