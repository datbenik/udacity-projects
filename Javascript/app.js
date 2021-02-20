
    // Create Dino Constructor
	
	function Dino(species, weight, height, diet, where, when, fact) {
	  this.species = species;
	  this.weight = weight;
	  this.height = height;
	  this.diet = diet;
	  this.where = where;
	  this.when = when;
	  this.fact = fact;
	}

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
	
	Dino.prototype.compareWeight = function (weight) {
		if (this.weight > weight) {
			return `${this.species} weighed more than you!`;
		} else {
			if (this.weight < weight) {
				return `${this.species} weighed less than you!`;
			} else {
				return `${this.species} weighed just as much as you!`;
			}
		}
	};
	   
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.

	
	Dino.prototype.compareHeight = function (height) {
		if (this.height > height) {
			return `${this.species} was taller than you!`;
		} else {
			if (this.height < height) {
				return `${this.species} was smaller than you!`;
			} else {
				return `${this.species} was just as big as you!`;
			}
		}
	};
	
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.	

	Dino.prototype.compareDiet= function (diet) {
		if (this.diet == diet) {
			return `${this.species} ate the same stuff as you!`;
		} else {
			return `${this.species} was on a very different diet than you!`;
		}
	};


    // Get Dino's
	
	const dinos = [
        {
            "species": "Triceratops",
            "weight": 13000,
            "height": 114,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "First discovered in 1889 by Othniel Charles Marsh"
        },
        {
            "species": "Tyrannosaurus Rex",
            "weight": 11905,
            "height": 144,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "The largest known skull measures in at 5 feet long."
        },
        {
            "species": "Anklyosaurus",
            "weight": 10500,
            "height": 55,
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Anklyosaurus survived for approximately 135 million years."
        },
        {
            "species": "Brachiosaurus",
            "weight": 70000,
            "height": "372",
            "diet": "herbavor",
            "where": "North America",
            "when": "Late Jurasic",
            "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
        },
        {
            "species": "Stegosaurus",
            "weight": 11600,
            "height": 79,
            "diet": "herbavor",
            "where": "North America, Europe, Asia",
            "when": "Late Jurasic to Early Cretaceous",
            "fact": "The Stegosaurus had between 17 and 22 seperate places and flat spines."
        },
        {
            "species": "Elasmosaurus",
            "weight": 16000,
            "height": 59,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
        },
        {
            "species": "Pteranodon",
            "weight": 44,
            "height": 20,
            "diet": "carnivor",
            "where": "North America",
            "when": "Late Cretaceous",
            "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
        },
        {
            "species": "Pigeon",
            "weight": 0.5,
            "height": 9,
            "diet": "herbavor",
            "where": "World Wide",
            "when": "Holocene",
            "fact": "All birds are living dinosaurs."
        }
    ];
	
	// Create Dino Objects
	
	dinoArray = [];
	
	dinos.forEach(function (dino) {
		dinoArray.push(new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact));
	});


    // Create Human Object
	
	function Human(name, height, weight, diet) {
	  this.name = name;
	  this.height = height;
	  this.weight = weight;
	  this.diet = diet;
	}

    // Use IIFE to get human data from form
	
	let humanData = (function () {
		
		// Why doesn't this work??
		// let name = document.getElementById("name").value;
		
		let name = document.getElementById("name");
		let height = {
			"feet": document.getElementById("feet"),
			"inches": document.getElementById("inches")
		} 
		let weight = document.getElementById("weight");
		let diet = document.getElementById("diet");

		function getName() {
			return name.value;
		}

		function getHeight() {
			return {
				feet: height.feet.value,
				inches: height.inches.value
			};
		}

		function getWeight() {
			return weight.value;
		}

		function getDiet() {
			return diet.value;
		}

		return {
			getName: getName,
			getHeight: getHeight,
			getWeight: getWeight,
			getDiet: getDiet
		}
	})();
	
    // Generate Tiles for each Dino in Array
	function generateTiles(human) {
		let tiles = [];
		
		dinoArray.forEach(function (dino) {
			let fact;
			
			const number = Math.floor(Math.random() * 5); 
			switch (number) {
			case 0:
				fact = dino.compareWeight(human.weight);
				break;
			case 1:
				fact = `${dino.species} lived in ${dino.where}`;
				break;
			case 2:
				fact = dino.fact;
				break;
			case 3:
				fact = dino.compareHeight(human.height.feet*12+human.height.inches);
				break;
			case 4:
				fact = `${dino.species} lived ${dino.when}`;
				break;
			case 5:
				fact = dino.compareDiet(human.diet);
				break;
			default:
				fact = dino.fact;
			}
			if (dino.species == 'Pigeon') {
				fact = dino.fact;
			} 
			tiles.push(`<div class="grid-item"> <h4>${dino.species}</h4> <img src="./images/${dino.species.toLowerCase()}.png" alt="dino picture"> <p>${fact}</p> </div>`);

		});
		// Add human to tiles
		tiles.splice(4, 0, `<div class="grid-item"> <h4>${human.name}</h4> <img src="./images/human.png" alt="human picture"> </div>`);
		return tiles;
	}
	
	
    // Add tiles to DOM
	function showInfographic(human) {
		let tiles = generateTiles(human);
		
		console.log(tiles);
		
		const grid = document.getElementById('grid');
		
		let gridHtml= "";
		tiles.forEach(function (tile) {
			gridHtml = gridHtml + tile;
		});
		grid.innerHTML = gridHtml;
		
		// Remove form from screen
		document.getElementById('dino-compare').style.display = 'none';
		grid.style.display = 'flex';		

	}	
		

   

	// On button click, prepare and display infographic
	btn.addEventListener("click", () => {
		try {
			let human = new Human(humanData.getName(), humanData.getHeight(), humanData.getWeight(), humanData.getDiet());
			showInfographic(human);
		} catch (error) {
			alert(error.message);
		}
	});
