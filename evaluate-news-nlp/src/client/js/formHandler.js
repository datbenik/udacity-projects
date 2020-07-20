function handleNewsSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('subject').value
    const result = Client.checkSubject(formText)
	if (result != null) {
		document.getElementById('message').innerHTML = result
		return
	} else {
		document.getElementById('message').innerHTML = ''
	}
	
	console.log(`::: Form ${formText} Submitted :::`)
	
    getNewsStories({text: formText} )
	.then(function(data) {
		let i = 0;		
		for (const story of data.stories) {
			if (i>5) {
				continue
			} else
			if (story.title != null && story.title != "") {
				document.querySelector(`#title${i}`).innerHTML=story.title;
				if (story.author.name != null & story.author.name != "") {
					document.querySelector(`#author${i}`).innerHTML = story.author.name
				}
				if (story.summary.sentences) {
					let summary = '';
					for (const sentence of story.summary.sentences) {
						summary = summary + sentence;
					}
					document.querySelector(`#summary${i}`).innerHTML = summary;
				} else {
					if (story.body != null & story.body!= "") {
						document.querySelector(`#summary${i}`).innerHTML = story.body.substring(100);
					}
				}
			    i++;	
			} else {
				console.log("title is empty");
			}
		}
		
	})
	.catch(function(reason) {
		console.log(`error in handleNewsSubmit after get News ${reason}`); 

	})
	
}

/* Function to get news stories with search argument */
const getNewsStories = async ( data = {})=>{
    const response = await fetch('http://localhost:8081/getNews', {
      method: 'POST', 
      credentials: 'same-origin', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),       
    });

    try {
      const newData = await response.json();
      return newData
    } catch(error) {
      console.log(`error in getNewsStories ${error}`);
    }
}

export { handleNewsSubmit }
