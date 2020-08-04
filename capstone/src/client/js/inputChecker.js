function checkDestination(inputText) {
    console.log("::: Running checkDestination:::", inputText);
	
	if (inputText == null || inputText === "") {
		return "Please fill in your destination"
	}
    
}

function checkDate(inputText) {
    console.log("::: Running checkDate:::", inputText);
	
	if (inputText == null || inputText === "") {
		return "Please fill in your planned travel date"
	}
	
	const onDate = new Date(inputText);
	
	// If the date object is invalid it will return 'NaN' on getTime() and NaN is never equal to itself
	if (onDate.getTime() != onDate.getTime()) {
		return "Please fill in a valid date"
	}
    
}

export { checkDestination, checkDate }
