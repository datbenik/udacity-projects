function checkDestination(inputText) {
    console.log("::: Running checkDestination:::", inputText);
	
	if (inputText == null || inputText === "") {
		return "Please fill in your destination"
	}
    
}

function checkTravelDate(travelDate) {
    console.log("::: Running checkTravelDate:::", travelDate);
	
	if (travelDate == null || travelDate === "") {
		return "Please fill in your planned travel date"
	}
	
	const onDate = new Date(travelDate);
	
	// If the date object is invalid it will return 'NaN' on getTime() and NaN is never equal to itself
	if (onDate.getTime() != onDate.getTime()) {
		return "Please fill in a valid travel date"
	} 
}

function checkReturnDate(travelDate, returnDate) {
    console.log("::: Running checkReturnDate:::", returnDate);
	
	if (returnDate == null || returnDate === "") {
		return null
	}
	
	const toDate = new Date(returnDate);
	
	// If the date object is invalid it will return 'NaN' on getTime() and NaN is never equal to itself
	if (toDate.getTime() != toDate.getTime()) {
		return "Please fill in a valid return date"
	}
	
	const onDate = new Date(travelDate);
	
	if (onDate.getTime() >= toDate.getTime()) { 
		return "Please make sure the return date is after the date of departure"
	}
}

export { checkDestination, checkTravelDate, checkReturnDate }
