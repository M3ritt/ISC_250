function grab(id){
	return document.getElementById(id);
}

//2 + 2 is hard coded in the html file but if it wasn't then would need to add to parameters and add them instead of just use 4
function check_numbers(ans){
	if(4 == ans)
		return "Correct";
	else 
		return "Incorrect";
}

//2 + 2 is hard coded in the html file but if it wasn't then would need to concatenate whatever id the variables are in and add to parameters
function check_string(ans){
	if(22 == ans)
		return "Correct";
	else 
		return "Incorrect";
}

function check(){
	var value = grab("ans").value;
	var feedback = grab("feedback");
	if(document.getElementById("add").checked)
		feedback.innerHTML = check_numbers(value);
	else 
		feedback.innerHTML = check_string(value);
}