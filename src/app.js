const path = require('path'); //core module
const express = require('express');
const hbs = require('hbs');
const { title } = require('process');

const geoCode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

const port = process.env.PORT || 3000; //heroku
//define paths for express
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')
//changed directory views to template, so to tell express not to look for 
//views but for templates


//set up handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath); //to tell express
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));
//.static configures our express app

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Pranjal'
    }); //to render views
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Pranjal'
    }); //to render views
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Contact Me',
        title: 'Help',
        name: 'Pranjal'
    }); //to render views
})



// these are routes.
// app.get('', (req, res) => {
//     res.send('<h1>Hello</h1>');
//     // this is visible on browser
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name: 'Pranjal',
//         age: 20
//     });
// })

// app.get('/about', (req, res) => {
//     res.send('<h1> About Page </h1>');
// })

//endpoint below

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get('/help/*', (req, res) =>{
    res.render('error',{
        title: "404",
        errorMessage: "Sorry, Help article not found"
    });
})

//this should be in the end otherwise everything
//will be a page
app.get('*', (req, res) =>{
    res.render('error', {
        title: "404",
        errorMessage: "Sorry, Page not found"
    });
})

//port 3000 for device
app.listen(port, () => {
    console.log(port);
});

