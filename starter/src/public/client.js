let store = Immutable.Map({
    user: Immutable.Map({
        name: 'Student'
    }),
    apod: Immutable.Map({}),
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
    let rovers = state.get('rovers');
    let apod = state.get('apod');

    return `
        <header></header>
        <main>
            ${Greeting(store.get('user').get('name'))}
            <section>
                <h3>Put things on the page!</h3>
                <p>Here is an example section.</p>
                <p>
                    One of the most popular websites at NASA is the Astronomy Picture of the Day. In fact, this website is one of
                    the most popular websites across all federal agencies. It has the popular appeal of a Justin Bieber video.
                    This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other
                    applications. In addition, if the concept_tags parameter is set to True, then keywords derived from the image
                    explanation are returned. These keywords could be used as auto-generated hashtags for twitter or instagram feeds;
                    but generally help with discoverability of relevant imagery.
                </p>
                ${ImageOfTheDay(apod)}
            </section>
        </main>
        <footer></footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', () => {
    render(root, store)
})

// ------------------------------------------------------  COMPONENTS

// Pure function that renders conditional information -- THIS IS JUST AN EXAMPLE, you can delete it.
const Greeting = (name) => {
    if (name) {
        return `
            <h1>Welcome, ${name}!</h1>
        `
    }

    return `
        <h1>Hello!</h1>
    `
}

// Example of a pure function that renders infomation requested from the backend
const ImageOfTheDay = (apod) => {

    // If image does not already exist, or it is not from today -- request it again
    if (!apod || apod.size == 0) {
        getImageOfTheDay(store)
    } else {
        const today = new Date()
        const photodate = new Date(apod.get('image').get('date'))
        console.log(photodate.getDate(), today.getDate());
        console.log(photodate.getDate() === today.getDate());
        if (photodate.getDate() !== today.getDate() ) {
            getImageOfTheDay(store)
        }
    }

    // check if the photo of the day is actually type video!
    if (apod.get('media_type') === "video") {
        return (`
            <p>See today's featured video <a href="${apod.get('url')}">here</a></p>
            <p>${apod.get('title')}</p>
            <p>${apod.get('explanation')}</p>
        `)
    } else {
        return (`
            <img src="${apod.get('image').get('url')}" height="350px" width="100%" />
            <p>${apod.get('image').get('explanation')}</p>
        `)
    }
}

// ------------------------------------------------------  API CALLS

// Example API call
const getImageOfTheDay = (state) => {
    let apod = state.get('apod');

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    return data
}
