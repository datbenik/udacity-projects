/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sectionList = document.querySelector('body').getElementsByTagName('section');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function isElementVisible(el) {
    const rect    = el.getBoundingClientRect(),
          vWidth  = window.innerWidth || document.documentElement.clientWidth,
          vHeight = window.innerHeight || document.documentElement.clientHeight;
        
    // Return false if it's not in the viewport
    if (rect.right  < 0 || 
		rect.bottom < 0 || 
		rect.left > vWidth || 
		rect.top  > vHeight)
        return false;
		
	// Return true if close to the top of the viewport
    return (
        rect.top   >= -100 && 
		rect.top   <= 120 &&
        rect.left  >= 0 &&
        rect.right <= vWidth
    );
}		

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the nav
function _buildNav() {
	const nav = document.querySelector('#navbar__list');
	for (const section of sectionList) {
		// Add list item for each section
		const newItem = document.createElement('li'); 
		newItem.setAttribute('class', 'menu__link');
		newItem.setAttribute('goto', section.id);
		newItem.textContent = section.getAttribute('data-nav');
		// Add event to scroll to section on list item click
		newItem.addEventListener('click', _scrollIntoView);
		// Add item to the dom
		nav.appendChild(newItem);
	}
}

// Add class 'active' to section when near top of viewport
function _makeSectionActive() { 
	for (const section of sectionList) {
		const elementClasses = section.classList;
		if (isElementVisible(section)) {
			elementClasses.add('your-active-class');
		} else {
			elementClasses.remove('your-active-class');
		}
	}
}

// Scroll to anchor ID using scrollIntoView event
function _scrollIntoView(event) {
	const id = (event.target).getAttribute('goto');
	document.getElementById(id).scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', _buildNav);

// Set active section
document.addEventListener('scroll', _makeSectionActive);


