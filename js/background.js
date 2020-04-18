console.log("background running");

var background = {

    keywords: [],

    init: function(){

        //listen for messanges from the popup
        chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
            if(request.fn in background){
                background[request.fn](request,sender,sendResponse)
            }
        })

    },

    setKeys: function(request, sender, sendResponse){
        this.keywords = request.keywords;
        console.log("setting Keys in BG:  ", request.keywords);
        console.log(this.keywords);
    },

    getKeys:function(request, sender, sendResponse){
        sendResponse(this.keywords);
        console.log(this.keywords);
    }
};

//initialize 
background.init();

