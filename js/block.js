var count = 0;
var options = {
    type: "basic",
    title: "כ-X Y נחסמו לגמרי",
    message: "באמצעות FxP Blocker",
    iconUrl: "icon.png"
};



window.onload = function() {
    console.log(`%c ________________________________________
███████╗██╗  ██╗██████╗     ███████╗██╗   ██╗██████╗ ███████╗██████╗     ██████╗ ██╗      ██████╗  ██████╗██╗  ██╗███████╗██████╗ 
██╔════╝╚██╗██╔╝██╔══██╗    ██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗    ██╔══██╗██║     ██╔═══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
█████╗   ╚███╔╝ ██████╔╝    ███████╗██║   ██║██████╔╝█████╗  ██████╔╝    ██████╔╝██║     ██║   ██║██║     █████╔╝ █████╗  ██████╔╝
██╔══╝   ██╔██╗ ██╔═══╝     ╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗    ██╔══██╗██║     ██║   ██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
██║     ██╔╝ ██╗██║         ███████║╚██████╔╝██║     ███████╗██║  ██║    ██████╔╝███████╗╚██████╔╝╚██████╗██║  ██╗███████╗██║  ██║
╚═╝     ╚═╝  ╚═╝╚═╝         ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝    ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
                                                                                                                                  `, "font-family:monospace;color: black;")
    if (window.location.href.slice(0, 41) == "https://www.fxp.co.il/forumdisplay.php?f=") {
        chrome.storage.local.get('stringOption', function(data) {
            if (data.stringOption) {

                main(data.stringOption);
            }
        });

    }
}

function main(data) {
    console.log(data);
    if (data.slice(0, 1) == 1) {
        importBlocked();
    } else {
        chrome.storage.local.get('myobjkey', function(data) {
            if (data.myobjkey) {
                window.setInterval(function() {
                    removeLastComment(data.myobjkey);
                }, 2000);
            }
        });

    }
}

function importBlocked() {

    chrome.storage.local.get('myobjkey', function(data) {
        if (data.myobjkey) {
            removeThreads(data.myobjkey);
        }
    });

}

function removeThreads(array) {
	console.log(array);
    var fun = 0;
    var stickythreads=document.querySelectorAll(".ma.mp-sticky").length;
    window.setInterval(function() {
            removeLastComment(array);
        fun = fun + 1;
        var users = document.querySelectorAll(".username.understate");

        for (var i = stickythreads; i < users.length; i++) {
            if (array.indexOf(users[i].innerHTML) > -1) {
                count++;
                users[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "none";
               
            }
            else{
                 users[i].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.style.display = "block";
            }
        }
        if (fun == 1) {
            chrome.extension.sendMessage({
                msg: "startFunc" + count
            });
        }
    }, 500);
}


function removeLastComment(array) {
    var last = document.querySelectorAll(".username.online.popupctrl");
    for (var j = 0; j < last.length; j++) {
        if (array.indexOf(last[j].innerText) > -1) {
            document.querySelectorAll(".username.online.popupctrl")[j].innerHTML = "<b>משתמש חסום</b>";
            1
        }
    }
}

chrome.extension.onMessage.addListener(

    function(request, sender, sendResponse) {
        if (request.re == "refresh") {
            window.location.reload();

        }
    }
);