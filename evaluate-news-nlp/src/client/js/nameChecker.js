function checkSubject(inputText) {
    console.log("::: Running checkSubject :::", inputText);
	
	if (inputText == null || inputText === "") {
		return "Please fill in what you are looking for"
	}
	
// Don't get this to compile and didn't find how to fix it	
//	if (!inputText.match("^[a-zA-Z0-9-]+$")) {
//		return "The subject has special characters. These are not allowed.");
//	}
    
}

export { checkSubject }
