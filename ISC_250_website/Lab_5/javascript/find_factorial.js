function grab(id){
	return document.getElementById(id);
}

function factorial(n) {
  return n ? n * factorial(n - 1) : 1;
}
			
function find_factorial(){
	var value = grab("num").value;
	value = factorial(value);
	var feedback = grab("feedback");
	feedback.innerHTML = value;
	return value;
}