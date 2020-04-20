let console = chrome.extension.getBackgroundPage().console;

var app = {
	init:function(){

		let AddKeyButton = document.querySelector('#AddKeyButton');
		let keywordInput = document.querySelector('#keywordInput');	
		let ul_List = document.querySelector('.keyword-list');	
		let keywordArray = [];

		let keywordList__items = ul_List.querySelectorAll(".keyword-list__item");
		
		for(var i=0; keywordList__items.length > [i]; i++){
			keywordArray.push(keywordList__items[i].innerText);		
			// console.log(keywordList__items[i].innerText);	
		}

		//sent this to background
		chrome.runtime.sendMessage({fn: 'getKeys'}, function(response){
			keywordArray = response;
			
			// console.log("page loaded response is", keywordArray);

			makeList(keywordArray);
		});


		AddKeyButton.addEventListener('click', function () {
		
			keywordArray.push(keywordInput.value);
			keywordInput.value = '';

			makeList(keywordArray);

			//sent this to background
			chrome.runtime.sendMessage({fn: 'setKeys',  keywords: keywordArray});


			// console.log("added new word to keywordArray: ", keywordArray);


		});
		




		keywordInput.addEventListener("keydown", function (event) {
			if (event.keyCode === 13) {	// Number 13 is the "Enter" key on the keyboard
				event.preventDefault();
				AddKeyButton.click();
			}		
		});


		function sendMessageToCurrentTab(message){
			setTimeout(() => {
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
					chrome.tabs.sendMessage(tabs[0].id, message);
				});
			},1000);
		}
		
		



		function makeList(targetArray) {
			console.log("targetArray:", targetArray);
			// Set up a loop that goes through the items in listItems one at a time
			let numberOfListItems = targetArray.length;

			console.log("targetArray", targetArray);
			while ( ul_List.firstChild ) {
			ul_List.removeChild( ul_List.firstChild );
			}
			
			for (let j = 0; j < numberOfListItems; ++j) {
				let li = document.createElement('li');	
	
				li.innerHTML = "<li class='keyword-list__item'>" + targetArray[j]+ "<a class='close-item' href=''></a></li>";
				
				
				ul_List.appendChild(li);

				let current_li_close= ul_List.lastChild.querySelector('.close-item');
				console.log(current_li_close)

				current_li_close.addEventListener('click', function(e){
					e.preventDefault;
					console.log("im clicked")
					this.parentElement.remove();

					var array = keywordArray;
					var newarr = array.filter(function(a){return a !== targetArray[j] });
					console.log("J:", targetArray[j]);
					keywordArray = newarr;
					console.log("keywordArray since Close:", keywordArray);

					chrome.runtime.sendMessage({fn: 'setKeys',  keywords: keywordArray});

					makeList(keywordArray);
				});
				
			}	
			
			sendMessageToCurrentTab({keywords: keywordArray})

		}
	}
}


document.addEventListener("DOMContentLoaded", function(){
	app.init();


});




/**
/if check box selected turn on filter
/if unchecked run show all

/reverse button? ONLY show those filtered

/grab text entered from input to add to a list.

each list item gets an "x" to remove **/

// window.addEventListener('load', function () {
	
	
// 	let AddKeyButton = document.querySelector('#AddKeyButton');
// 	let keywordInput = document.querySelector('#keywordInput');	
// 	let list = document.querySelector('.keyword-list');	
// 	let keywordArrayList = [];
	



	
// 	AddKeyButton.addEventListener('click', function () {
// 		let keyword = keywordInput.value;
// 		let li = document.createElement('li');
		
// 		// Add the item text
// 		li.innerHTML = "<li class='keyword-list__item'>" + keyword + "<a class='close-item' href=''>xx</a></li>";
// 		list.appendChild(li)



// 		keywordArrayList.push(keyword);
// 		keywordInput.value = '';


// 	});

// 	keywordInput.addEventListener("keydown", function (event) {
// 		if (event.keyCode === 13) {	// Number 13 is the "Enter" key on the keyboard
// 			event.preventDefault();
// 			AddKeyButton.click();
// 		}
	
// 	});

// });



