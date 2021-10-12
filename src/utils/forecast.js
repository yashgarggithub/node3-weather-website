const request = require('request')


//access_key = (API) & query = (longitude, latitude)

// const url = 'http://api.weatherstack.com/current?access_key=fcb8f326d9dc690bec183e647e161af2&query=37.8267,-122.4233&units=f'

// request({ url: url, json: true }, (error, response) => {
//     // console.log(response);   //response is the info obtained from the request
//     // const data = JSON.parse(response.body)  //parsing the body
//     // console.log(data.current);

//     //json: true => already parsed => no need to parse, log directly
//     // console.log(response.body.current);

//     if (error) {
//         console.log('Internet not connected');
//     }
//     else if (response.body.error) {
//         console.log('Unable to find location');
//     }
//     else {
//         console.log(response.body.current.weather_descriptions[0]);
//         console.log('It is currently ' + response.body.current.temperature + ' degrees outside. There is ' + response.body.current.precip + '% chance of rain');
//     }
// })

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fcb8f326d9dc690bec183e647e161af2&query=' +
                latitude + ',' + longitude + '&units=f'

    // request({ url, json: true }, (error, response) => {
    request({ url, json: true }, (error, {body}) => {   //destucturing
        if (error) {
            callback('Internet not connected', undefined)
        } else if (body.error) {
            callback('Unable to find locaiton', undefined)
        } else {
            callback(undefined,
                body.current.weather_descriptions[0]
                + '\n. It is currently ' + body.current.temperature + ' degrees outside. It feels like ' + body.current.feelslike + ' degrees.'
                + '\n Humidity is ' + body.current.humidity + '%.'
            )
        }
    })
}

module.exports = forecast