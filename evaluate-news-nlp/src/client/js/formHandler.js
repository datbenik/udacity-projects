function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
	const result = Client.checkForName(formText)
    if (result != null) {
		document.getElementById('resultsName').innerHTML = result
		return
	}

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8081/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('resultsName').innerHTML = res.message
    })
}

function handleNewsSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('subject').value
    const result = Client.checkSubject(formText)
	if (result != null) {
		document.getElementById('resultsNews').innerHTML = result
		return
	}
    postData({text: formText} )
	.then(function(data) {
		console.log(`data in handleNewsSubmit after post ${JSON.stringify(data)}`); 
	})
	
}


/* Function to POST data */
const postData = async ( data = {})=>{
    console.log(`data in post ${JSON.stringify(data)}`);
    const response = await fetch('http://localhost:8081/analyseUrl', {
      method: 'POST', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),       
    });

    try {
      const newData = await response.json();
      console.log(`data after post ${JSON.stringify(newData)}`);
      return newData
    } catch(error) {
      console.log(`error after post ${error}`);
      // appropriately handle the error
    }
}

export { handleSubmit, handleNewsSubmit }
