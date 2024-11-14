//Car Dealership HTML Implementation JS
//Works in tandem with data in usedCars.js
//const usedCars = require("./usedCars");
const listLength = usedCars.length;
//console.log(listLength)

//HTML doc variables
let carFilter = document.getElementById("carFilter");
let result = document.getElementById("result");

//Input: Need to execute a function when filterBtn is pressed, updating innerHTML
//Filter: Need to accept filter input and loop through usedCars array, printing valids to innerHTML
//Special Cases: Default render (Show All), Filter = none (Special Message)
//JS: Need script to execute after page is finished loading (need main func?)
let matches = 0;
//Submit form event will start the display update
carFilter.addEventListener("submit", (e) => {
	e.preventDefault(); //saves memory

	//collecting data
	let yearMin = document.getElementById("yearMin").value;
	let yearMax = document.getElementById("yearMax").value;
	let make = document.getElementById("make").value;
	let miles = document.getElementById("miles").value;
	let price = document.getElementById("price").value;
	let color = document.getElementById("color").value;

	//testing
	//console.log(yearMin);
	//result.innerHTML = `<p>${yearMin}<br>${yearMax}<br>${make}<br>${miles}<br>${price}<br>${color}<br></p>`;

	//assessing data for update
	//special case here: Filter = none
	let validIndexes = [];
	matches = 0;
	for (let i = 0; i < listLength; i++) {
		//looking at usedCars[i] and determining if filters match
		//pushing attributes to a local list
		let carSpecs = [];
		carSpecs.push(usedCars[i].year, usedCars[i].make, usedCars[i].mileage, usedCars[i].price, usedCars[i].color);
		//determining if filter matches attributes
		if ((carSpecs[0] >= yearMin && carSpecs[0] <= yearMax || carSpecs[0] >= yearMin && yearMax == "" || yearMin == "" && carSpecs[0] <= yearMax || yearMin == "" && yearMax == "")
			&& (carSpecs[1] == make || make == "")
			&& (carSpecs[2] <= miles || miles == "")
			&& (carSpecs[3] <= price || price == "")
			&& (carSpecs[4] == color || color == "")) {
				//adding index to validIndexes
				validIndexes.push(i);
				//incrementing matches for special case check
				matches++;
		}
	}

	//testing
	//console.log(matches)

	//updating result innerHTML
	//if matches < 1: print Filter = None special message
	//else: loop through validIndexes and concatenate an innerHTML literal
	let resultPrint = ``;
	let index = 0;
	if (matches < 1){
		resultPrint = `<p class="noResult">No matching results found. Please try again.</p>`
	} else {
		//looping through valid indexes and concatenating an innerHTML literal
		for (let i = 0; i < validIndexes.length; i++) {
			index = validIndexes[i];
			//usedCars[index].year, usedCars[index].make, usedCars[index].model, usedCars[index].mileage, usedCars[index].price, usedCars[index].color, usedCars[index].gasMileage
			resultPrint += `
			<div class="resultCard">
				<h2>${usedCars[index].year} ${usedCars[index].make} ${usedCars[index].model}</h2>
				<p>Price: ${usedCars[index].price}</p>
				<p>Color: ${usedCars[index].color}</p>
				<p>Mileage: ${usedCars[index].mileage} miles</p>
				<p>${usedCars[index].gasMileage}</p>
				<button class="detailsBtn">Details</button>
			</div>
			`;
		}
	}
	//finally, update innerHTML with literal
	result.innerHTML = resultPrint
});

//Special case here: Default render
//Creating a default literal with all the usedCars
let resultPrint = ``;
for (let index = 0; index < usedCars.length; index++) {
	resultPrint += `
	<div class="resultCard">
		<h2>${usedCars[index].year} ${usedCars[index].make} ${usedCars[index].model}</h2>
		<p>Price: ${usedCars[index].price}</p>
		<p>Color: ${usedCars[index].color}</p>
		<p>Mileage: ${usedCars[index].mileage} miles</p>
		<p>${usedCars[index].gasMileage}</p>
		<button class="detailsBtn">Details</button>
	</div>
	`;
}

//Updating innerHTML with default literal
result.innerHTML = resultPrint;