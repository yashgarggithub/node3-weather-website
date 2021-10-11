const request = require('request')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')  //handlebars

//Define path for the express configuration
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '..', 'templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//set(): set a value to given express setting
//setup handlebars engine and views location
app.set('view engine', 'hbs')   //handlebars are now setup for dynamic pages
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//use(): way to customize server
//static(): takes path of static page
//setup static directory to work
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    //render(): alternate of send(), for dynamic pages
    //render('view to access', 'values accessible by THAT view')
    res.render('index', {
        title: 'weather app',
        name: 'Yash Garg'
    })
    // res.send({
    // })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Yash Garg'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helptext: 'this is a help text',
        title: 'Help',
        name: 'Yash Garg'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'Please enter an address'
        })
    }
    const loaction_to_search = req.query.address
    
    // geocode(loaction_to_search, (error, data) => {
    geocode(loaction_to_search, (error, { latitude, longitude, location } = {}) => {   //destructured

        if (error) {
            return res.send({
                error
            })
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if (error) {
                return res.send({
                    error
                })
            }

            res.send({
                location: location,
                forecastData: forecastData
            })
            // console.log(location);
            // console.log(forecastData);
        })

    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({   //'return' will stop the function here itself
            error: 'You must provide a search term'
        })
    }

    console.log(req.query);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorText: 'Help Article Not found',
        name: 'Yash Garg'
    })
})

app.get('*', (req, res) => {    // * - anything that hasn't been used yet 
    res.render('404', {
        title: 'Error 404',
        errorText: 'Page not found',
        name: 'Yash Garg'
    })
})

//this function starts up the server, only used ONCE
app.listen(3000, () => {
    console.log('Server is up on port 3000.');
})