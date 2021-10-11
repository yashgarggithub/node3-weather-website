const request = require('request')

// const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoieWFzaGdhcmdtYXBib3giLCJhIjoiY2t1YjJ6dnlrMG1zcTJzbDlybWM4cG41ZiJ9.CVfIahS7nKZCw8bMhkFldA&limit=1'

// request({ url: geocodeUrl, json: true }, (error, response) => {

//     if (error) {
//         console.log('Internet not connected');
//     }
//     else if (response.body.features.length === 0) {
//         console.log('Unable to find location');
//     }
//     else {
//         const latt_long = response.body.features[0].center;

//         console.log(latt_long[1] + ' , ' + latt_long[0]);
//     }

// })


const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)   //this is to handle special characters in address name
        + '.json?access_token=pk.eyJ1IjoieWFzaGdhcmdtYXBib3giLCJhIjoiY2t1YjJ6dnlrMG1zcTJzbDlybWM4cG41ZiJ9.CVfIahS7nKZCw8bMhkFldA&limit=1'


    // request({ url, json: true }, (error, response) => {
    request({ url, json: true }, (error, {body}) => {     //destucture
        if (error) {
            callback('Internet not connected', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location')
        }
        else {
            callback(undefined, {
                location: body.features[0].place_name,
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode