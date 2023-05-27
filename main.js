
// Javascript
// Alert JS
// let  showingAlert = false;
// const interval = setInterval(() => {
	// document.title = showingAlert ? "Chat App": "(1) New Message";
	// showingAlert = !showingAlert;
// }, 1000)
// to stop alert
// clearInterval(interval);


// burger javascript 
// const containerBurger = document.querySelector(".container-burger");
// const containerBurgerRotate = document.querySelector(".container-burger-rotate");
// containerBurger.addEventListener("click", function(){
	// containerBurgerRotate.classList.toggle("burger-rotate");
	// setTimeout(() => {
		// containerBurgerRotate.classList.toggle("toggle-x");
		// containerBurgerRotate.classList.toggle("toggle-color");
	// }, 500);
// });
// const containerWaitIcon = document.querySelector(".container-wait-icon");
// const containerWaitIconInner = document.querySelector(".container-wait-icon-inner");
// containerWaitIcon.addEventListener("click", function(){
	// containerWaitIconInner.classList.toggle("rotate-me");
// });



// javascript lego art


// get theme information from css page
const root = document.querySelector(":root");
let version =  getComputedStyle(root).getPropertyValue("--version");
let author =  getComputedStyle(root).getPropertyValue("--author");
// write version to footer
const authorDisplay = document.querySelector(".author");
authorDisplay.innerHTML = author;
const yearDisplay = document.querySelector(".year");
yearDisplay.innerHTML = new Date().getFullYear();
const versionDisplay = document.querySelector(".version");
versionDisplay.innerHTML = "ver. " + version;
//update page title
document.title = "Lego Art Designer ver. " + version


// links to html
const containerLegoArt = document.querySelector(".container-lego-art");
const container16x16 = document.querySelector(".container-16x16");
const colorPalletChoices = document.querySelector(".color-pallet-choices");


//variables
let stateArray = [];
let countArray = [];


// generate the panels
function generate(){
	// create panel row
	for(p= 1; p < 10; p++){
		let panel = document.createElement('div');
		let panelNumber = "p" + p;
		panel.classList.add("panel");
		panel.classList.add(panelNumber);
		containerLegoArt.appendChild(panel);
	
		for(j = 1; j < 17; j++){
			// create rows
			let row = document.createElement('div');
			let rowNumber = panelNumber + "-r" + j;
			
			row.classList.add("row");	
			row.classList.add(rowNumber);	
			// container16x16.appendChild(row);
			let panelClass = document.querySelector(`.${panelNumber}`);
			panelClass.appendChild(row);
			
			// create lego bricks
			for(i = 1; i < 17; i++){	
				let rowClass = document.querySelector(`.${rowNumber}`);
				let brickNumber = rowNumber + "-b" + i;
				rowClass.innerHTML += `<div class="lego-brick" id="${brickNumber}"><div class="lego-brick-circle"></div></div>`;
			}
			
			// event listener to change color
			for(k = 1; k < 17; k++){
				const e = document.getElementById(`p${p}-r${j}-b${k}`);
				
				e.addEventListener("click", () => {
					let output = currentColor.style.background;
					const object = stateArray.find(obj => obj.id === e.id);
					let originalColor = e.style.background;
					
					if(object.hasBrick === true){
						// set background color of object
						let output = currentColor.style.background;
						e.style.background = output;
						//set color to array
						object.color = output;
						//update array and display
						updateCount(true, output, originalColor);
					}
					else{
						//target child node
						e.childNodes[0].style.opacity = 1;
						// set background color of object
						e.style.background = output;
						//set color to array
						const object = stateArray.find(obj => obj.id === e.id);
						object.color = output;
						object.hasBrick = true;
						//update array and display
						updateCount(false, output, originalColor);
					};
					
					//save current design to local stoarge
					localStorage.setItem("legoCurrentDesign", JSON.stringify(stateArray));
					localStorage.setItem("legoCurrentCount", JSON.stringify(countArray));
				});
				
				// create array of colors
				value = e.style.backgroundColor;
				stateArray.push({
					id : e.id,
					color : value,
					hasBrick : false,
					});
			};
		};
	};
	if(localStorage.getItem("legoCurrentDesign") !== null){	
	}
	else{
		localStorage.setItem("legoCurrentDesign", JSON.stringify(stateArray));
	};
	//save current design to local stoarge
	if(localStorage.getItem("legoCurrentCount") !== null){
	}
	else{
		createCountArray();
		localStorage.setItem("legoCurrentCount", JSON.stringify(countArray));
	};
};
generate();


// create count array
function createCountArray(){
	for(i = 0; i < legoColorPallet.length; i++){
		countArray.push({
			id: "bnc"+i,
			name : legoColorPallet[i].name,
			color : legoColorPallet[i].color,
			rgb : legoColorPallet[i].rgb,
			count : 0,
		});
	};
}
createCountArray();


// updates count and arrays
function updateCount(tf, newColor, orgColor){
	if(tf === false){
		for(i = 0; i < countArray.length; i++){
			if( newColor === countArray[i].rgb ){
				console.log("meow");
				const countId = document.getElementById(countArray[i].id);
				countArray[i].count += 1;
				countId.innerHTML = countArray[i].count;
			};
		};
	};
	
	if(tf === true){
		for(i = 0; i < countArray.length; i++){
			if( orgColor === countArray[i].rgb ){
				const countId = document.getElementById(countArray[i].id);
				countArray[i].count -= 1;
				countId.innerHTML = countArray[i].count;
			};
			if( newColor === countArray[i].rgb ){
				const countId = document.getElementById(countArray[i].id);
				countArray[i].count += 1;
				countId.innerHTML = countArray[i].count;
			};
		};
	};
	
};


// create color pallet
let currentColor = document.querySelector("#current-color");
let currentColorHover = document.querySelector(":root");
function generateColorPallet(){
	// create 16 bricks
	for(i = 1; i < 17; i++){
		let colorPalletNumber = "cp" + i;
		colorPalletChoices.innerHTML += `<div class="lego-brick" id="${colorPalletNumber}"></div>`;	
	};
	// add event listener
	for(j = 1; j < 17; j++){
		const e = document.getElementById(`cp${j}`);
		e.addEventListener("click", () => {
			let output = e.style.background;
			currentColor.style.background = output;
			//sets hover variable color
			currentColorHover.style.setProperty('--current-color', output);
		});
	}
};
generateColorPallet();


// add event listeners to color pallet
const colorPalletList = document.querySelector(".color-pallet-list");
colorPalletList.addEventListener("change", (event) => {
	for(i = 0; i < pallets.length; i++){
		if(colorPalletList.value === pallets[i].id){
			for(j = 1; j < 17; j++){
				let tempcolor = document.getElementById(`cp${j}`);
				if(pallets[i][`cp${j}`] === "#000"){
					tempcolor.style.border = "none";
					tempcolor.style.background = pallets[i][`cp${j}`];
				}
				else{
					tempcolor.style.border = "1px solid white";
					tempcolor.style.background = pallets[i][`cp${j}`];
				};
			};	
		}
	};
});


const btnClearAll = document.querySelector("#btn-clear-all");
btnClearAll.addEventListener("click", function(){
	clearAll();
});
function clearAll(){
	localStorage.removeItem("legoCurrentDesign")
	//clears state array
	for(i = 0; i < stateArray.length; i++){
		// clears display
		let e = document.getElementById(stateArray[i].id);
		e.style.background = "";
		e.childNodes[0].style.opacity = 0;
		// clears state array
		stateArray[i].color = "";
		stateArray[i].hasBrick = false;
	};
	localStorage.setItem("legoCurrentDesign", JSON.stringify(stateArray))
	
	localStorage.removeItem("legoCurrentCount")
	// clears count array
	for(j = 0; j < countArray.length; j++){
		
		countArray[j].count = 0;
		const countId = document.getElementById(countArray[j].id);

		countId.innerHTML = countArray[j].count;
	}
	localStorage.setItem("legoCurrentCount", JSON.stringify(countArray))
};


// legoColorPallet
const displayParts = document.querySelector(".display-parts");
function createLegoColorPallet(){
	
	for(i = 0; i < legoColorPallet.length ; i++){	
		// let rowClass = document.querySelector(`.${rowNumber}`);
		let brickNumber = "lcp" + i;
		let brickColorTitle = "bct" + i;
		let brickNumberCount = "bnc" + i
		displayParts.innerHTML += `
		<div class="container-brick-color-parts">
			<div class="container-brick-color">
				<div class="lego-brick" id="${brickNumber}"></div>
				<h4 id="${brickColorTitle}"></h4>
			</div>
			<div id=${brickNumberCount}>0</div>
		</div>
		`;
	}
	
	for(j = 0; j < legoColorPallet.length; j++){
		let tempcolor = document.getElementById(`lcp${j}`);
		tempcolor.style.background = legoColorPallet[j].color;
		let colorTitle = document.getElementById(`bct${j}`);
		colorTitle.innerHTML = legoColorPallet[j].name;

	};	
};
createLegoColorPallet();


// load saved design from local storage
function loadDesign(){
	// load design display

	stateArray = JSON.parse(localStorage.getItem("legoCurrentDesign"));
	for(i = 0; i < stateArray.length; i++){
		let e = document.getElementById(stateArray[i].id);
		e.style.background = stateArray[i].color;
		//target child node
		if(stateArray[i].hasBrick){
			e.childNodes[0].style.opacity = 1;
		}
		else{
			e.childNodes[0].style.opacity = 0;
		}
		
		
	};
	countArray = JSON.parse(localStorage.getItem("legoCurrentCount"));
	// load count array display
	for(i = 0; i < countArray.length; i++){
		const countId = document.getElementById(countArray[i].id);
		countId.innerHTML = countArray[i].count;
	};
	
};
loadDesign();
















