// console.log('Client side js file is loaded');

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => { //e: event
    e.preventDefault()  //avoids page refresh on pressing submit

    const loaction_to_search = search.value

    message1.textContent = 'Loading...'
    message2.textContent = ''

    const url = '/weather?address=' + encodeURIComponent(loaction_to_search)
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {

                message2.textContent = ''
                message1.textContent = data.error
            } else {

                message1.textContent = data.location
                message2.textContent = data.forecastData
            }
        })
    })
})