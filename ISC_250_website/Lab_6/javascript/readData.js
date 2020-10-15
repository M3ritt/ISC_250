/* 
	counter is the position in the array
	 - starts at -1 because the page is not originally updated at the start and prev or next will either start at the first or last item in the array
	 - hence why prev() checks if counter is less than or equal to 0
*/
var counter = -1;

function grab(id){
	return document.getElementById(id);
}

function prev(){
	if(counter <= 0){
		counter = cerealData.length-1;
		update();
	} else {
		counter--;
		update();
	}
}

function next(){
	if(counter == cerealData.length-1){
		counter = 0;
		update();
	} else {
		counter++;
		update();		
	}
}

function update(){
	var cereal = cerealData[counter];
	
	var name = grab("name");
	name.innerHTML = cereal["name"];
	
	var calories = grab("calories");
	calories.innerHTML = cereal["calories"];
	
	var protein = grab("protein");
	protein.innerHTML = cereal["protein"];
	
	var fat = grab("fat");
	fat.innerHTML = cereal["fat"];
	
	var sodium = grab("sodium");
	sodium.innerHTML = cereal["sodium"];
	
	var fiber = grab("fiber");
	fiber.innerHTML = cereal["fiber"];
	
	var carbohydrates = grab("carbohydrates");
	carbohydrates.innerHTML = cereal["carbohydrates"];
	
	var sugars = grab("sugars");
	sugars.innerHTML = cereal["sugars"];
	
	var potassium = grab("potassium");
	potassium.innerHTML = cereal["potassium"];
	
	var rating = grab("rating");
	rating.innerHTML = cereal["rating"];
}
