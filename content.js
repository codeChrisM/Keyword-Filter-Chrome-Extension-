let itemList = [];
var timerId;

let searchWords;

function debounceFunction(func, delay) {
    // Cancels the setTimeout method execution
    clearTimeout(timerId)

    // Executes the func after delay time.
    timerId  =  setTimeout(func, delay)
}

function hideVideos(){
    var timerStart = performance.now()//speedCheck


    /** WHAT ELEMENTS ARE VIDEOS? **/
    if(document.querySelectorAll("ytd-rich-item-renderer").length){ // "HOME Page"
        itemList = document.querySelectorAll("ytd-rich-item-renderer");
    }
    else if(document.querySelectorAll("ytd-video-renderer").length){ //"trending"
        itemList = document.querySelectorAll("ytd-video-renderer");
    }

    if(itemList.length > 0){
        for(let i=0; itemList.length > i; i++){
            let title = itemList[i].querySelector("h3");
            if(title != null){
                title = title.innerText;

                //1. create an array out of the words in the title that are all lower case
                let titleArray = title.split(" ").join().toLowerCase().split(",");

                //2. search for any of the filtered words in this title
                const matchesFound = titleArray.filter(element => searchWords.includes(element));

                //3. show or don't
                if(matchesFound){
                    console.log(title);
                    itemList[i].style.display = "none";
                }else{
                    itemList[i].style.display = "block";
                }
            }
        }
    }else{
        console.log("app won't run because URL of Video not yet supported")
    }


    var timerEnd = performance.now()//speedCheck
    console.log("Call time: " + (timerEnd - timerStart) + " milliseconds.")//speedCheck
};  


window.addEventListener('scroll', function(){
    if(itemList.length > 0){
        debounceFunction(hideVideos, 200);
    }
});

//**LISTEN** Popup to Content
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    searchWords = request.keywords;
    console.log("Content: Listener searchWords:", searchWords)
    if(itemList.length > 0){
        hideVideos();
    }
});









