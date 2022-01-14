let store = Immutable.Map({
    selectedRover: 'Curiosity',
    photos: '',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
})

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (state, newState) => {
    store = state.merge(newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create content
const App = (state) => {
    let selectedRover = state.get('selectedRover');

    return `
        <header></header>
        <main>
            <h1>Mars Dashboard</h1>
            <section>
                <h3>Select rover</h3>
                <select id="rover" onchange='selectRover()'>
                  <option value="1">${state.get('rovers').get(0)}</option>
                  <option value="2">${state.get('rovers').get(1)}</option>
                  <option value="3">${state.get('rovers').get(2)}</option>
                </select>
            </section>
            ${selectedRover
            ? ` <section>
                    <h3>Information about rover ${selectedRover}</h3>
                    ${getData(state)}
                </section>
`
            : ``}
        </main>
        <footer>This page was created for project Mars Dashboard - course Intermediate JavaScript Nanodegree Program at Udacity</footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

const selectRover = () => {
    const e = document.getElementById("rover");
    if (e && e.selectedIndex) {
        const text = e.options[e.selectedIndex].text;
        updateStore(store, Immutable.Map({selectedRover: text, photos: ''}))
    }
}

const getData = (state) => {
    let photos = state.get('photos');

    if (photos === '') {
        getRoverData(state);
    } else {
        const { name, landing_date, launch_date, status } = photos[0].rover;
        const images = photos.map(photo => photo.img_src)
        const photoDate = photos[0].earth_date

        return (`
        <p>Rover with name ${name} was launched at ${launch_date}. It landed on Mars on ${landing_date} and is currently ${status}.</p>
        <p>Below you see photos taken from ${name} at ${photoDate}.</p>
        <img src="${images[0]}" alt="Photo taken by rover on Mars" width="30%"/>
        <img src="${images[1]}" alt="Photo taken by rover on Mars" width="30%"/>
        <img src="${images[2]}" alt="Photo taken by rover on Mars" width="30%"/>
    `)
    }


}

// ------------------------------------------------------  API CALLS

// Get data of selected Rover
const getRoverData = (state) => {
    let selectedRover = state.get('selectedRover');

    fetch(`http://localhost:3000/getRover?name=${selectedRover}`)
        .then(res => res.json())
        .then(photos => updateStore(store, Immutable.Map({ photos: photos})))

}

