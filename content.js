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
    var timerStart = performance.now()

    if(document.querySelectorAll("ytd-rich-item-renderer").length){ // used for HOME
        itemList = document.querySelectorAll("ytd-rich-item-renderer");
    }
    // else if(document.querySelectorAll("ytd-video-renderer").length){ // used for trending listing
    //     itemList = document.querySelectorAll("ytd-video-renderer");
    // };

        for(let i=0; itemList.length > i; i++){
            let title = itemList[i].querySelector("h3");
            if(title != null){
                title = title.innerText;
                let titleArray = title.split(" ");
                let titleToLower = titleArray.join().toLowerCase();
                let titleLowerArray = titleToLower.split(",");

  
                const matchesFound = titleLowerArray.filter(element => searchWords.includes(element));
    
                if(matchesFound.length > 0 ){
                    console.log(title);
                    itemList[i].style.display = "none";
                }else{
                    itemList[i].style.display = "block";
                }
            }
        }
    var timerEnd = performance.now()
    console.log("Call time: " + (timerEnd - timerStart) + " milliseconds.")
};  

window.addEventListener('scroll', function(){
    debounceFunction(hideVideos, 500);
});



console.log("searchWords:", searchWords)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("content Listener Success");
    searchWords = request.keywords;
    console.log("AFTER content Listenere searchWords:", searchWords)
    debounceFunction(hideVideos, 500);
    console.log("run debounce");
});








