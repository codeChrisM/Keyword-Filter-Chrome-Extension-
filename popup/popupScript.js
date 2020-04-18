let console = chrome.extension.getBackgroundPage().console;

console.log("running popup");


var app = {
	init:function(){

		let AddKeyButton = document.querySelector('#AddKeyButton');
		let keywordInput = document.querySelector('#keywordInput');	
		let ul_List = document.querySelector('.keyword-list');	
		let keywordArray = [];

		let keywordList__items = ul_List.querySelectorAll(".keyword-list__item");
		
		for(var i=0; keywordList__items.length > [i]; i++){
			keywordArray.push(keywordList__items[i].innerText);		
			console.log(keywordList__items[i].innerText);	
		}

		//sent this to background
		chrome.runtime.sendMessage({fn: 'getKeys'}, function(response){
			keywordArray = response;
			
			console.log("page loaded response is", keywordArray);

			makeList(keywordArray);
		});


		AddKeyButton.addEventListener('click', function () {
			let li = document.createElement('li');
			
			// Add the item text
			// li.innerHTML = "<li class='keyword-list__item'>" + keywordInput.value + "<a class='close-item' href=''>xx</a></li>";
			li.innerHTML = "<li class='keyword-list__item'>" + keywordInput.value + "</li>";
			

			ul_List.appendChild(li)
	
	
	
			keywordArray.push(keywordInput.value);
			keywordInput.value = '';

			//sent this to background
			chrome.runtime.sendMessage({fn: 'setKeys',  keywords: keywordArray});

			console.log("added new word to keywordArray: ", keywordArray);
		});
	



		keywordInput.addEventListener("keydown", function (event) {
			if (event.keyCode === 13) {	// Number 13 is the "Enter" key on the keyboard
				event.preventDefault();
				AddKeyButton.click();
			}
		
		});



		function makeList(targetArray) {
			console.log("targetArray:", targetArray);
			// Set up a loop that goes through the items in listItems one at a time
			let numberOfListItems = targetArray.length;
			
			for (let j = 0; j < numberOfListItems; ++j) {
				let li = document.createElement('li');
	
				// Add the item text
				// li.innerHTML = "<li class='keyword-list__item'>" + keywordInput.value + "<a class='close-item' href=''>xx</a></li>";
				li.innerHTML = "<li class='keyword-list__item'>" + keywordInput.value + "</li>";
				
				
				ul_List.appendChild(li)
	
				// let closeButton = li.querySelector('.close-item');
				// closeButton.addEventListener('click', function(event) {

				// 	makeList(targetArray);				
				// });		

			}		
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



