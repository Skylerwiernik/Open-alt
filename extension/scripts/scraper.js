const tab = window.location.href;

const scrapeStatus = checkURL();
var images;
if (scrapeStatus == "2") {
    console.error("Open Alt had an unknown issue scraping this page.");
}
else if (scrapeStatus == "1") {
    images = getImages();
    if (images.length > 0) {
        sendImages(images);
    }
}

function checkURL() {
    // TODO: Add real api url here
    const url = "exapmle.com/api/checkurl"
    const Http = new XMLHttpRequest();
    const data = tab.id;
    Http.open("GET", url);
    Http.setRequestHeader("request-type", "checkURL");
    Http.send(data);
    // Ran on responce
    Http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = Http.responseText;
            if (response == "true") {
                return "1";
            }
            else if (response == "false") {
                return "0";
            }
            else {
                return "2"
            }
        }
    };
    function dataExpiredCallback() {
        return "2"
    }
}

function getImages() {
    // The content of the page
    const webpage = document.all[0].outerHTML;
    // Ccontent seperated by html tags
    const tags = webpage.split("<");

    var index;
    var urls;
    //Fills index with the locations of tags which need alt text
    for (var i = 0; i < tags.length; i++) {
        if (!tags[i].includes("alt") && tags[i].includes("img")) {
            index.append(i);
        }
    }
    // Gets the url of the image from the tag
    for (var i = 0; i < index.length; i++) {
        var thisTag = tags[index[i]];
        thisTag = thisTag.split('scr="')[1];
        thisTag = thisTag.split('"')[0];
        // If the url does not include the full site adress, add it.
        if (thisTag[1] == '/') {
            thisTag = tab + thisTag;
        }
        urls.append(thisTag);
    }
    return urls;
}
function sendImages(images) {
    for (var i = 0; i < images.length; i++) {
        // TODO: Add real api url here
        const url = "exapmle.com/api/checkurl"
        const Http = new XMLHttpRequest();
        Http.open("POST", url);
        Http.setRequestHeader("request-type", "sendURL");
        Http.send(images[i]);
    }

    function dataExpiredCallback() {
        console.error("An error ocured while attempting to send images to Open Alt");
    }
}
